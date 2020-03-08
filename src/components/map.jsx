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
import { makeStyles } from '@material-ui/core/styles';

import MarkerAndPopup from './marker-popup';
import MapThemeToggler from './map-theme-toggler';
import HistoryModal from './history-modal';
import colorGenerator from '../utils/color-generator';

import theme from '../static/themes/theme';
import { MAPBOX_TOKEN } from '../static/api-keys';
import otherUsersCoors from '../static/mock/other-users';
import { WELCOME_LANDMARK_LS_HISTORY } from '../static/consts';

const colors = colorGenerator(otherUsersCoors(), theme.palette.info.main);

const useStyles = makeStyles(themeHere => ({
  mapContainer: {
    width: '100%',
  },
  mapControllers: {
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
    width: '100%',
    backgroundColor: themeHere.palette.background.default,
    zIndex: 2,
    boxShadow: themeHere.shadows[2],
  },
  fullscreenControl: {
    position: 'absolute',
    right: 0,
  },
  scaler: { position: 'absolute', bottom: 20, right: 35 },
  modalWrap: {
    width: '100vw',
    backgroundColor: 'blue',
  },
}));

const Map = ({ lat, long, place }) => {
  const styles = useStyles(theme);
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100vh',
    latitude: lat,
    longitude: long,
    zoom: 10,
    bearing: 0,
    pitch: 0,
  });
  const [isShowOthers, setIsShowOthers] = useState(true);
  const [mapTheme, setMapTheme] = useState('streets-v11');
  const [isOpenModal, setisOpenModal] = React.useState(false);

  const [historyJSON, setHistoryJSON] = React.useState(
    localStorage.getItem(WELCOME_LANDMARK_LS_HISTORY)
  );

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

  const handleSave = (e, info) => {
    const data = {
      date: new Date(),
      address: info,
      coordinates: [lat, long],
    };
    let newHistory = [];
    if (historyJSON !== null) {
      const oldHistory = JSON.parse(
        localStorage.getItem(WELCOME_LANDMARK_LS_HISTORY)
      );

      newHistory = [data, ...oldHistory];
    } else {
      newHistory = [data];
    }

    localStorage.removeItem(WELCOME_LANDMARK_LS_HISTORY);
    localStorage.setItem(
      WELCOME_LANDMARK_LS_HISTORY,
      JSON.stringify(newHistory)
    );
    setHistoryJSON(JSON.stringify(newHistory));
  };

  const showHistory = () => {
    const newHistory = localStorage.getItem(WELCOME_LANDMARK_LS_HISTORY);
    localStorage.removeItem(WELCOME_LANDMARK_LS_HISTORY);
    setHistoryJSON(newHistory);
    setisOpenModal(true);
  };
  const hideHistory = () => {
    setisOpenModal(false);
  };
  const cleanHistory = () => {
    localStorage.removeItem(WELCOME_LANDMARK_LS_HISTORY);
    setHistoryJSON(null);
  };

  return (
    <>
      <div className={styles.mapControllers}>
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
          <Button onClick={cleanHistory} aria-label="Clean history">
            Clean history
          </Button>
        </ButtonGroup>
        <MapThemeToggler mapTheme={mapTheme} handleTheme={handleTheme} />
      </div>
      <div id="map-container" className={styles.mapContainer}>
        <MapGL
          {...viewport}
          onViewportChange={setViewport}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          mapStyle={`mapbox://styles/mapbox/${mapTheme}`}
          attributionControl
          width="100%"
          height="100vh"
        >
          <div className={styles.fullscreenControl}>
            <FullscreenControl
              container={document.getElementById('map-container')}
            />
          </div>
          <MarkerAndPopup
            lat={lat}
            long={long}
            id={0}
            info={place}
            isCurrent
            color={theme.palette.primary.main}
            handleSave={e => handleSave(e, place)}
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
                handleSave={e => handleSave(e, info)}
              />
            );
          })}
          <GeolocateControl
            style={geolocateStyle}
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation
          />
          <div className={styles.scaler}>
            <ScaleControl maxWidth={100} unit="metric" />
          </div>
          <HistoryModal
            isOpen={isOpenModal}
            hideHistory={hideHistory}
            history={historyJSON}
          />
        </MapGL>
      </div>
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
