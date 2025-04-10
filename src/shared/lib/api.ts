import ky from "ky";

const api = ky.create({
  prefixUrl: import.meta.env.VITE_API_URL,
})

const apiProxy = {
  get: (...args: Parameters<typeof api.get>) => api.get(...args).json(),
  post: (...args: Parameters<typeof api.post>) => api.post(...args).json(),
  put: (...args: Parameters<typeof api.put>) => api.put(...args).json(),
  delete: (...args: Parameters<typeof api.delete>) => api.delete(...args).json(),
  patch: (...args: Parameters<typeof api.patch>) => api.patch(...args).json(),
}

export default apiProxy;