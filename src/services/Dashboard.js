import api from '../utils/api';
const options = {
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
}
export default {
  info: () =>
    api.get('/info'),
}