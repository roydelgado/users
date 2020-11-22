import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(json => {
      this.setState({
        users: json
      })
    });
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let uname = document.getElementById("uname");
    let pwd = document.getElementById("password");
    let {users} = this.state;

     console.log(uname.value);
     console.log(pwd.value);
     let data = JSON.stringify(users);

     let name = data.search(uname);
     let zipcode = data.search(pwd);
     console.log(typeof(data));

      if(name && zipcode) {
        console.log(uname.value);
        console.log("matched");
        console.log(pwd.value);
      }//build condition to match fetched object
      else {
        console.log("not matched");
      }
    };

  render() {
    return (
      <form>
        <p><label className="name"><b>Username:</b></label></p>
        <input type="text" name="uname" id="uname" required/>
        <p><label><b>Password:</b></label></p>
        <input type="number" name="pwd" id="password" required minLength='5' maxLength='5'/>
        <p><button id="submit" onClick={this.handleSubmit}>Submit</button></p>
      </form>
    );
  }
}

export default App;
