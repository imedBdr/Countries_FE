import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MockedProvider } from "@apollo/client/testing";
import renderer from "react-test-renderer";
import { gql }  from '@apollo/client';
import Home from "./index";

const GET_CRIES_QUERY = gql`
query RootQuerry{
  countries{
    name
    population
    region
    capital
    flag
  }
}`



const mocks = [
    {
      request: { query: GET_CRIES_QUERY },
      variables: {
        name: 'Algeria',
      },
      result: {
        "data": {
          "countries": []
        }
      }
      },
  ];

describe("Test home component", ()=>{
    it("Test mounting successfuly", ()=>{
        const initialState = {darkMode:false}
        const mockStore = configureStore()
        let store,container
        store = mockStore(initialState)

        container = renderer.create(
            <MockedProvider mocks={mocks} addTypename={false}>
                <Provider store={store}>
                    <Home></Home>
                </Provider>
            </MockedProvider>
        )
    })
} )