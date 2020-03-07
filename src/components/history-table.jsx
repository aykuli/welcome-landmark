import React, { useState, forwardRef, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Search,
  AddBox,
  ArrowUpward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  ViewColumn,
} from '@material-ui/icons';
import MaterialTable from 'material-table';

import { WELCOME_LANDMARK_LS_HISTORY } from '../static/consts';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const HistoryTable = ({ history }) => {
  const data = history === null ? [] : JSON.stringify(history);
  const [state, setState] = useState({
    columns: [
      { title: 'Date', field: 'date', type: 'date' },
      { title: 'City', field: 'address.city', type: 'string' },
      { title: 'Country', field: 'address.country', type: 'string' },
      {
        title: 'Latitude',
        field: 'coordinates[0]',
      },
      {
        title: 'Longitude',
        field: 'coordinates[1]',
      },
    ],
    data,
  });
  return (
    <div style={{ width: '100%' }}>
      <MaterialTable
        title="Travel History"
        columns={state.columns}
        data={state.data}
        icons={tableIcons}
        editable={{
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                setState(prevState => {
                  const prevStateData = [...prevState.data];
                  prevStateData.splice(prevStateData.indexOf(oldData), 1);

                  localStorage.removeItem(WELCOME_LANDMARK_LS_HISTORY);
                  localStorage.setItem(
                    WELCOME_LANDMARK_LS_HISTORY,
                    JSON.stringify(prevStateData)
                  );
                  return { ...prevState, data: prevStateData };
                });
              }, 600);
            }),
        }}
      />
    </div>
  );
};

export default HistoryTable;

HistoryTable.defaultProps = {
  history: null,
};

HistoryTable.propTypes = {
  history: PropTypes.shape({
    date: PropTypes.instanceOf(Date),
    address: PropTypes.shape({
      city: PropTypes.string,
      country: PropTypes.string,
    }),
    coordinates: PropTypes.arrayOf(PropTypes.number),
  }),
};
