const TOOGLE_MODE = () =>( { type : "TOOGLE_MODE" } );

const HandleDarkReducer = ( state = {"darkMode":false} , action ) =>{
    console.log(state)
    switch(action.type){
        case "TOOGLE_MODE":
            return {"darkMode":!state.darkMode};
        default : 
            return state;
    }
}

export {TOOGLE_MODE, HandleDarkReducer};