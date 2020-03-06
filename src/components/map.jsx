import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MapGL, {
  FlyToInterpolator,
  GeolocateControl,
  ScaleControl,
  FullscreenControl,
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { easeCubic } from 'd3-ease';
import { Button, ButtonGroup } from '@material-ui/core';

import MarkerAndPopup from './marker-popup';
import MapThemeToggler from './map-theme-toggler';
import colorGenerator from '../utils/color-generator';
import theme from '../static/themes/theme';
import { MAPBOX_TOKEN } from '../static/api-keys';
import otherUsersCoors from '../static/mock/other-users';

const colors = colorGenerator(otherUsersCoors(), theme.palette.info.main);

const Map = ({ lat, long }) => {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '400px',
    latitude: lat,
    longitude: long,
    zoom: 10,
    bearing: 0,
    pitch: 0,
  });
  const [isShowOthers, setIsShowOthers] = useState(true);
  const [mapTheme, setMapTheme] = useState('streets-v11');

  const handleTheme = e => {
    console.log('---------------');
    console.log(e.target);
    setMapTheme(e.target.value);
  };

  const gotoCurrentPlace = () => {
    const viewportCurrent = {
      ...viewport,
      longitude: long,
      latitude: lat,
      zoom: 13,
      transitionDuration: 'auto',
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: easeCubic,
    };
    setViewport(viewportCurrent);
  };

  const geolocateStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: 10,
  };

  const toggleOthers = () => {
    setIsShowOthers(!isShowOthers);
  };
  const otherUsers = otherUsersCoors(lat, long);

  return (
    <>
      <div style={{ textAlign: 'right' }}>
        <MapThemeToggler mapTheme={mapTheme} handleTheme={handleTheme} />
      </div>
      <MapGL
        {...viewport}
        onViewportChange={setViewport}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        mapStyle={`mapbox://styles/mapbox/${mapTheme}`}
        attributionControl
      >
        <div style={{ position: 'absolute', right: 0 }}>
          <FullscreenControl container={document.querySelector('body')} />
        </div>
        <MarkerAndPopup
          lat={lat}
          long={long}
          id={0}
          info="Current User"
          isCurrent
          color={theme.palette.primary.main}
        />
        {otherUsers.map((userData, i) => {
          const { id, latitude, longitude, info } = userData;
          return (
            <MarkerAndPopup
              key={id}
              lat={latitude}
              long={longitude}
              id={id}
              info={info}
              isCurrent={false}
              isShowOthers={isShowOthers}
              color={colors[i]}
            />
          );
        })}

        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation
        />
        <div style={{ position: 'absolute', bottom: 10, right: 35 }}>
          <ScaleControl maxWidth={100} unit="metric" />
        </div>
      </MapGL>
      <ButtonGroup color="primary" aria-label="button group" size="small">
        <Button onClick={gotoCurrentPlace} aria-label="Back to current place">
          Back to current place
        </Button>
        <Button onClick={toggleOthers} aria-label="Hide or show other user's">
          {isShowOthers ? 'Hide ' : 'Show '}other user&apos;s
        </Button>
      </ButtonGroup>
    </>
  );
};

export default Map;

Map.defaultProps = {
  lat: 0,
  long: 0,
  place: { city: '', country: '' },
};

Map.propTypes = {
  lat: PropTypes.number,
  long: PropTypes.number,
  place: PropTypes.shape({
    city: PropTypes.string,
    country: PropTypes.string,
  }),
};
