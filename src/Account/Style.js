import styled from "styled-components";

const Hr = styled.hr`
    margin-top: 45px;
    margin-bottom: 30px;
    height: 12px;
    border: 0;
    box-shadow: inset 0 12px 12px -12px rgba(0, 0, 0, 0.5);
`
const Wrapper = styled.div`
    width: 1000px;
    display: flex;
    flex-wrap:wrap;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    height: 90px;
    vertical-align: middle;
    border-bottom: 1px dashed #E0E0E0;
    cursor: pointer;
    :hover{
        background: rgba(131, 58, 224, 0.05);
    }
 `
const Company = styled.div`
 display:flex;
 align-items:center;
 justify-content: space-between;
 height:50px;
 span{
    font-size: 10px;
    color: rgba(0, 0, 0, 0.5);
    display: block;
    width: 60px;
 }
     div{
        font-size: 22px;
        color: black;
        width: 300px;
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

const Value = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
`
const Change = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 0 auto;
`
const Loading = styled.div`
    width: 200px;
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`
const ForStockList = styled.div`
    width: 1000px;
    overflow: scroll;
    overflow-x: hidden;
    height: 360px;
    margin: 0 auto;
`
const DivForPag = styled.div`
    margin-top: 30px;    
    display: flex;
    flex-direction: row;
    justify-content: center;
`
const PagButton = styled.button`
    height: 30px;
    font-size: 18px;
    margin: 5px;
    border: none;
    color: black;
    background-color: transparent;
    outline: none;
    &:focus {
    color: #833AE0;
    }
    .left {
        transform: rotate(-90deg);
        color: #833AE0;
    }
    .right {
        transform: rotate(90deg);
        color: #833AE0;
    }

    &:hover {
        background-color: #ebebeb;
        border-radius: 5px;
    }
`

export {Hr, Wrapper, Company, Price, Value, Change, Loading, ForStockList, DivForPag, PagButton}
