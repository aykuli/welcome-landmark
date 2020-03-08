import { SAVE_PLACE } from '../static/consts';

const saveCoors = payload => {
  return { type: SAVE_PLACE, payload };
};

export default saveCoors;
