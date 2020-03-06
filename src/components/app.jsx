import React, { useState, useEffect } from 'react';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import theme from '../static/themes/theme';

import useDataApi from '../hooks/useIpInfo';
import { IPINFO_TOKEN } from '../static/api-keys';
import Map from './map';
import ErrorBoundry from './error-boundary';

const useStyles = makeStyles({
  mapContainer: {
    margin: '40px 0',
  },
});

const App = () => {
  const styles = useStyles();
  const [isDataReady, setIsDataReady] = useState(false);
  const [coors, setCoors] = useState(null);
  const [place, setPlace] = useState({ city: '', country: '' });
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
    }
  }, [data]);

  return (
    <ErrorBoundry>
      <ThemeProvider theme={theme}>
        {isError && <div>Something went wrong...</div>}
        {isLoading ? <div>Loading current coordinates...</div> : null}
        {isDataReady ? (
          <>
            <div>
              <div>
                <Typography variant="h2">
                  {place.city},{place.country}
                </Typography>
                <Typography variant="body2">
                  lat ={coors[0]}, long ={coors[1]}
                </Typography>
              </div>
            </div>
            <div className={styles.mapContainer}>
              <Map
                lat={Number(coors[0])}
                long={Number(coors[1])}
                place={place}
              />
            </div>
          </>
        ) : null}
      </ThemeProvider>
    </ErrorBoundry>
  );
};

export default App;
