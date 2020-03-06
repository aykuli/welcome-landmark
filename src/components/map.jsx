import React, { useState, useEffect } from 'react';
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
import { WELCOME_LANDMARK_LS_HISTORY } from '../static/consts';

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

  useEffect(() => {
    localStorage.setItem(WELCOME_LANDMARK_LS_HISTORY, '');
  }, []);

  const handleSave = e => {
    console.log('saving: ', e);
  };

  const showHistory = () => {
    console.log('show history');
  };

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
          handleSave={handleSave}
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
              handleSave={handleSave}
            />
          );
        })}

        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation
        />
        <div style={{ position: 'absolute', bottom: 20, right: 35 }}>
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
        <Button onClick={showHistory} aria-label="Show history">
          Show history
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
