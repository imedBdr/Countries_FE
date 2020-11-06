import React, { Component, Fragment } from 'react';
import {connect} from "react-redux";
import gql from "graphql-tag";
import { Query } from 'react-apollo';
import DropDown from "../Dropdown";
import Input from "../Input";
import Card from "../Card";

import "./Home.scss";

class Home extends Component {
    QueryList = [gql`
    query RootQuerry{ 
        countries{
        name
        population
        region
        capital
        flag
    }}`,
    gql`query RootQuerry($name:String){ 
        countriesSearch(name: $name){
            name
            population
            region
            capital
            flag
        }}`,gql`query RootQuerry($name:String){ 
            countriesByRegion(name: $name){
                name
                population
                region
                capital
                flag
            }}`
]
    state = {
        region:"",
        search:"",
        cQuery:0
     }

    componentDidUpdate=(prevProps,prevState)=>{

    }

    handleSetCountinent=(text)=>{
        this.setState({
            region:text,
            cQuery:2,
            search:""
        })
    }

    handleSearch=(text)=>{
        
        if(text===""){
            this.setState({
                search : "",
                region:"",
                cQuery : 0
            })
        }
        else{
            this.setState({
                search : text,
                region:"",
                cQuery : 1
            })
        }
    }

    render() {
        const { cQuery,search,region } = this.state
        return ( 
            <div className={this.props.darkMode? "cHome darkBackground":"cHome lightBackground"}>
                    <div className={"cTop"}>
                        <Input handleSearch={this.handleSearch} cValue={this.state.search}/>
                        <DropDown default={region} setCountinent={this.handleSetCountinent}/>
                    </div>
            <Query query={this.QueryList[cQuery]} variables={{"name":cQuery===2?region:search}}>
            {({ loading, error, data }) => {
              if (loading) return <h4>Loading...</h4>;
              if (error) {
                  console.log(JSON.stringify(error, null, 2))
                    return <Fragment></Fragment>
                }
                else{
                    let CountryList=[]
                    if(data.countries)
                        CountryList = data.countries 
                        else if(data.countriesSearch) 
                            CountryList = data.countriesSearch
                        else CountryList = data.countriesByRegion
              return (
                    <div className={"cBody"}>
                        {CountryList.map(e=>(
                            <Card capital={e.capital} flag={e.flag} population={e.population} name={e.name} region={e.region} />
                        ))}
                    </div>
                
              )
    }}}

              </Query>
              </div> 
        );
    }
}
 
const  mapStateToProps = (state, ownProps) => {
    return {
        ...state,...ownProps
    }
}

export default connect(mapStateToProps,null)(Home);