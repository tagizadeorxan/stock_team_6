import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Stock.css';
import Spinner from '../Spinner';
import {Hr, Wrapper, Company, Price, Search, Loading, PagButton,DivForLink, DivForList, DivForPag, NotFound} from './Style';


class Stock extends Component{

    state ={
        fetched: [],
        value: '',
        loading: true,
        currentPage: 1,
        pageIndex: 1,
        pageSize: 20,
        pageNumbers: 0,
        firstIndex: 0,
        lastIndex: 0,
        threeDots: false,
        threeDotsEnd: true
    }

    componentDidMount() {
        this.getData();
    
    }

    //getting data from API of shares' list and setting states for pagination

    checkFetch = (response) => {
        if(!response.ok){
            throw Error('Что-то пошло не так');
        } 
        return response;
    }

    getData = () => {
        fetch("https://financialmodelingprep.com/api/v3/company/stock/list",{
  method:'GET',
  headers: {
    'Content-Type': 'application/json',
   
  },
})
.then(res => res.text())
.then(data => {
  // Пробуем распарсить полученные данные, если не получается - обрезаем
  try {
    return JSON.parse(data);
  } catch(err) {
    const lastRecStart = data.lastIndexOf('{');
    const trimmedData = data.substr(0, lastRecStart - 2) + ']}';
    return JSON.parse(trimmedData);
  }
})
.then(parsedData => {
  // Дальше работаем с данными

  
      this.setState({
          fetched: parsedData.symbolsList,
          loading: false,
          
      })
      let pageNumbers = Math.ceil(this.state.fetched.length/this.state.pageSize);
      let firstIndex = (this.state.currentPage-1)*this.state.pageSize;
      let lastIndex = (this.state.currentPage)*this.state.pageSize;
      this.setState({
      pageNumbers: pageNumbers,
      firstIndex: firstIndex,
      lastIndex: lastIndex
      })
  }
 )
 .catch(err =>  {console.log(err); this.setState({ loading: false })})
}





   

   //finds the requested stock

   search = (items, text) => {
        if(text.toUpperCase().length === 0){
            return items;
        }

        return items.filter((item) => {
            return item.symbol.indexOf(text.toUpperCase()) > -1;
        })
   }
   
   // pagination per the page number clicked

   goToPage = (e) =>{
       let curPage = e.target.value;
       let firstIndex = (curPage-1) * this.state.pageSize;
       let lastIndex = curPage *this.state.pageSize;
       let pageNo = this.state.pageNumbers;
       this.setState({
           currentPage: curPage,
           firstIndex:firstIndex,
        lastIndex: lastIndex
       })
       if (curPage > this.state.pageIndex+2 && curPage < this.state.pageNumbers - 1) {
           this.setState({
            currentPage: curPage,
            firstIndex: firstIndex,
            lastIndex: lastIndex,
            pageIndex: this.state.pageIndex+1,
            threeDots: true,
            
           })
       } else if (curPage < this.state.pageIndex+2 && curPage > 2) {
        this.setState({
            currentPage: curPage,
            firstIndex: firstIndex,
            lastIndex: lastIndex,
            pageIndex: this.state.pageIndex-1,
            threeDots: true,
            threeDotsEnd: true,
           })
       } else if (curPage <3 && curPage > 1) {
        this.setState({
            currentPage: curPage,
            firstIndex: firstIndex,
            lastIndex: lastIndex,
          
            threeDots: false,
           })
       } else if (Number(curPage) === 1) {
           this.setState({
               pageIndex: 1,
               threeDots:false,

           })
       } else if (Number(curPage) === pageNo) {
           this.setState({
               pageIndex: curPage-4,
               threeDotsEnd:false,
               threeDots: true
           })
       }

      
   }

   // pagination to left per Left arrow click

   paginateLeft = () => {
       let curPage = this.state.currentPage - 1;
       let firstIndex = (curPage-1) * this.state.pageSize;
       let lastIndex = curPage *this.state.pageSize;
       
       if (curPage > 2) {
        this.setState({
            currentPage: curPage,
            firstIndex: firstIndex,
            lastIndex: lastIndex,
            pageIndex: this.state.pageIndex -1,
        })
       }
       if (curPage === 2) {
           this.setState({
               threeDots: false,
           })
       }
       
   }

   // pagination to right per Right arrow click

   paginateRight = () => {
    let curPage = this.state.currentPage + 1;
    let firstIndex = (curPage-1) * this.state.pageSize;
    let lastIndex = curPage *this.state.pageSize;
    
    if (curPage < this.state.pageNumbers) {
        this.setState({
            currentPage: curPage,
            firstIndex: firstIndex,
            lastIndex: lastIndex,
            pageIndex: this.state.pageIndex + 1,
        })
    }
    if (curPage > 3) {
         this.setState({
             threeDots:true
         })
     }
    
    }

    render(){
        const searched = this.search(this.state.fetched, this.state.value);
        return(              
            <div>
                <Hr />
                <Search>
                    <i className="fas fa-search"></i>
                    <input style = {{outline: 'none'}}value={this.state.value} placeholder="enter company ticker" onChange={(e) => this.setState({value: e.target.value})}/>
                    </Search>
                    <NotFound>{(searched.length > 0 || this.state.loading) ? "":"Not found"}</NotFound>
                    <Loading>{this.state.loading && <Spinner />}</Loading>
                    <DivForList>
                    {searched.slice(this.state.firstIndex, this.state.lastIndex).map(item => {
                    const { symbol, name, price} = item;
                    if(!symbol || !name || !price) return null;
                    return(
                        <DivForLink key={symbol}>
                            <Link to={'/buy/' + symbol} style={{ textDecoration: 'none' }} onClick={() => this.props.clickHandler(symbol)}>
                            <Wrapper>
                                    <Company><span>{symbol}</span><div>{name}</div></Company>
                                <Price>{String(price).substring(0, String(price).indexOf('.'))}<span>{String(price).substring(String(price).indexOf('.'), String(price).length)}$</span></Price>
                            </Wrapper>
                            </Link> 
                        </DivForLink>
                    )
                })}
                    </DivForList>
                  
                <DivForPag> 
                <PagButton onClick ={this.paginateLeft}><i className="fas fa-chevron-up left"></i></PagButton>
                <PagButton onClick ={this.goToPage} value = {1}>1</PagButton>
                {this.state.threeDots && <PagButton >...</PagButton> }
                <PagButton onClick ={this.goToPage} value = {this.state.pageIndex+1}>{this.state.pageIndex+1}</PagButton>
                <PagButton onClick ={this.goToPage} value = {this.state.pageIndex+2}>{this.state.pageIndex+2}</PagButton>
                <PagButton onClick ={this.goToPage} value = {this.state.pageIndex+3}>{this.state.pageIndex+3}</PagButton>
                {this.state.threeDotsEnd && <PagButton onClick ={this.paginate} >...</PagButton>}
            <PagButton onClick ={this.goToPage} value = {this.state.pageNumbers}>{this.state.pageNumbers}</PagButton>
                <PagButton onClick ={this.paginateRight}><i className="fas fa-chevron-up right"></i></PagButton>
                </DivForPag>

            </div>
        )
    }
}

export default Stock;

// slice(4 * (1 - 1),4 * 1)
// , display:'inline-block', margin: '0 auto', width: '900px'
