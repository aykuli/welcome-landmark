import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Backdrop, Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import HistoryTable from './history-table';
import { WELCOME_LANDMARK_LS_HISTORY } from '../static/consts';

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

const HistoryModal = ({ isOpen, hideHistory }) => {
  const classes = useStyles();
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem(WELCOME_LANDMARK_LS_HISTORY)) || ''
  );
  console.log(history);
  return (
    <>
      <Modal
        aria-labelledby="History of coordinates"
        aria-describedby="where user have been"
        open
        onClose={hideHistory}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        className={classes.modal}
      >
        <Fade in={isOpen}>
          <HistoryTable data={history} />
        </Fade>
      </Modal>
    </>
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
