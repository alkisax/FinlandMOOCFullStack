import axios from 'axios'
// const baseUrl = 'http://localhost:3001/persons'
// const baseUrl = import.meta.env.VITE_API_URL
// const baseUrl = import.meta.env.VITE_API_URL ||   'https://finlandmoocfullstackpart3.onrender.com/api/persons' // this because they where uploaded as same service on render
// const baseUrl = 'https://finlandmoocfullstackpart3.onrender.com/api/persons' 

const LOCAL_URL = 'http://localhost:3001/api/persons';
const REMOTE_URL = 'https://finlandmoocfullstackpart3.onrender.com/api/persons';
let baseUrl = REMOTE_URL; // Default to remote
axios
  .get(LOCAL_URL)
  .then((response) => {
    if (response.status === 200) {
      console.log("Using local server");
      baseUrl = LOCAL_URL;
    }
  })
  .catch(() => {
    console.log("Local server not found, using remote API.");
  });


const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const deleteId = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default { 
  getAll, create, update, deleteId 
}