import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Backdrop } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import HistoryTable from './history-table';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const HistoryModal = ({ isOpen, hideHistory }) => {
  const classes = useStyles();

  return (
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
        <HistoryTable />
      </div>
    </Modal>
  );
};
export default HistoryModal;

HistoryModal.defaultProps = {
  isOpen: false,
  hideHistory: () => {},
};

HistoryModal.propTypes = {
  isOpen: PropTypes.bool,
  hideHistory: PropTypes.func,
};
