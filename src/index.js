import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from "react-redux";
import { store, persistor} from "./Redux/Store";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Header from './Components/Header';
import Home from './Components/Home';
import Country from "./Components/Country";
import * as serviceWorker from './serviceWorker';


const client = new ApolloClient({
  uri: 'https://graphql-test-country1.herokuapp.com/graphql',
  cache: new InMemoryCache()
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Header/>
          <Router>
            <Switch>
              <Route exact path={"/"}>
                  <Home/>
              </Route>
              <Route path={"/country/:name"}>
                <Country/>
              </Route>
            </Switch>
          </Router>
        </PersistGate>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
