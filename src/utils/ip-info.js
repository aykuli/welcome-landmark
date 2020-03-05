import { ipInfoKey } from '../static/apiKeys';

const ipInfo = async () => {
  const response = await fetch(`https://ipinfo.io?token=${ipInfoKey}`);
  const json = await response.json();
  const [lat, lng] = json.loc.split(',');
  return [Number(lat), Number(lng)];
};

export default ipInfo;