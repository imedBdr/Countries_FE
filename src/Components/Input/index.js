import React from "react";

const Input = () =>(
    <div className={"cInput"}>
        <i 
            class="fa fa-search" 
            aria-hidden="true">
        </i>
        <input 
            type={"text"}
            placeholder={"Search for a country..."}
            onKeyUp={this.handleKeyUp}
            >
        </input>
    </div>
);

export default Input;
