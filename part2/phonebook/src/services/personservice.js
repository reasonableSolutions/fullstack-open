import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const create = (nameObject) => {
    const request = axios.post(baseURL, nameObject)
    return request.then(response => response.data)
}

const remove = (id) => {
    const request = axios.delete(`${baseURL}/${id}`)
    return request.then(response => response.data)
}

const update = (id, nameObject) => {
    const request = axios.put(`${baseURL}/${id}`, nameObject)
    return request.then(response => response.data)
}

const services = {
    getAll, create, remove, update
}

export default services