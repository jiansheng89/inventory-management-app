import api from '../utils/api';
export default {
  info: () =>
    api.get('/info'),
}