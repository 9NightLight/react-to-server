import './App.css';
import PostList from './components/PostList';
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
    .then(res => (dispatch({type: "load", data: {firstName: res.data.firstName, lastName: res.data.lastName, username: res.data.username}})))
    .then(console.log(response.firstName))
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
      <PostList />
      <div className='Box' onClick={()=>ConnectServer()}>Authorisation</div>
      {DisplayResponse()}
    </div>
  );
}

export default App;
