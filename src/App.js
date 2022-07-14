import './App.css';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import axios from 'axios';
import React from 'react';

function App() {
  function reducer(state = new Array(), action) {
    switch(action.type) {
      case "load": 
        {
          return action.data
        }
      default:
        console.log("default")
    }
  }
  const [response, dispatch] = React.useReducer(reducer, [])

  function ConnectServer() {
    axios.post("http://localhost:4000/users/authenticate", { "username": "test", "password": "test" })
    .then(res => (dispatch({type: "load", data: {firstName: res.data.firstName, lastName: res.data.lastName, username: res.data.username}}), console.log(res.data.firstName)))
  }

  function GetToken() {
    let username = "username";
    let password = "password";
    return Buffer.from(`${username}:${password}`).toString("base64")
  }

  function GetRequest() {
    axios.get("http://localhost:4000/users/GETpage", {headers: { "Authorization":`Basic ${()=>GetToken()}` } })
    .then(res => console.log(res.data))
  }

  function DisplayResponse() {
    return response.username != null ? (
      <React.Fragment>
        <div>Name: {response.firstName}</div>
        <div>Last Name: {response.lastName}</div>
        <div>Username: {response.username}</div>
      </React.Fragment>
    ) : <div></div>
  }

  return (
    <div className="App">
      <PostForm />
      {/* <PostList />
      <div className='Box' onClick={()=>ConnectServer()}>Authorisation</div>
      <div className='Box' onClick={()=>GetRequest()}>Get Function</div>
      {DisplayResponse()} */}
    </div>
  );
}

export default App;
