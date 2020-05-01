import React from "react"
import styled from "styled-components"
import './Account.css';

const Wrapper = styled.div`
    margin-top: 90px;
    background-color: #833AE0;
    color: #FFDC40;
    width: 850px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;

`
const Container = styled.div`
    max-width: 1350px;
    margin: 0 auto;
    padding: 10px;
    display: flex;
    align-items: center;

`

const BalanceWord = styled.div`
    font-size: 22px;
    margin-right:300px;
`

const BalanceDigits = styled.div`
    width: 180px;
    margin-right: 400px;
    font-size: 36px;
    span{
        font-size: 22px;
    }
    `

const Wrappered = styled.div`
 width: 850px;
 display: flex;
 flex-wrap:wrap;
 justify-content: space-between;
 align-items: center;
 margin: 0 auto;

 }
 `
const Company = styled.div`
 display:flex;
 align-items:center;
 justify-content: space-between;
 border-bottom: 1px dashed #E0E0E0;
 height:50px;

 span{
    font-size: 10px;
    color: rgba(0, 0, 0, 0.5);
    display: block;
    width: 120px;
 }
     div{
        font-size: 22px;
        color: black;
        width: 170px;
    }
    :hover{
        background: rgba(131, 58, 224, 0.05);
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

const Up = styled.div`
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid green;

  `
const Down = styled.div`
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid red;
  `

class Account extends React.Component {
    
    state = {
        data: []
    }

    componentDidMount() {
        this.getInfo();
    }
    getInfo = () => {
        fetch("https://5e8da89e22d8cd0016a798db.mockapi.io/users/6/stocks")
            .then((res) => res.json())
            .then((data) => {
                this.setState({ data: data })
            });

    }
    render() {
        const { data } = this.state;
        console.log(data);
        return (

            <div>
                <Value>
                    <h2>2400.82 $</h2>
                </Value>
                <Change>
                <i className="fas fa-sort-up"></i>23.68$(+0.73%)
                <i className="fas fa-sort-down"></i> -24.85$(-0.25%)
                </Change>
                
                {data.map((item) => {
                    const { id, code, amount, purchasePrice} = item;
                    return(
                        <Wrappered key={id}>
                            <Company><span>{code}</span><div>Nike</div><span>{amount}pcs</span><div>{purchasePrice}$</div><i className="fas fa-sort-down"></i><div>1.2%</div></Company>
                        </Wrappered>
                    )
                } )}
                
            </div>
        )

    }
}

export default Account;

