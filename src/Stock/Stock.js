import React, { Component } from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import './Stock.css';
import Spinner from '../Spinner';

const Hr = styled.hr`
    margin-top: 60px;
    height: 12px;
    border: 0;
    box-shadow: inset 0 12px 12px -12px rgba(0, 0, 0, 0.5);
`

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 850px;
    margin: 0 auto;
    border-bottom: 1px dashed #E0E0E0;
    height: 50px;
    cursor: pointer;
    :hover{
        background: rgba(131, 58, 224, 0.05);
    }
`

const Company = styled.div`
    display: flex;
    align-items: center;
    span{
        font-size: 12px;
        color: rgba(0, 0, 0, 0.5);
        display: block;
        width: 60px;
    }
    div{
        font-size: 22px;
        color: black;
        width: 600px;
    }
    
`

const Price = styled.div`
    span{
        font-size: 20px;
    }
    width: 150px;
    font-size: 30px;
    color: black;
`
const Search = styled.div`
  input {
    border: none;
    font-family: Roboto;
    font-size: 30px;
    text-align: center;
    color: #833ae0;
    background: #f3f3f3;
    width: 300px;
    margin-left: 11px;
  }
  i {
    border: none;
    font-size: 20px;
  }
  background: #f3f3f3;
  border-radius: 94px;
  width: 400px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: space-around;
  margin: 0 auto;
  margin-bottom: 50px;
`

const Nothing = styled.div`
width: 200px;
margin: 0 auto;
text-align: center;
font-size: 30px;
`

class Stock extends Component{

    state ={
        fetched: [],
        value: '',
        loading: true
    }

    componentDidMount() {
        this.getData();
    }
 
    getData = () => {
        fetch('https://financialmodelingprep.com/api/v3/company/stock/list')
        .then((resp) => resp.json())
        .then((result) =>{
            this.setState({
                fetched: result.symbolsList,
                loading: false
            })
        } 
       )
   }

   search = (items, text) => {
        if(text.toUpperCase().length === 0){
            return items;
        }

        return items.filter((item) => {
            return item.symbol.indexOf(text.toUpperCase()) > -1;
        })
   }    

    render(){
        const searched = this.search(this.state.fetched, this.state.value);
        return(              
            <div>
                <Hr />
                <Search>
                    <i className="fas fa-search"></i>
                    <input value={this.state.value} placeholder="enter company ticker" onChange={(e) => this.setState({value: e.target.value})}/>
                    </Search>
                   
                {searched.length === 0 ? <Nothing>Not found</Nothing> : searched.slice(20 * (1 - 1), 20 * 1).map(item => {
                    const { symbol, name, price} = item;
                    if(!symbol || !name || !price) return null;
                    return(
                        <Link to={'/buy/' + symbol} style={{ textDecoration: 'none' }} key={symbol} onClick={() => this.props.clickHandler(symbol)}>
                        <Wrapper>
                                <Company><span>{symbol}</span><div>{name}</div></Company>
                            <Price>{String(price).substring(0, String(price).indexOf('.'))}<span>{String(price).substring(String(price).indexOf('.'), String(price).length)}$</span></Price>
                        </Wrapper>
                        </Link>
                    )
                })}
            </div>
        )
    }
}

export default Stock;


