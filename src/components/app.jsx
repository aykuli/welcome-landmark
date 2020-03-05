import React, { useState, useEffect } from 'react';

import useDataApi from '../hooks/useIpInfo';
import { IPINFO_TOKEN } from '../static/apiKeys';
import Map from './map';

const App = () => {
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
    <>
      {isError && <div>Something went wrong...</div>}
      {isLoading ? <div>Loading current coordinates...</div> : null}
      {isDataReady ? (
        <>
          <h5>
            {place.city},{place.country}
          </h5>
          <p>
            lat ={coors[0]}, long ={coors[1]}
          </p>
          <Map lat={Number(coors[0])} long={Number(coors[1])} />
        </>
      ) : null}
    </>
  );
};

export default App;
