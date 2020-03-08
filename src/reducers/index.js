import { SAVE_PLACE, WELCOME_LANDMARK_LS_HISTORY } from '../static/consts';

const initHistory = localStorage.getItem(WELCOME_LANDMARK_LS_HISTORY);
console.log('initHistory: ', initHistory);

const initialState = {
  history: [],
};

const rootReducer = (state = initialState, action) => {
  if (action.type === SAVE_PLACE) {
    return { ...state.history, ...action.payload };
  }
  return state;
};

export default rootReducer;
