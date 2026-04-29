const API_URL = "https://backend-bu42.onrender.com/api";

export default API_URL;
async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) throw new Error(data?.message || 'Error en la solicitud');
  return data;
}

export const api = {
  list: (entity) => request(`/${entity}`),
  create: (entity, payload) => request(`/${entity}`, { method: 'POST', body: JSON.stringify(payload) }),
  update: (entity, id, payload) => request(`/${entity}/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  remove: (entity, id) => request(`/${entity}/${id}`, { method: 'DELETE' })
};
