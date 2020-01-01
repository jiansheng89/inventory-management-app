import api from '../utils/api';
const options = {
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
}
export default {
  retrieveAll: () =>
    api.get('/sales'),
  single: (id) =>
    api.get(`/sales/${id}`),
  create: (params) => {
    console.log(params)
    return api.post('/sales', params, options)
  },
  update: (id, params) =>
    api.put(`/sales/${id}`, params),
  delete: (id) =>
    api.delete(`/sales/${id}`),
}