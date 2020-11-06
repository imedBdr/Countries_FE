import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
import { MockedProvider } from '@apollo/client/testing';
import renderer from "react-test-renderer";
//import wait from "waait";
import gql  from "graphql-tag";
import Country from "./index";


const result = {
    "name": "Algeria",
    "flag": "https://restcountries.eu/data/dza.svg",
    "nativeName": "الجزائر",
    "subregion": "Northern Africa",
    "population": "40400000",
    "region": "Africa",
    "capital": "Algiers",
    "topLevelDomain": [
      ".dz"
    ],
    "languages": [
      {
        "name": "Arabic"
      }
    ],
    "currencies": [
      {
        "code": "DZD"
      }
    ],
    "borders": [
      "Tunisia",
      "Libya",
      "Niger",
      "Western Sahara",
      "Mauritania",
      "Mali",
      "Morocco"
    ]
  }

  const GET_CAT_QUERY = gql`{
      country(name:"Algeria"){
        name
        flag
        nativeName
        subregion
        population
        region
        capital
        topLevelDomain
        languages{
            name
        }
        currencies{
            code
        }
        borders
    }
}`

  const mocks = [
    {
      request: { query: GET_CAT_QUERY },
      result: {
        data: {
          cat: {
            __typename: 'Cat',
            id: '123',
            name: 'Cat 123',
          },
        },
      },
    },
  ];

const initialState = {darkMode:false}

const mockStore = configureStore()
let store,container
store = mockStore(initialState)
const props =
    {   "darkMode" :false ,
     "match" :{ "params"    :   { "name" : "Algeria"    }   } 
    }


/*
describe("Test Country component " , ()=>{

    beforeEach(()=>{
        
        store = mockStore(initialState)
        container = mount(<MockedProvider mocks={mocks}>
                <Provider store ={store}>
                    <BrowserRouter>
                        <Country { ...props}></Country>
                    </BrowserRouter>
                </Provider>
            </MockedProvider>
        ) 
    })

    it("test of country comonent with given props", ()=>{

        /*
        const nativeName = container.find(".info1 ul li").at(0).text()
        const population = container.find(".info1 ul li").at(1).text()
        const region = container.find(".info1 ul li").at(2).text()
        const subregion =container.find(".info1 ul li").at(3).text()
        const capital = container.find(".info1 ul li").at(4).text()
        const topLevelDomain = container.find(".info2 ul li").at(0).text()
        const currencies = container.find(".info2 ul li").at(1).text()
        const languages = container.find(".info2 ul li").at(2).text()
        const borders = container.find()// *ù/
                setTimeout(()=>{
                    const name = container.find("h2")
                    console.log(name)
                    const flag = container.find(".flag img").prop("src")
            expect(name).toBe(result.name)
            //expect(flag).toBe(result.flag)
        },2000)
    })
})

*/


it('renders without error', () => {
    renderer.create(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Provider store ={store}>
                    <BrowserRouter>
                        <Country { ...props}></Country>
                    </BrowserRouter>
                </Provider>
      </MockedProvider>,
    );
  });