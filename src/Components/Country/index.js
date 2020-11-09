import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter ,Link, useHistory, useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

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

const Country = (props) => {
    const history = useHistory()
    const countryName = useParams() 

    const handleRedirectToHome = () =>{
        history.push("/");
    }

        const element = props.darkMode? "darkElement" : "lightElement";
        const background = props.darkMode? "darkBackground" : "lightBackground";
        
        const { loading, error, data } = useQuery(GET_BY_COUNTRY,{variables:countryName});

        if (loading) return <div className={"cCountry "+background}>
                                <button className={element} onClick={handleRedirectToHome}>
                                    <i className={"fa fa-long-arrow-left"} aria-hidden="true"></i>
                                    Back
                                </button>
                                <p>Loading...</p>
                            </div>;
        if (error) {
            console.log(JSON.stringify(error,null,2))
            return <div className={"cCountry "+background}>
                        <button className={element} onClick={handleRedirectToHome}>
                            <i className={"fa fa-long-arrow-left"} aria-hidden="true"></i>
                            Back
                        </button>
                        <p>Error...</p>
                    </div>
        }
            else{
                const { name , flag , nativeName, subregion, 
                    population, region, capital, 
                    topLevelDomain, borders } = data.country
                const languages =  data.country.languages.length===0 ? "" : data.country.languages.map(e=>(e.name)).join(", ");
                const currencies =  data.country.currencies.length===0 ? "" : data.country.currencies.map(e=>(e.code)).join(", ")
                return(
                    <div className={"cCountry "+background}>
                <button className={element} onClick={handleRedirectToHome}>
                    <i className={"fa fa-long-arrow-left"} aria-hidden="true"></i>
                    Back
                </button>
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
                                   borders.length===0 ? "" : borders.map((e,i)=>(
                                        <Link to={`/country/${e}`} key={i} className={"border_item "+element}>
                                            {e}
                                        </Link> ))
                                }
                            </div>
                        </div>
                    </div>
                    </div>
            
                                
                        )
                    }
                
            

         
}
 
const mapStateToProps =(state,ownProps)=>{
    return {
        ...state,...ownProps
    }
}
export default connect(mapStateToProps)(withRouter(Country));
