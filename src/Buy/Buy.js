import React, { Component } from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
    position: relative;
`

const Hr = styled.hr`
    height: 12px;
    border: 0;
    box-shadow: inset 0 12px 12px -12px rgba(0, 0, 0, 0.5);
`

const Back = styled.div`
    color: #833AE0;
    font-size: 24px;
    position: absolute;
    top: 16px;
    left: 150px;
    cursor: pointer;
    i{
        font-size: 20px;
    }
`

const Name = styled.div`
    width: 600px;
    margin: 0 auto;
    color: #2FC20A;
    font-size: 48px;
    text-align: center;
    margin-bottom: 30px;
`

const Price = styled.div`
    width: 200px;
    margin: 0 auto;
    margin-top: 50px;
    text-align: center;
    font-size: 30px;
    span{
        display: inline-block;
        font-size: 20px;
    }
`

const QuantityWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 200px;
    margin: 0 auto;
    margin-top: 50px;
    input{
        width: 110px;
        font-size: 64px;
        color: #833AE0;
        text-align: center;
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
    }
    
`
const Minus = styled.div`
    font-weight: 200;
    font-size: 36px;
    color: #833AE0;
    cursor: pointer;
`

const Plus = styled.div`
    font-weight: 200;
    font-size: 36px;
    color: #833AE0;
    cursor: pointer;
`

const Total = styled.div`
    width: 200px;
    margin: 0 auto;
    margin-top: 50px;
    text-align: center;
    font-size: 20px;
    span{
        display: inline-block;
        font-size: 30px;
    }
`

const BuyStock = styled.button`
    display: block;
    width: 180px;
    height: 50px;
    margin: 0 auto;
    margin-top: 50px;
    font-size: 24px;
    color: #833AE0;
    background-color: white;
    border: 2px solid #833AE0;
    border-radius: 20px;
    cursor: pointer;
    
`

class Buy extends Component{
    state = {
        stock: [],
        value: '1',
        total: '',
        balance: null
    }

    componentDidMount(){
        this.getStock();
        this.getBalance();
        this.calcTotal();
    }

    getStock = () => {
        fetch('https://financialmodelingprep.com/api/v3/company/stock/list')
        .then(res => res.json())
        .then(stock => {
            this.setState({stock: stock.symbolsList.filter((item) => item.symbol === this.props.stockToBuy)[0]})
        })
    }

    getBalance = () => {
        fetch('https://5e8da89e22d8cd0016a798db.mockapi.io/users/6/')
        .then(res => res.json())
        .then(balance => this.setState({balance: balance.currentBalance}))
    }

    postStock = () => {
        const { stock, total, value } = this.state;
        const data = {
            code: stock.symbol,
            amount: value,
            purchasePrice: total
        }
        console.log(data)
        fetch('https://5e8da89e22d8cd0016a798db.mockapi.io/users/6/stocks', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json'
            }
          });
          this.updateBalance();

    }

    updateBalance = () => {
        const { total, balance } = this.state;
        const data = {
            currentBalance: balance - total
        }
        fetch('https://5e8da89e22d8cd0016a798db.mockapi.io/users/6/', {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json'
            }
          });
    }

    changeHandler = (e) =>{
        this.setState({value: e.target.value}, () => this.calcTotal());
    }

    calcTotal = () => {
        const { stock, value } = this.state;
        let total = +stock.price * +value;
        this.setState({total: String(total)})
    }

    render(){
        const { stock, total } = this.state;
        const price = String(stock.price);
        return(
            <Wrapper>
                <Link to='/stock' style={{ textDecoration: 'none' }}>
                    <Back><i className="fas fa-chevron-left"></i> Back</Back>
                </Link>
                <Name>Buy {stock.name}</Name>
                <Hr/>
                <Price>{price.substring(0, price.indexOf('.'))}<span>{price.substring(price.indexOf('.'), price.length)}$</span></Price>
                <QuantityWrapper>
                    <Minus>-</Minus>
                    <div><input type='number' value={this.state.value} onChange={this.changeHandler}/></div>
                    <Plus>+</Plus>
                </QuantityWrapper>
                <Total>Buy for <span>{total.substring(0, price.indexOf('.'))}</span>{total.substring(price.indexOf('.'), price.length)}$</Total>
                <Link to='/' style={{ textDecoration: 'none' }}>
                <BuyStock onClick={this.postStock}>Buy</BuyStock>
                </Link>
            </Wrapper>
        )
    }
}

export default Buy;