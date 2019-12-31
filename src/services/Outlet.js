import api from '../utils/api';
const options = {
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
}
export default {
  retrieveAll: () =>
    api.get('/outlet'),
  single: (id) =>
    api.get(`/outlet/${id}`),
  create: (params) => {
    console.log(params)
    return api.post('/outlet', params, options)
  },
  update: (id, params) =>
    api.put(`/outlet/${id}`, params),
  delete: (id) =>
    api.delete(`/outlet/${id}`),
}