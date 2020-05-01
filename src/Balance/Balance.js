import React, { Component } from 'react';
import styled from "styled-components";

const Container = styled.div`
    max-width: 1350px;
    margin: 0 auto;
    padding: 10px;
    display: flex;
    align-items: center;
`

const Wrapper = styled.div`
    margin-top: 90px;
    background-color: #833AE0;
    color: #FFDC40;
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

class Balance extends Component{
    
    state = {
        balance: null
    }

    componentDidMount(){
        this.getBalance();
    }

    componentDidUpdate(){
        this.getBalance();
    }

    getBalance = () => {
        fetch('https://5e8da89e22d8cd0016a798db.mockapi.io/users/6/')
        .then(res => res.json())
        .then(balance => this.setState({balance: String(balance.currentBalance)}))
    }
    render(){
        let { balance } = this.state;
        return(
            <Wrapper>
                <Container>
                    <BalanceWord>Balance:</BalanceWord>
                    {balance && (<BalanceDigits>{balance.substring(0, balance.indexOf('.'))}<span>{balance.substring(balance.indexOf('.'), balance.length)}$</span></BalanceDigits>)}
                </Container>
            </Wrapper>
        )
    }
}

export default Balance;