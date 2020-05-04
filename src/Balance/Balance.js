import React, { Component } from 'react';
import {Container, Wrapper, BalanceWord, BalanceDigits} from './Style';


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

    checkFetch = (response) => {
        if(!response.ok){
            throw Error('Что-то пошло не так');
        }
        return response;
    }

    getBalance = () => {
        fetch('https://5e8da89e22d8cd0016a798db.mockapi.io/users/6/')
        .then(res=> this.checkFetch(res))
        .then(res => res.json())
        .then(balance => this.setState({balance: String(balance.currentBalance.toFixed(2))}))
        .catch(err => console.log(err));
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