import { useState } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const onReset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    onReset
  }
}

export const useResource = (baseUrl) => {
  let token = null
  const setToken = newToken => {
    token = `Bearer ${newToken}`
  }

  const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
  }

  const create = async (newObject) => {
    const config = {
      headers: { Authorization: token}
    }
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
  }
  
  return {
    setToken,
    getAll,
    create
  }
}

