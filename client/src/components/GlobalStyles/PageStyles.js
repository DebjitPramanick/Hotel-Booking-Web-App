import styled from 'styled-components'

export const PageTitle = styled.div`
    text-transform: capitalize;
    padding: 8px 12px 6px 12px;
    border-radius: 4px;
    font-weight: 700;
    color: #fff
`

export const PageContainer = styled.div`
    margin-top: 65px;
    padding: 16px;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    .overlay{
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        height: 100vh;
        right: 0;
        background: #0000004d;
        z-index: 1;
    }


`

export const SplitContainer = styled.div`
    display: flex;
    .first-child{
        margin-right: 16px
        flex-basis: 20%;
    }
    .second-child{
        flex-basis: 80%
    }
`

export const Input = styled.input`
    border: 1px solid #b6b6b6;
    outline: 0;
    font-size: 16px;
    padding: 10px 12px;
    border-radius: 4px;
    width: 100%;
`

export const SelectBox = styled.select`
    border: 1px solid #b6b6b6;
    outline: 0;
    font-size: 16px;
    padding: 10px 12px;
    border-radius: 4px;
    cursor: pointer
`

export const FormTitle = styled.h3`
    font-size: 26px;
    font-weight: 600;
    color: #969696
`

export const FormButton = styled.button`
    font-size: 14px;
    font-weight: 600;
    color: white;
    padding: 10px 20px;
    text-align: center;
    outline: 0;
    border: 0;
    border-radius: 40px;
    background: #ff6e29;
    cursor: pointer;
    display: block;
    :disabled{
        background: grey
    }
`

export const Image = styled.div`
    display: flex;
    align-items: center;
    justify-content: center
    overflow: hidden;
    border-radius: 4px;
    min-width: 160px;
    min-height: 160px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat
`

export const SearchBoxContainer = styled.div`
    padding: 20px;
    border-radius: 10px;
    box-shadow: 5px 6px 20px 3px #66666682;
    z-index: 9999;

    .small-search-button {
        margin: 22px 0 0 auto;
        height: 40px;
        width: 40px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;

        @media(max-width: 700px) {
            display: none;
        }
    }

    .large-search-button {
        display: none;
        width: 100%;
        margin-top: 16px;

        @media(max-width: 700px) {
            display: block
        }
    }
`

export const Text = styled.p`
    font-size: 26px;
    font-weight: bold;
    margin-bottom: 14px;
    &.small{
        font-size: 16px;
        font-weight: normal;
    }
    &.clip{
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    &.clamp{
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        white-space: normal;
        color: grey
    }
    span{
        font-weight: bold;
        &.highlight{
            display: inline-block;
            text-align: center;
            min-width: 60px;
            color: white;
            background: #019a01;
            border-radius: 18px;
            padding: 4px 10px;
        }
    }
`