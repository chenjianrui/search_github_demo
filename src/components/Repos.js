import React, { useContext } from 'react'
import styled from 'styled-components'
import { GithubContext } from '../context/context'
import Skeleton from 'react-loading-skeleton'

import { Pie, Doughnut, Column, Bar } from './Charts'


const Repos = () => {
  const { repos, isLoading } = useContext(GithubContext)
  if(isLoading){
    return (
      <section className='section'>
        <Wrapper className='section-center'>
          <div>
            <Skeleton count={10}/>
          </div>
          <div>
            <Skeleton count={10}/>
          </div>
          <div>
            <Skeleton count={10}/>
          </div>
          <div>
            <Skeleton count={10}/>
          </div>
        </Wrapper>
      </section>
    )
  }
  if(repos) {
    const languages = repos.reduce((total, item) => {
      const { language, stargazers_count } = item
      if(!language) return total
      if(!total[language]) {
        total[language] = {
          label: language,
          value: 1,
          stars: stargazers_count
        }
      } else {
        total[language] = {
          ...total[language],
          value: total[language].value + 1,
          stars: total[language].stars + stargazers_count
        }
      }
      return total
    },{})
    // 轉為陣列物件符合 Chart 的格式，再從高到低排序取前五名
    const languageRepos = Object.values(languages).sort((a, b) => b.value - a.value).slice(0, 5)
    // 轉為陣列物件符合 Chart 的格式，再從高到低排序取前五名，最後用 map 來把 stars 覆蓋到 value 上
    // 就能符合格式
    const starsRepos = Object.values(languages).sort((a, b) => b.stars - a.stars).map(item => ({...item, value: item.stars || 1})).slice(0 ,5)

    let {stars, forks} = repos.reduce((total, item) => {
      const { stargazers_count, name, forks } = item
      total.stars[stargazers_count] = {
        label: name,
        value: stargazers_count
      }
      total.forks[forks] = {
        label: name,
        value: forks
      }
      return total
    }, {stars: {}, forks: {}})
    
    stars = Object.values(stars).slice(-5).reverse()
    forks = Object.values(forks).slice(-5).reverse()

    return (
      <section className='section'>
        <Wrapper className='section-center'>
          <Pie data={languageRepos}/>
          <Column data={stars}/>
          <Doughnut data={starsRepos}/>
          <Bar data={forks}/>
        </Wrapper>
      </section>
    )
  }
  return (
    <section className='section'>
      <Wrapper className='section-center'>
      </Wrapper>
    </section>
  )
}

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }
  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos
