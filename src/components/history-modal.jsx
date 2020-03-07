import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Backdrop, Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import HistoryTable from './history-table';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const HistoryModal = ({ isOpen, hideHistory, history }) => {
  const classes = useStyles();

  return (
    <>
      <Modal
        aria-labelledby="History of coordinates"
        aria-describedby="where user have been"
        open={isOpen}
        onClose={hideHistory}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        className={classes.modal}
      >
        <div>
          <HistoryTable history={history} />
        </div>
      </Modal>
    </>
  );
};
export default HistoryModal;

HistoryModal.defaultProps = {
  isOpen: false,
  hideHistory: () => {},
  history: null,
};

HistoryModal.propTypes = {
  isOpen: PropTypes.bool,
  hideHistory: PropTypes.func,
  history: PropTypes.shape({
    date: PropTypes.instanceOf(Date),
    address: PropTypes.shape({
      city: PropTypes.string,
      country: PropTypes.string,
    }),
    coordinates: PropTypes.arrayOf(PropTypes.number),
  }),
};
