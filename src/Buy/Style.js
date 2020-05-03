import styled from "styled-components";

const Wrapper = styled.div`
    position: relative;
    margin-top: 60px;
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
    left: 230px;
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
const Loading = styled.div`
    width: 200px;
    margin: 0 auto;
`

export {Wrapper, Hr, Back, Name, Price, QuantityWrapper, Minus, Plus, Total, BuyStock, Loading};
