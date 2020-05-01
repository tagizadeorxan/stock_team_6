import React, { Component } from 'react';
import './Header.css';
import logo from '../logo.svg';
import { Link } from 'react-router-dom';
import styled from "styled-components";

const Container = styled.div`
    max-width: 1350px;
    margin: 0 auto;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    div{
        display: flex;
        width: 173px;
    }
`

const Nav = styled.div`
    position: relative
    text-align: center;
    font-family: Roboto;
    font-weight: 500;
    font-size: 20px;
    color: #000000;
    
`


class Header extends Component{
    render(){
        return(
            <Container>
                <div>
                    <Link to='/' style={{ textDecoration: 'none' }}>
                        <Nav>Account</Nav>
                    </Link>
                    <Link to='/stock' style={{ textDecoration: 'none' }}>
                        <Nav>Stock</Nav>
                    </Link>
                </div>
                <img src={logo}/>
            </Container>
        )
    }
}

export default Header;