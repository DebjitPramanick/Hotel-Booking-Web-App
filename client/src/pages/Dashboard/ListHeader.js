import React from 'react'
import styled from 'styled-components'

const Header = styled.div`
    margin-top: 20px;
    display: grid;
    align-items: center;
    padding: 10px;
    p{
      text-align: center;
      margin: 0 !important;
      font-weight: bold
    }
    p:first-child{
      text-align: left
    }

    &.normal-col{
      @media(max-width: 700px) {
        display: none;
      }
    }
  
    &.responsive-col{
      display: none;
      grid-template-columns: 0.5fr 1fr !important;
  
      @media(max-width: 700px) {
        display: grid;
      }
    }
`;


const ListHeader = ({ list }) => {
  return (
    <>
      <Header style={{ gridTemplateColumns: `repeat(${list.length}, 1fr)` }} className='normal-col'>
        {list.map(l => <p>{l}</p>)}
      </Header>

      <Header className='responsive-col'>
        <p>{list[0]}</p>
        <p>{list[list.length-1]}</p>
      </Header>
    </>
  )
}

export default ListHeader
