import React, { useState, useEffect } from 'react'

import axios from 'axios'

const rootUrl = 'https://api.github.com'
const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  const [ githubUser, setGithubUser ] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${rootUrl}/users/chenjianrui`)
      setGithubUser(response.data)
    }
    fetchData()
  }, [])
  return (
    <GithubContext.Provider value={{ githubUser }}>
      { children }
    </GithubContext.Provider>
  )
}

export { GithubContext, GithubProvider }