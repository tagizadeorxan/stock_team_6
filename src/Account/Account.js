import React from "react";
import './Account.css';
import Spinner from '../Spinner';
import {Hr, Wrapper, Company, Price, Value, Change, Loading, ForStockList, DivForPag, PagButton} from './Style';



class Account extends React.Component {

    state = {
        data: [],
        loading: true,
        currentPage: 1,
        pageIndex: 1,
        pageSize: 20,
        pageNumbers: 0,
        firstIndex: 0,
        lastIndex: 0,
        threeDots: false,
        threeDotsEnd: true,
    }

    componentDidMount() {
        this.getInfo();
    }

    // getting info about all acquired stocks

    getInfo = () => {
        fetch("https://5e8da89e22d8cd0016a798db.mockapi.io/users/6/stocks")
            .then((res) => res.json())
            .then((data) => {
                let some = [];
                for (let comp of data) {
                    fetch(`https://financialmodelingprep.com/api/v3/company/profile/${comp.code}`)
                        .then((res) => res.json())
                        .then((data) => {
                            comp.companyName = data.profile.companyName;
                            comp.changes = data.profile.changes;
                            comp.changesPercentage = data.profile.changesPercentage;
                            some.push(comp);
                            this.setState({ data: some, loading: false });
                            let pageNumbers = Math.ceil(this.state.data.length/this.state.pageSize);
                            let firstIndex = (this.state.currentPage-1)*this.state.pageSize;
                            let lastIndex = (this.state.currentPage)*this.state.pageSize;
                            this.setState({
                                pageNumbers: pageNumbers,
                                firstIndex: firstIndex,
                                lastIndex: lastIndex
                            })
                        });
                }
                
            });
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

    render() {
        const { data } = this.state;
        const total = data.reduce((prevValue, currentValue) => prevValue + +currentValue.purchasePrice,0); 
        const totalChanges = data.reduce((prevValue, currentValue) => prevValue + +currentValue.changes,0);
        const totalChangesPercentage = totalChanges/total*100;
        return (
           <div>
                <Value>
                    <h2>{total.toFixed(2)} $</h2>
                </Value>
                <Change>
                    {totalChanges>0?<i className="fas fa-caret-up"></i>:<i className="fas fa-caret-down"></i>}{totalChanges.toFixed(2)}$({totalChangesPercentage.toFixed(2)}%)
                </Change>

                <Hr />
                <Loading>{this.state.loading && <Spinner />}</Loading>
                <ForStockList>
                    {data.slice(this.state.firstIndex, this.state.lastIndex).map((item) => {
                        const { id, code, amount, purchasePrice, companyName, changes, changesPercentage } = item;
                        return (
                            <Wrapper key={id}>
                                <Company><span>{code}</span><div>{companyName}</div><span>{amount}</span><div>{Number(purchasePrice).toFixed(2)} $</div>{changes>0?<i className="fas fa-caret-up"></i>:<i className="fas fa-caret-down"></i>}<div>{changes}{changesPercentage}</div></Company>
                            </Wrapper>
                        )
                    })}
                </ForStockList> 
                <DivForPag> 
                <PagButton onClick ={this.paginateLeft}><i className="fas fa-chevron-up left"></i></PagButton>
                <PagButton onClick ={this.goToPage} value = {1}>1</PagButton>
                {this.state.threeDots && <PagButton >...</PagButton> }
                {this.state.pageNumbers > 1 && <PagButton onClick ={this.goToPage} value = {this.state.pageIndex+1}>{this.state.pageIndex+1}</PagButton>}
                {this.state.pageNumbers > 2 && <PagButton onClick ={this.goToPage} value = {this.state.pageIndex+2}>{this.state.pageIndex+2}</PagButton>}
                {this.state.pageNumbers > 3 && <PagButton onClick ={this.goToPage} value = {this.state.pageIndex+3}>{this.state.pageIndex+3}</PagButton>}
                {this.state.threeDotsEnd && this.state.pageNumbers > 5 && <PagButton onClick ={this.paginate} >...</PagButton>}
                {(this.state.pageNumbers > 5) && <PagButton onClick ={this.goToPage} value = {this.state.pageNumbers}>{this.state.pageNumbers}</PagButton> }
                <PagButton onClick ={this.paginateRight}><i className="fas fa-chevron-up right"></i></PagButton>
                </DivForPag>
               
            </div>
        )

    }
}

export default Account;