import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newObj) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObj, config)
  return response.data
}

const update = async (id, newObj) => {
  const targetUrl = `${baseUrl}/${id}`
  const response = await axios.put(targetUrl, newObj)
  return response.data
}

const remove = async (id) => {
  const targetUrl = `${baseUrl}/${id}`
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(targetUrl, config)
  return response.data
}

const exportables = { getAll, create, setToken, update, remove }

export default exportables