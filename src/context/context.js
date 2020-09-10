import React, { useState, useEffect } from 'react'

import axios from 'axios'

const rootUrl = 'https://api.github.com'
const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  return (
    <GithubContext.Provider value="test">
      { children }
    </GithubContext.Provider>
  )
}

export { GithubContext, GithubProvider }