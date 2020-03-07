import React, { useState, forwardRef } from 'react';
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

const HistoryTable = ({ data }) => {
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
    tableData: data,
  });

  return (
    <div style={{ width: '100%' }}>
      <MaterialTable
        title="Travel History"
        columns={state.columns}
        data={state.tableData}
        icons={tableIcons}
        editable={{
          //   onRowAdd: newData =>
          //     new Promise(resolve => {
          //       setTimeout(() => {
          //         resolve();
          //         setState(prevState => {
          //           const data = [...prevState.data];
          //           data.push(newData);
          //           return { ...prevState, data };
          //         });
          //       }, 600);
          //     }),
          //   onRowUpdate: (newData, oldData) =>
          //     new Promise(resolve => {
          //       setTimeout(() => {
          //         resolve();
          //         if (oldData) {
          //           setState(prevState => {
          //               console.log(prevState);
          //             const data = [...prevState.data];
          //             data[data.indexOf(oldData)] = newData;
          //             return { ...prevState, data };
          //           });
          //         }
          //       }, 600);
          // }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                setState(prevState => {
                  console.log('prevState: ', prevState);
                  const history = [...prevState.tableData];
                  history.splice(history.indexOf(oldData), 1);

                  return { ...prevState, history };
                });
              }, 600);
            }),
        }}
      />
    </div>
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
