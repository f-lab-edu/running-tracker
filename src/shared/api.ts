import ky from 'ky'

const BASE_URL = '/api'

const api = ky.create({
  prefixUrl: BASE_URL
})

const apiProxy = {
  get: async <T>(...args: Parameters<typeof api.get>) => await api.get<T>(...args).json(),
  post: async <T>(...args: Parameters<typeof api.post>) => await api.post<T>(...args).json(),
  put: async <T>(...args: Parameters<typeof api.put>) => await api.put<T>(...args).json(),
  delete: async <T>(...args: Parameters<typeof api.delete>) => await api.delete<T>(...args).json(),
  patch: async <T>(...args: Parameters<typeof api.patch>) => await api.patch<T>(...args).json(),
}

export default apiProxy