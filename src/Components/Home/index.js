import React, { useState } from 'react';
import {connect} from "react-redux";
import { gql, useQuery } from '@apollo/client';
import DropDown from "../Dropdown";
import Input from "../Input";
import Card from "../Card";

import "./Home.scss";

 const Home = (props) => {
   const QueryList = [gql`
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
        }}`,
    gql`query RootQuerry($name:String){ 
        countriesByRegion(name: $name){
            name
            population
            region
            capital
            flag
        }}`
]
    const [region ,setRegion] = useState("");
    const [search ,setSearch] = useState("");
    const [cQuery ,setCQuery] = useState(0);


   const handleSetCountinent=(text)=>{
        setRegion(text)
        setCQuery(2)
        setSearch("")  
    }

    const handleSearch=(text)=>{
        if(text===""){
            setRegion("")
            setCQuery(0)
            setSearch("") 
        }
        else{
            setRegion("")
            setCQuery(1)
            setSearch(text) 
        }
    }
    const { loading, error, data } = useQuery(QueryList[cQuery],{variables:{name:cQuery==1? search : region }})
    
        if (loading) return <div className={props.darkMode? "cHome darkBackground":"cHome lightBackground"}>
                    <div className={"cTop"}>
                        <Input handleSearch={handleSearch} cValue={search}/>
                        <DropDown default={region} setCountinent={handleSetCountinent}/>
                    </div><h4>Loading...</h4>
                </div>;
        if (error) {
            console.log(JSON.stringify(error, null, 3))
            return <div className={props.darkMode? "cHome darkBackground":"cHome lightBackground"}>
                        <div className={"cTop"}>
                            <Input handleSearch={handleSearch} cValue={search}/>
                            <DropDown default={region} setCountinent={handleSetCountinent}/>
                        </div><h4>Error...</h4>
                    </div>;
        }
        else{
            let CountryList=[]
            if(data.countries)
                CountryList = data.countries 
            else if(data.countriesSearch) 
                CountryList = data.countriesSearch
            else CountryList = data.countriesByRegion
            return (
                <div className={props.darkMode? "cHome darkBackground":"cHome lightBackground"}>
                    <div className={"cTop"}>
                        <Input handleSearch={handleSearch} cValue={search}/>
                        <DropDown default={region} setCountinent={handleSetCountinent}/>
                    </div>
                    <div className={"cBody"}>
                        {CountryList.lenght === 0 ? "" : CountryList.map(e=>(
                            <Card capital={e.capital} flag={e.flag} population={e.population} name={e.name} region={e.region} />
                        ))}
                    </div>
                </div> 
        
            )
        }
}
 
const  mapStateToProps = (state, ownProps) => {
    return {
        ...state,...ownProps
    }
}

export default connect(mapStateToProps,null)(Home);