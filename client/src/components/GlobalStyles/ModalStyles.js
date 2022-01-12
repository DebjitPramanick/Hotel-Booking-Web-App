import styled from 'styled-components'

export const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #000000d1;
    z-index: 9999999
`

export const ModalBox = styled.div`;
    width: 700px;
    max-height: 80vh;
    overflow-y: scroll;
    background: #fff;
    padding: 20px;
    border-radius: 6px;
    position: relative;
    .close-icon{
        position: absolute;
        top: 20px;
        right: 20px;
        cursor: pointer
    }
    @media(max-width: 700px){
        width: calc(100vw - 40px);
    }
`

export const ModalTitle = styled.h3`
    font-weight: 26px;
    font-weight: 600;
    margin-bottom: 20px
`

export const RoomSelectionBox = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
    justify-content: center;
    row-gap: 16px;
    column-gap: 16px;
    div{
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid red;
        cursor: pointer;
        border-radius: 4px;
    }
    .assigned{
        background: #ffadad
    }
    .selected{
        background: #8dffd0;
        border-color: green
    }
`

export const GridContainer = styled.div`
    margin-bottom: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 16px;
`

export const AddField = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 4px;
    background: #ffcdb8;
    height: 160px;
    .plus-icon{
        color: #9a9a9a !important;
        font-size: 40px !important;
    }
`

export const FlexBox = styled.div`
    display: flex;
    justify-content: space-between
`