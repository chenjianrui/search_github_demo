import React, { useContext } from 'react'
import styled from 'styled-components'
import { GithubContext } from '../context/context'

import { Pie } from './Charts'


const Repos = () => {
  const { repos } = useContext(GithubContext)
  if(repos) {
    let languages = repos.reduce((total, item) => {
      const { language } = item
      if(!language) return total
      if(!total[language]) {
        total[language] = {
          label: language,
          value: 1
        }
      } else {
        total[language] = {
          ...total[language],
          value: total[language].value + 1
        }
      }
      return total
    },{})
    // 轉為陣列物件符合 Chart 的格式，再從高到低排序取前五名
    languages = Object.values(languages).sort((a, b) => b.value - a.value).slice(0, 5)
    return (
      <section className='section'>
        <Wrapper className='section-center'>
          <Pie data={languages}/>
        </Wrapper>
      </section>
    )
  }
  return (
    <section className='section'>
      <Wrapper className='section-center'>
        Loading...
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
