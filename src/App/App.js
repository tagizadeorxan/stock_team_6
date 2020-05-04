import React, { Component } from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from "styled-components";

import Header from '../Header';
import Account from '../Account';
import Stock from '../Stock';
import Buy from '../Buy';
import Balance from '../Balance';
import Sell from '../Sell/Sell';

class App extends Component{
    state = {
        symbol: ''
    }

    clickHandler = (symbol) => {
        this.setState({symbol});
    }
    
    render(){
        return(
            <div>
                <Router>
                    <Header />
                    <Route path='/' exact component={Account}/>
                    <Route path='/stock' render={() => <Stock clickHandler={this.clickHandler} isAuthed={true} />} />
                    <Route path='/buy' render={() => <Buy stockToBuy={this.state.symbol} isAuthed={true} />}/>
                    <Route path='/account/:id' component={Sell}></Route>
                    <Balance />
                </Router>
            </div>
            
        )
    }
}

export default App;