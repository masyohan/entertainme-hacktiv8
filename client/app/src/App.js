import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import client from './config/graphql';
import { Home, Movies, TvSeries } from './pages';
import { Navbar } from "./components";


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar/>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/movies">
            <Movies/>
          </Route>
          <Route exact path="/tvseries">
            <TvSeries/>
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
