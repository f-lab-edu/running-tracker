import ky from "ky";

const apiObj = ky.create({
  prefixUrl: import.meta.env.VITE_API_URL,
})

const api = {
  get: <T>(...args: Parameters<typeof apiObj.get>) => apiObj.get(...args).json<T>(),
  post: <T>(...args: Parameters<typeof apiObj.post>) => apiObj.post(...args).json<T>(),
  put: <T>(...args: Parameters<typeof apiObj.put>) => apiObj.put(...args).json<T>(),
  delete: <T>(...args: Parameters<typeof apiObj.delete>) => apiObj.delete(...args).json<T>(),
  patch: <T>(...args: Parameters<typeof apiObj.patch>) => apiObj.patch(...args).json<T>(),
}

export default api;