import styled from "styled-components";


const Container = styled.div`
    max-width: 1350px;
    margin: 0 auto;
    padding: 10px;
    display: flex;
    align-items: center;
    `

const Wrapper = styled.div`
    margin-top: 50px;
    background-color: #833AE0;
    color: #FFDC40;
    position: fixed;
    bottom: 0;
    width: 100%;
`


const BalanceWord = styled.div`
    font-size: 22px;
`

const BalanceDigits = styled.div`
    width: 180px;
    margin-left: 510px;
    font-size: 36px;
    text-align: center;
    span{
        font-size: 22px;
    }
`
export {Container, Wrapper, BalanceWord, BalanceDigits};
