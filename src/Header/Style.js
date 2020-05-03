import styled from "styled-components";

const Container = styled.div`
    max-width: 1350px;
    margin: 0 auto;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    div{
        display: flex;
    }
    a.active div{
        color: #833AE0;
        &:after {
            content: "";
            position: absolute;
            height: 2px;
            background-color: #833AE0;
            width: 100%;
            left: 20%;
            bottom: 0;
          -webkit-transform: translateX(-50%);
          -ms-transform: translateX(-50%);
            transform: translateX(-50%);
            -webkit-transition: 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) all;
              transition: 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) all;
        }
    }
    a{
        display: inline-block;
        color: #fff;
        position: relative;
        -webkit-transition: all 0.4s ease;
        transition: all 0.4s ease;
        &:after {
            content: "";
            position: absolute;
            height: 2px;
            background-color: black;
            width: 0;
            left: 20%;
            bottom: 0;
          -webkit-transform: translateX(-50%);
          -ms-transform: translateX(-50%);
            transform: translateX(-50%);
            -webkit-transition: 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) all;
              transition: 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) all;
        }
        &:not(.active):hover:after {
            width: 100%;
        }
    }
`

const Nav = styled.div`
    text-align: center;
    width: 170px;
    font-family: Roboto;
    font-weight: 500;
    font-size: 20px;
    color: #000000;
    &:hover{
        color: #FFDC40;
    }
    
`

export {Container, Nav};
