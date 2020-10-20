const TOOGLE_MODE = () =>( { type : "TOOGLE_MODE" } );


const HandleDarkReducer = ( state = false , action ) =>{
    switch(action){
        case TOOGLE_MODE.type :
            return ! state;
        default : 
            break; 
    }
}

export {TOOGLE_MODE, HandleDarkReducer};