import styled from 'styled-components'

export const Input = styled.input`
    border: 1px solid #b6b6b6;
    outline: 0;
    font-size: 16px;
    padding: 10px 12px;
    border-radius: 4px;
    width: 100%;
`

export const TextArea = styled.textarea`
    border: 1px solid #b6b6b6;
    outline: 0;
    font-size: 16px;
    padding: 10px 12px;
    border-radius: 4px;
    width: 100%;
    height: 100px;
    resize: none;
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
    display: block
`

export const InputContainer = styled.div`
    width: 100%;
    label{
        color: #fff;
        font-size: 16px;
        font-weight: bold;
        display: block;
        margin-bottom: 8px
    }
`
