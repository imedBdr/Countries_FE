import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter ,Link } from 'react-router-dom';
import gql from "graphql-tag";
import {Query} from "react-apollo";

import "./Country.scss";

const GET_BY_COUNTRY = gql `
    query RootQuerry($name:String){
        country(name:$name){
            name
            flag
            nativeName
            subregion
            population
            region
            capital
            topLevelDomain
            languages{
                name
              }
              currencies{
                code
              }
            borders
        }
    }
    `

class Country extends Component {
    handleRedirectToHome = () =>{
        this.props.history.push("/");
    }
    state = {  }
    render() {
        const element = this.props.darkMode? "darkElement" : "lightElement";
        const background = this.props.darkMode? "darkBackground" : "lightBackground";
        const countryName = this.props.match.params.name;
        return ( 
            <div className={"cCountry "+background}>
                <button className={element} onClick={this.handleRedirectToHome}>
                    <i className={"fa fa-long-arrow-left"} aria-hidden="true"></i>
                    Back
                </button>
                <Query query={GET_BY_COUNTRY} variables={{"name":countryName}}>
                    {({loading,error,data})=>{
                        if(loading) return <h1>Loading...</h1>;
                        if(error) {
                            return <h1>Error</h1>
                        } 
                        else {
                            const { name , flag , nativeName, subregion, 
                                population, region, capital, 
                                topLevelDomain, borders } = data.country
                            const languages = data.country.languages.map(e=>(e.name)).join(", ");
                            const currencies = data.country.currencies.map(e=>(e.code)).join(", ")
                            return(
                                <div className={"grid"}>
                                    <div className={"flag"}>
                                        <img src={flag} alt={`${name} flag`}/>
                                    </div>
                                    <div className={"title"}>
                                        <h2>{name}</h2>
                                    </div>
                                    <div className={"info1"}>
                                        <ul>
                                            <li><span>NativeName: </span>{nativeName}</li>
                                            <li><span>Population: </span>{population}</li>
                                            <li><span>Region: </span>{region}</li>
                                            <li><span>Subregion: </span>{subregion}</li>
                                            <li><span>Capital: </span>{capital}</li>
                                        </ul>
                                    </div>
                                    <div className={"info2"}>
                                        <ul>
                                            <li><span>Top Level Domain: </span>{topLevelDomain}</li>
                                            <li><span>Currencies: </span>{currencies}</li>
                                            <li><span>Languages: </span>{languages}</li>
                                        </ul>
                                    </div>
                                    <div className={"info3"}>
                                        <div className={"info3_1"}>
                                            Border Countries:
                                        </div>
                                        <div className={"info3_2"}>
                                            {
                                                borders.map((e,i)=>(
                                                    <Link to={`/country/${e}`} key={i} className={"border_item "+element}>
                                                        {e}
                                                    </Link> ))
                                            }
                                        </div>
                                    </div>
                                </div>
                                
                        )}
                    }}
                </Query>
                </div>

         );
    }
}
 
const mapStateToProps =(state,ownProps)=>{
    return {
        ...state,...ownProps
    }
}
export default connect(mapStateToProps)(withRouter(Country));