import React from "react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { mount } from "enzyme";
import Header from "./index";

const initialState = { darkMode : false }
const mockStore = configureStore()

describe("Testing Head component", ()=>{

    let store , container
    beforeEach(()=>{
        store = mockStore(initialState)
        container = mount(
            <Provider store={store}>
                <Header></Header>
            </Provider>
        )
    })

    it("Testing initial look ",()=>{
        const initDark = container.find(".cHeader").hasClass("lightElement")
        expect(initDark).toBe(true)

        const hash3 = container.exists("h3")
        expect(hash3).toBe(true)

        const hasButton = container.exists("button")
        expect(hasButton).toBe(true)

    })

    it("Simulating click", ()=>{
        container.find("button").simulate('click');

        const actions = store.getActions()
        const expectedPayload = { type: 'TOOGLE_MODE' }
        expect(actions).toEqual([expectedPayload])
    })
})