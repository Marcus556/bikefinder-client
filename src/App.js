import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import logo from './img/bikefinderlogo.png'
import AdList from './components/AdList';
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import NavBar from './components/NavBar'
import AddAd from './components/AddAd'
import OwnedAds from './components/OwnedAds'
import ShowSingleAd from './components/ShowSingleAd'
import TestAdList from './components/TestAdList'
import AllMessages from './components/AllMessages'
import SendMessage from './components/SendMessage'

function App() {
  return (
    <Router>
      <div className="App">

        <header className="App-header">
          <NavBar></NavBar>
        </header>
        <div>
          <Route exact path="/">
            <AdList logo={logo} apiUrl='http://localhost:5000/api/ads'></AdList>
          </Route>
          <Switch>
            <Route exact path="/add">
              <AddAd logo={logo}></AddAd>
            </Route>
            <Route exact path="/yourads">
              <AdList logo={logo} apiUrl='http://localhost:5000/api/ads/owned'></AdList>
            </Route>
            <Route exact path="/singlead">
              <ShowSingleAd logo={logo}></ShowSingleAd>
            </Route>
            <Route exact path="/singlead/:userid">
              <ShowSingleAd logo={logo}></ShowSingleAd>
            </Route>
            <Route exact path="/login">
              <LoginForm logo={logo}></LoginForm>
            </Route>
            <Route exact path="/register">
              <RegisterForm logo={logo}></RegisterForm>
            </Route>
            <Route exact path="/messages">
              <AllMessages logo={logo} apiUrl='http://localhost:5000/users/messages'></AllMessages>
            </Route>
            <Route exact path="/sendmessage">
              <SendMessage logo={logo}></SendMessage>
            </Route>
          </Switch>

        </div>

      </div>
    </Router>
  );
}

export default App;
