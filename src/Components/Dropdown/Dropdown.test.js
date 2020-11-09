import React from "react";
import {Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { mount, shallow } from "enzyme";
import Dropdown from "./index";


describe("Testing Dropdown component ", ()=>{
    

    const initialState ={darkMode:false}
    const mockStore = configureStore()
    let store , container
    const props ={default :"" , setCountinent : ()=>{console.log("function pressed")}}
    
    
    beforeEach(()=>{
        store = mockStore(initialState)
         container = mount(
            <Provider store={store}>
                <Dropdown {...props}></Dropdown>
            </Provider>
        )
    })

    it("testing parts ",()=>{
        const isDarkMode = container.find('.cDropdown').hasClass("darkElement")
        const li =container.find('li').length
    
        expect(li).toBe(5)
        expect(isDarkMode).toBe(false)
    })

    it("Testing showing and hiding via clicks" ,()=>{
        const hidden = container.find("ul").hasClass("cVisible")
        expect(hidden).toBe(false)
        
        container.find(".head").at(0).simulate("click")
        const visible = container.find("ul").hasClass("cVisible")
        expect(visible).toBe(true)

        container.find("li").at(0).simulate('click');
        const hidden1 = container.find("ul").hasClass("cVisible")
        expect(hidden1).toBe(false)
    })
})