import React from 'react';
import './sell.css';

class Sell extends React.Component {

    state = {id:0,data:{},code:'',codeData:{ symbol: '', profile: { price: '', companyName: '' } },value:1,price:0};

   constructor(props) {
       super(props);
       this.props = props;
    this.getData(this.props.match.params.id);
      
   }

   async getData (id) {
        await fetch(`https://5e8da89e22d8cd0016a798db.mockapi.io/users/6/stocks/${id}`).then(data => data.json()).then(data => this.setState({data,code:data.code,id}));
        this.getCodeData(this.state.code);
        console.log(this.state.data,this.state.code);
   }

   async getCodeData(code) {
       await fetch(`https://financialmodelingprep.com/api/v3/company/profile/${code}`).then(data=> data.json()).then(data => this.setState({codeData:data}));
       this.setState({price:this.state.codeData.profile.price});
   }


   handleSell = () => {
        
     this.removeStock();
    

   }



   async removeStock () {
    let result = false;
    if(this.state.data.amount>this.state.value) {
    
    let options = {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
            amount: this.state.data.amount-this.state.value,
            purchasePrice: this.state.price,
        })
    }

    const response = await fetch(`http://5e8da89e22d8cd0016a798db.mockapi.io/users/6/stocks/${this.state.id}`, options).then(res => (res.status === 200) ? result = true : alert("something wrong please try again later"))
        .catch((err) => console.log(err));
    if(result){
        this.updateBalance();
    }


} else {
      const response = await  fetch(`http://5e8da89e22d8cd0016a798db.mockapi.io/users/6/stocks/${this.state.id}`, {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json' },
        }).then(res => (res.status === 200) ? result = true : alert("something wrong please try again later"))
     if(result) {
         this.updateBalance();
     }
    }

   
   } 

   async updateBalance () {
    let currentBalance = 0;
    
     await fetch('https://5e8da89e22d8cd0016a798db.mockapi.io/users/6').then(data => data.json()).then(data=> currentBalance = data.currentBalance);


    let options = {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
            currentBalance: currentBalance + this.state.price,
        })
    }

      fetch('https://5e8da89e22d8cd0016a798db.mockapi.io/users/6',options);
   }


   handleMinus = () => {
    let result = (this.state.value > 1 )?  this.setState({ value: this.state.value - 1 }, () => this.changePrice()) : null;
}

//function when + button pressing increse quantity of stock

handlePlus = () => {
  
   let result = (this.state.data.amount>this.state.value) ? this.setState({ value: this.state.value + 1 }, () => this.changePrice()):null;
}


changePrice = () => {
    let { codeData } = this.state;
    let price = this.state.value * codeData.profile.price;
    this.setState({ price });
}



   render() {

      

    let { codeData } = this.state;
    console.log(codeData);
    let numberOne = Number(codeData.profile.price).toFixed(2);
    let numberTwo = Number(this.state.price).toFixed(2);
    let splitstring = String(numberOne).split('.');
    let splitstring2 = String(numberTwo).split('.');

    return (
        <div className="main">

            <div className="container">
                <div><i className="glyphicon glyphicon-menu-left"></i><button onClick={() => this.props.history.goBack()}>Back</button></div>
                <div><p>{this.state.codeData.profile.companyName}</p></div>
            </div>
            <div className="buy-defaut-price"><p>{splitstring[0]}.</p><span>{splitstring[1]}$</span></div>
            <div className="buy-quantity">
                <button onClick={this.handleMinus}>-</button>
                <span>{this.state.value}</span>
                <button onClick={this.handlePlus}>+</button>
            </div>
            <div className="buy-price">
                <span>Sell for </span>
                <span> {splitstring2[0]}.</span>
                <span>{splitstring2[1]}$</span>
            </div>
            <div className="buy-button" > <button onClick={this.handleSell}>Sell</button></div>
            {/* <DatePicker symbol={this.state.data.symbol} /> */}
        </div>
    )
}
}

export default Sell;






