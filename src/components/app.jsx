import React, { useState, useEffect } from 'react';

import useDataApi from '../hooks/useIpInfo';
import { IPINFO_TOKEN } from '../static/api-keys';
import Map from './map';
import MapThemeToggler from './map-theme-toggler';

const App = () => {
  const [isDataReady, setIsDataReady] = useState(false);
  const [coors, setCoors] = useState(null);
  const [place, setPlace] = useState({ city: '', country: '' });
  const { data, isLoading, isError } = useDataApi(
    `https://ipinfo.io?token=${IPINFO_TOKEN}`,
    null
  );
  const [buttonText, setButtonText] = useState('dark');
  const [mapTheme, setMapTheme] = useState('streets-v11');

  useEffect(() => {
    if (data !== null) {
      setIsDataReady(true);
      const { city, country, loc } = data;
      setCoors(loc.split(','));
      setPlace({ city, country });
    }
  }, [data]);

  const toggleTheme = () => {
    setButtonText(buttonText === 'light' ? 'dark' : 'light');
    setMapTheme(mapTheme === 'dark-v9' ? 'streets-v11' : 'dark-v9');
  };

  return (
    <>
      {isError && <div>Something went wrong...</div>}
      {isLoading ? <div>Loading current coordinates...</div> : null}
      {isDataReady ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <h5>
                {place.city},{place.country}
              </h5>
              <p>
                lat ={coors[0]}, long ={coors[1]}
              </p>
            </div>
            <div>
              <MapThemeToggler
                buttonText={buttonText}
                toggleTheme={toggleTheme}
              />
            </div>
          </div>
          <Map
            lat={Number(coors[0])}
            long={Number(coors[1])}
            mapTheme={mapTheme}
            place={place}
          />
        </>
      ) : null}
    </>
  );
};

export default App;
