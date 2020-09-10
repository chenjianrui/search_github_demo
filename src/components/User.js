import React from 'react'
import styled from 'styled-components'

import Card from './Card'

const User = () => {
  return (
    <section className='section'>
      <Wrapper className='section-center'>
        <Card />
      </Wrapper>
    </section>
  )
}

const Wrapper = styled.section`
  padding-top: 2rem;
  display: grid;
  gap: 3rem 2rem;
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`

export default User
