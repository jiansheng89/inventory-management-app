import api from '../utils/api';
const options = {
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
}
export default {
  retrieveAll: () =>
    api.get('/employee'),
  single: (id) =>
    api.get(`/employee/${id}`),
  create: (params) => {
    console.log(params)
    return api.post('/employee', params, options)
  },
  update: (id, params) =>
    api.put(`/employee/${id}`, params),
  delete: (id) =>
    api.delete(`/employee/${id}`),
}