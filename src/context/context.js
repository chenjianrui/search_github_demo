import React, { useState, useEffect } from 'react'

import axios from 'axios'

const rootUrl = 'https://api.github.com'
const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  const [ githubUser, setGithubUser ] = useState(null)
  const [ followers, setFollowers ] = useState(null)
  const [ repos, setRepos ] = useState(null)
  const [ request, setRequest ] = useState(0)
  const [ error, setError ] = useState({show: false, msg: ''})
  const [ isLoading, setIsLoading ] = useState(true)

  const toggleError = (show = false, msg = '') => {
    setError({show, msg})
  }
  
  const getGithubAPIRequest = async () => {
    const { data } = await axios(`${rootUrl}/rate_limit`)
    let { remaining } = data.rate
    setRequest(remaining)
    if(remaining === 0) {
      toggleError(true, '一小時內的請求已超過限制')
    }
  }

  const searchGithubUser = async user => {
    setIsLoading(true)
    toggleError()
    const response = await axios.get(`${rootUrl}/users/${user}`).catch(err => console.log(err))

    if(response){
      const { login, followers_url } = response.data
      try {
        const [repos, followers] = await Promise.all([
          axios(`${rootUrl}/users/${login}/repos?per_page=100`),
          axios(`${followers_url}?per_page=100`)
        ])
        setGithubUser(response.data)
        if(repos){
          setRepos(repos.data)
        }
        if(followers){
          setFollowers(followers.data)
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      toggleError(true, '找不到使用者名稱')
    }
    setIsLoading(false)
    getGithubAPIRequest()
  }
  useEffect(() => {
    getGithubAPIRequest()
    searchGithubUser('wesbos')
  }, [])
  return (
    <GithubContext.Provider value={{ githubUser, followers, repos, searchGithubUser, request, error, isLoading }}>
      { children }
    </GithubContext.Provider>
  )
}

export { GithubContext, GithubProvider }