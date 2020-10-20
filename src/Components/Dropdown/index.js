import React, { Component } from 'react';

export default class Dropdown extends Component {
    
    state={
        show:false
    }
    constructor(props) {
        super(props);

        this.wrapperRef = React.createRef();
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            this.setState({show:!this.state.show})
        }
    }

    generateList=()=>{
        const list = ["Afreca","America","Asia","Europe","Oceania"]
        return list.map((e,i)=>(<li key={i} onClick={()=>this.props.setCountinent(e)}>{e}</li>))
    }

    render=()=> (
        <div 
        className={"cDropdown"}
        ref={this.wrapperRef}>
            <div className={"head"}>
                filter by Region
                <i 
                className="fa fa-angle-down" 
                aria-hidden="true">
                </i>
            </div>
            <ul>
                {this.generateList()}
            </ul>
        </div>
        )
}