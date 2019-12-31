import api from '../utils/api';
const options = {
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
}
export default {
  retrieveAll: () =>
    api.get('/parking'),
  single: (id) =>
    api.get(`/parking/${id}`),
  create: (params) => {
    console.log(params)
    api.post('/parking', params, options)
  },
  update: (id, params) =>
    api.put(`/parking/${id}`, params),
}