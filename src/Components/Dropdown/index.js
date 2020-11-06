import React, { Component } from 'react';
import {connect} from "react-redux"

import "./Dropdown.scss";

class Dropdown extends Component {
    
    state={
        show:false
    }
    constructor(props) {
        super(props);

        this.wrapperRef = React.createRef();
    }
    theme = true

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    
    handleClickOutside=(event)=> {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            if(this.state.show)
                this.setState({show:!this.state.show})
        }
    }

    handleClickInside=(e)=>{
        this.props.setCountinent(e)
        this.setState({
            show : false
        })
    }

    generateList=()=>{
        const list = ["Africa","Americas","Asia","Europe","Oceania"]
        return list.map((e,i)=>(<li key={i}  onClick={()=>this.handleClickInside(e)}>{e}</li>))
    }

    render=()=> (
        <div 
        className={this.props.darkMode?"cDropdown darkElement":"cDropdown lightElement"}
        ref={this.wrapperRef}>
            <div className={"head"}
            onClick={()=>this.setState({show:!this.state.show})}
            >
                {this.props.default!=="" ? this.props.default : "Filter by Region"}
                <i 
                className="fa fa-angle-down" 
                aria-hidden="true">
                </i>
            </div>
            <ul className={this.state.show?"cVisible":""}>
                {this.generateList()}
            </ul>
        </div>
        )
}

const  mapStateToProps = (state, ownProps) => {
    console.log(state)
    return {...state,...ownProps}
    
}


export default connect(mapStateToProps,null)(Dropdown)