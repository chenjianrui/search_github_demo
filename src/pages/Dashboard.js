import React from 'react'
import { Info, Repos, User, Search, Navbar } from '../components'

const Dashboard = () => {
  return (
    <main>
      <Navbar />
      <Search />
      <Info />
      <User />
      <Repos />
    </main>
  )
}

export default Dashboard
