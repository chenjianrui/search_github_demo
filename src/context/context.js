import React, { useState, useEffect } from 'react'

import axios from 'axios'

const rootUrl = 'https://api.github.com'
const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  const [ githubUser, setGithubUser ] = useState(null)
  const [ followers, setFollowers ] = useState(null)
  const [ repos, setRepos ] = useState(null)
  
  const searchGithubUser = async user => {
    const response = await axios.get(`${rootUrl}/users/${user}`)
    
    if(response){
      setGithubUser(response.data)
      const { login, followers_url } = response.data
      try {
        const [repos, followers] = await Promise.all([
          axios(`${rootUrl}/users/${login}/repos?per_page=100`),
          axios(`${followers_url}?per_page=100`)
        ])
        if(repos){
          setRepos(repos.data)
        }
        if(followers){
          setFollowers(followers.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
  useEffect(() => {
    searchGithubUser('chenjianrui')
  }, [])
  return (
    <GithubContext.Provider value={{ githubUser, followers }}>
      { children }
    </GithubContext.Provider>
  )
}

export { GithubContext, GithubProvider }