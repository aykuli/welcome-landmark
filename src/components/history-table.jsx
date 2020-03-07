import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';

const useStyles = makeStyles(theme => ({}));

const HistoryTable = ({ data }) => {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Date', field: 'date', type: 'Date' },
      { title: 'City', field: 'city', type: 'string' },
      { title: 'Country', field: 'country', type: 'string' },
      {
        title: 'Latitude',
        field: 'latitude',
      },
      {
        title: 'Longitude',
        field: 'longitude',
      },
    ],
    tableData: data,
  });

  return (
    <MaterialTable
      title="Travel history"
      columns={state.columns}
      data={state.tableData}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState(prevState => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
};

export default HistoryTable;

// HistoryTable.defaultProps = {
//   data: false,
//   hideHistory: () => {},
// };

// HistoryTable.propTypes = {
//   isOpen: PropTypes.bool,
//   hideHistory: PropTypes.func,
// };
