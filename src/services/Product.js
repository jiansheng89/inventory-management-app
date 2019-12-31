import api from '../utils/api';
const options = {
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
}
export default {
  retrieveAll: () =>
    api.get('/product'),
  single: (id) =>
    api.get(`/product/${id}`),
  create: (params) => {
    console.log(params)
    return api.post('/product', params, options)
  },
  update: (id, params) =>
    api.put(`/product/${id}`, params),
  delete: (id) =>
    api.delete(`/product/${id}`),
}