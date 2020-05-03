import React, { Component } from 'react';
import './Header.css';
import logo from '../logo.svg';
import { NavLink } from 'react-router-dom';
import {Container, Nav} from './Style';


class Header extends Component{
    render(){
        return(
            <Container>
                <div>
                    <NavLink to='/' exact style={{ textDecoration: 'none' }}>
                        <Nav>Account</Nav>
                    </NavLink>
                    <NavLink to='/stock' style={{ textDecoration: 'none' }}>
                        <Nav>Stock</Nav>
                    </NavLink>
                </div>
                <img src={logo}/>
            </Container>
        )
    }
}

export default Header;