import React from "react";
import { connect } from "redux";

const Card = (props) =>(
    <div className={"cCard"}>
        <img src={""} alt={""}></img>
        <h3>{props.name}</h3>
        <p>Population: {props.population}</p>
        <p>Region: {props.region}</p>
        <p>Capital: {props.capital}</p>
    </div>
) 

const mapStateToProps = (state, ownProps) => {
    return {
        prop: {...state,...ownProps}
    }
}

export default connect(mapStateToProps, null)(component) 