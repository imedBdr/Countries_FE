import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
import { MockedProvider } from '@apollo/client/testing';
import renderer from "react-test-renderer";
import { gql }  from '@apollo/client';
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

  const GET_CRY_QUERY = gql`
    query RootQuerry($name: String) {
      country(name:$name){
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

  const GqlMock = [
    {
      request: { query: GET_CRY_QUERY },
      variables: {
        name: 'Algeria',
      },
      result: {
        "data": {
          "country": {
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
        }
      }
      },
  ];

  const emptyGqlMock = [
    {
      request: { query: GET_CRY_QUERY },
      variables: {
        name: 'Algeria',
      },
      result: {
        "data": {
          "country": {
            "name": "",
            "flag": "",
            "nativeName": "",
            "subregion": "",
            "population": "",
            "region": "",
            "capital": "",
            "topLevelDomain": [],
            "languages": [],
            "currencies": [],
            "borders": []
          }
        }
      }
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



describe("Test Country component " , ()=>{

  it("test of country comonent with given props",  async() =>{
    store = mockStore(initialState)
    container = renderer.create(
      <MockedProvider mocks={GqlMock} addTypename={false}>
        <Provider store ={store}>
                    <BrowserRouter>
                        <Country { ...props}></Country>
                    </BrowserRouter>
                </Provider>
      </MockedProvider>,
    );
    await new Promise(resolve => setTimeout(resolve, 0));

    const nativeName = container.root.findAllByType("li")[0].children[1]
    const population = container.root.findAllByType("li")[1].children[1]
    const region = container.root.findAllByType("li")[2].children[1]
    const subregion = container.root.findAllByType("li")[3].children[1]
    const capital = container.root.findAllByType("li")[4].children[1]
    const topLevelDomain = container.root.findAllByType("li")[5].children[1]
    const currencies = container.root.findAllByType("li")[6].children[1]
    const languages = container.root.findAllByType("li")[7].children[1]
    
    expect(nativeName).toBe(result.nativeName)
    expect(population).toBe(result.population)
    expect(region).toBe(result.region)
    expect(subregion).toBe(result.subregion)
    expect(capital).toBe(result.capital)
    expect(topLevelDomain).toBe(result.topLevelDomain.map(e=>e).join(", "))
    expect(currencies).toBe(result.currencies.map(e=>(e.code)).join(", "))
    expect(languages).toBe(result.languages.map(e=>e.name).join(", "))
  })

  it("test of country comonent with given props",  async() =>{
  store = mockStore(initialState)
  container = renderer.create(
    <MockedProvider mocks={emptyGqlMock} addTypename={false}>
      <Provider store ={store}>
                  <BrowserRouter>
                      <Country { ...props}></Country>
                  </BrowserRouter>
              </Provider>
    </MockedProvider>,
  );
  await new Promise(resolve => setTimeout(resolve, 0));

  const nativeName = container.root.findAllByType("li")[0].children[1]
  const population = container.root.findAllByType("li")[1].children[1]
  const region = container.root.findAllByType("li")[2].children[1]
  const subregion = container.root.findAllByType("li")[3].children[1]
  const capital = container.root.findAllByType("li")[4].children[1]
  const topLevelDomain = container.root.findAllByType("li")[5].children[1]
  const currencies = container.root.findAllByType("li")[6].children[1]
  const languages = container.root.findAllByType("li")[7].children[1]
  
  expect(nativeName).toBe("")
  expect(population).toBe("")
  expect(region).toBe("")
  expect(subregion).toBe("")
  expect(capital).toBe("")
  expect(topLevelDomain).toBe("")
  expect(currencies).toBe("")
  expect(languages).toBe("")
})

})
