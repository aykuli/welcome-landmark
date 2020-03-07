import React, { useState, useEffect } from 'react';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { Typography, CssBaseline } from '@material-ui/core';

import theme from '../static/themes/theme';

import useDataApi from '../hooks/useIpInfo';
import { IPINFO_TOKEN } from '../static/api-keys';
import Map from './map';
import ErrorBoundry from './error-boundary';

const useStyles = makeStyles({
  mapContainer: {
    position: 'relative',
  },
  coordinates: {
    position: 'absolute',
    bottom: 20,
    left: 0,
  },
});

const App = () => {
  const styles = useStyles();
  const [isDataReady, setIsDataReady] = useState(false);
  const [coors, setCoors] = useState(null);
  const [place, setPlace] = useState({ city: '', country: '' });
  // there we using ipinfo API
  // another method is using navigator.geolocation.getCurrentPosition(success, error, options) from https://developer.mozilla.org/ru/docs/Web/API/Geolocation/getCurrentPosition
  const { data, isLoading, isError } = useDataApi(
    `https://ipinfo.io?token=${IPINFO_TOKEN}`,
    null
  );

  useEffect(() => {
    if (data !== null) {
      setIsDataReady(true);
      const { city, country, loc } = data;
      setCoors(loc.split(','));
      setPlace({ city, country });
      console.log('data: ', data);
    }
  }, [data]);

  return (
    <ErrorBoundry>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {isError && <div>Something went wrong...</div>}
        {isLoading ? <div>Loading current coordinates...</div> : null}
        {isDataReady ? (
          <>
            <div className={styles.mapContainer}>
              <Map
                lat={Number(coors[0])}
                long={Number(coors[1])}
                place={place}
              />
              <div className={styles.coordinates}>
                <Typography variant="caption">
                  {coors[0]}, {coors[1]}
                </Typography>
              </div>
            </div>
          </>
        ) : null}
      </ThemeProvider>
    </ErrorBoundry>
  );
};

export default App;
