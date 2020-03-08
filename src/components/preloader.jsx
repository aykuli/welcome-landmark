import React from 'react';
import { Skeleton } from '@material-ui/lab';

const Preloader = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Skeleton variant="text" width="90%" />
    <Skeleton variant="text" width="90%" />
    <Skeleton variant="rect" width="90%" height={300} />
  </div>
);

export default Preloader;
