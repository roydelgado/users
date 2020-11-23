import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      displayErrors: null,
      status: null
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(json => {
      this.setState({
        users: json,
        displayErrors: false
      })
    });
  }

  render() {
    const compareValues = (a,b) => {
      let {users} = this.state;

      let username = users.map(element => {
        for (var i in users) {
          let uname = (users[i].username);
          let pin = (users[i].address.zipcode).slice(0, 5);
          if (a === uname && b === pin){
            this.setState.status = true;
          }
        }
       });
       return this.setState.status;
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      if (!event.target.checkValidity()) {
        this.setState({ displayErrors: true });
        return;
      }
      this.setState({ displayErrors: false });


      let uname = document.getElementById("uname");
      let pwd = document.getElementById("password");
      let form = document.querySelector("form");

      let value = compareValues(uname.value, pwd.value);


       //If entered username and password matches fetched data display success or not
        if(value) {
          form.innerHTML = `<h1>There was a match:Success!</h1>`;
        }
        else {
          form.innerHTML = `<h1>There was no match</h1>`;
        }
      };

    const { displayErrors } = this.state;
    return (
      <form noValidate onSubmit={handleSubmit} className={displayErrors ? 'displayErrors' : ''}>
        <p><label className="name"><b>Username:</b></label></p>
        <input type="text" pattern="[A-Za-z]*" name="uname" id="uname" required/>
        <p><label><b>Password:</b></label></p>
        <input type="number" name="pwd" id="password" required minLength='5' maxLength='5'/>
        <p><button id="submit">Submit</button></p>
      </form>
    );
  }
}

export default App;
