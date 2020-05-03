import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner';
import {Wrapper, Hr, Back, Name, Price, QuantityWrapper, Minus, Plus, Total, BuyStock, Loading} from './Style.js';


class Buy extends Component{
    state = {
        stock: [],
        value: '1',
        total: '',
        balance: null,
        loading: true
    }

    componentDidMount(){
        this.getStock();
        this.getBalance();
    }

    // getting information about the stock we want to buy

    checkFetch = (response) => {
        if(!response.ok){
            throw Error('Что-то пошло не так');
        }
        return response;
    }

    getStock = () => {
        fetch('https://financialmodelingprep.com/api/v3/company/stock/list')
        .then(this.checkFetch)
        .then(res => res.json())
        .then(stock => {
            this.setState({stock: stock.symbolsList.filter((item) => item.symbol === this.props.stockToBuy)[0]},
            () => this.calcTotal())
        })
        .catch(err =>  {alert(err); this.setState({ loading: false })})
    }

    // getting the current balance

    getBalance = () => {
        fetch('https://5e8da89e22d8cd0016a798db.mockapi.io/users/6/')
        .then(this.checkFetch)
        .then(res => res.json())
        .then(balance => this.setState({balance: balance.currentBalance, loading: false}))
        .catch(err =>  {alert(err); this.setState({ loading: false })})
    }

    //  sending data about the purchased stock

    postStock = () => {
        const { stock, total, value } = this.state;
        const data = {
            code: stock.symbol,
            amount: value,
            purchasePrice: total
        }
        fetch('https://5e8da89e22d8cd0016a798db.mockapi.io/users/6/stocks', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json'
            }
          });
          this.updateBalance();
    }

    // updating the balance after purchase

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

    // calculating the final amount of purchase

    calcTotal = () => {
        const { stock, value } = this.state;
        let total = +stock.price * +value;
        this.setState({total: String(total)});
    }

    increaseQuantity = () => {
        this.setState(({value}) => {
            return {
                value: +value + 1
            }
        }, () => this.calcTotal())
    }

    decreaseQuantity = () => {
        if(this.state.value <= 1) return;
        this.setState(({value}) => {
            return {
                value: +value - 1
            }
        }, () => this.calcTotal()) 
    }

    render(){
        const { stock, total, loading } = this.state;
        const price = String(stock.price);
        const totalString = String(Number(total).toFixed(2));
        return(
            <div>
            {loading ? (<Loading><Spinner/></Loading>) : (<Wrapper>
                <Link to='/stock' style={{ textDecoration: 'none' }}>
                    <Back><i className="fas fa-chevron-left"></i> Back</Back>
                </Link>
                <Name>Buy {stock.name}</Name>
                <Hr/>
                <Price>{price.substring(0, price.indexOf('.'))}<span>{price.substring(price.indexOf('.'), price.length)}$</span></Price>
                <QuantityWrapper>
                    <Minus onClick={this.decreaseQuantity}>-</Minus>
                    <div><input type='number' value={this.state.value} onChange={this.changeHandler}/></div>
                    <Plus onClick={this.increaseQuantity}>+</Plus>
                </QuantityWrapper>
                <Total>Buy for <span>{totalString.substring(0, totalString.indexOf('.'))}</span>{totalString.substring(total.indexOf('.'), totalString.length)}$</Total>
                <Link to='/stock' style={{ textDecoration: 'none' }}>
                    <BuyStock onClick={this.postStock}>Buy</BuyStock>
                </Link>
            </Wrapper>)}
            </div>
            
        )
    }
}

export default Buy;