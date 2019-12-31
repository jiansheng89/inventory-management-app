import api from '../utils/api';
const options = {
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
}
export default {
  retrieveAll: () =>
    api.get('/inventory'),
  single: (id) =>
    api.get(`/inventory/${id}`),
  create: (params) => {
    // console.log(params)
    return api.post('/inventory', params, options)
  },
  update: (id, params) =>
    api.put(`/inventory/${id}`, params),
  delete: (id) =>
    api.delete(`/inventory/${id}`),
}