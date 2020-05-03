import styled from "styled-components";

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
    height: 90px;
    margin: 0 auto;
    border-bottom: 1px dashed #E0E0E0;
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

// const Nothing = styled.div`
// width: 200px;
// margin: 0 auto;
// text-align: center;
// font-size: 30px;
// `

const Loading = styled.div`
    width: 200px;
    margin: 0 auto;
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
const DivForLink = styled.div`
    width: 850px;
    margin: 0 auto;

`
const DivForPag = styled.div`
margin-top: 30px;    
display: flex;
    flex-direction: row;
    justify-content: center;
`
const DivForList = styled.div`
height: 360px;
width: 1200px;
margin: 0 auto;
overflow: scroll;
overflow-x: hidden;
::-webkit-scrollbar-button{
    // width: 15em;
    border-radius: 10px;
    background-color: green;
}
`
const NotFound = styled.div`
display:flex;
justify-content:center;
font-size: 25px;
`



export {Hr, Wrapper, Company, Price, Search, Loading, PagButton,DivForLink, DivForList, DivForPag, NotFound}
