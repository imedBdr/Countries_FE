import React from 'react';
import { mount } from "enzyme";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import Card from "./index";


// add click test later
describe('Card Test', () =>{
    
    const initialState = {darkMode:false}
    const mockStore = configureStore()
    const props ={"darkMode" :false , "name" :"Algeria", "flag":"none", "population":40000000, "region":"Africa", "capital":"Algers"}
    let store,container


    beforeEach(()=>{
        store = mockStore(initialState)
        container = mount(
        <Provider store={store}>
            <BrowserRouter>
                <Card {...props} />
            </BrowserRouter>
        </Provider>  )  
    })
    
    it("Test of card component with given props ",()=>{
        const name = container.find("h3").at(0).text()
        const flag = container.find("img").at(0).prop('src')
        const population = container.find("p").at(0).text()
        const region = container.find("p").at(1).text()
        const capital = container.find("p").at(2).text()
        const link = container.find("a").at(0).prop("href")
        expect(name).toEqual(props.name)
        expect(flag).toEqual(props.flag)
        expect(population).toEqual(`Population: ${props.population}`)
        expect(region).toEqual(`Region: ${props.region}`)
        expect(capital).toEqual(`Capital: ${props.capital}`)
        expect(link).toEqual(`/country/${name}`)
    })


    it("Test of card items",()=>{
        const pElements = container.find('p').length
        const aElement = container.find("a").length
        const hElement = container.find("h3").length
        const imgElement = container.find("img").length
        expect(pElements).toBe(3)
        expect(aElement).toBe(1)
        expect(hElement).toBe(1)
        expect(imgElement).toBe(1)
    })
})