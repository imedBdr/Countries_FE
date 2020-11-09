import React from "react";
import  configureStore  from "redux-mock-store";
import { Provider } from "react-redux";
import { mount } from "enzyme";
import Input from "./index";

const initialState = { darkMode : false }
const mockStore = configureStore()
let store , container
let props ={ 
    cValue:"" ,
    handleSearch: (text)=>{return text}
}
describe("Testing Input component ", ()=>{

    beforeEach(()=>{
        store = mockStore(initialState)
        container = mount(
            <Provider store={store}>
                <Input {...props}></Input>
            </Provider>
        )
    })

    it("Simulate writing", ()=>{
        const input = container.find('input').at(0)
        container.setProps({ cValue: 'Hello', handleSearch: (text)=>{return text} });
    })

})