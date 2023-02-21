import styled from 'styled-components'

export const Item = styled.div`
  height: 58px;
  border: 1px solid #d2d2d2;
  padding: 8px 10px;
  display: grid;
  align-items: center;
  justify-content: space-between;
  border-radius: 6px;
  margin-bottom: 10px;

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

export const Text = styled.p`
  margin: 0 !important;
  text-align: center;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;
  :first-child{
    text-align: left;
  }
  p{
    width: fit-content;
    margin: 0
  }
`;

export const Button = styled.button`
  width: 40px;
  height: 40px;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d2d2d2;
  border-radius: 4px !important;
  outline: 0;
  margin: 0 6px !important;
  background: transparent;
  cursor: pointer
`;

export const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
