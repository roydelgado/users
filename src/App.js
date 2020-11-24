import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      displayErrors: null,
      status: false
    }
  };

  render() {
    const compareValues = (a,b) => {
      let {users} = this.state;

      let username = this.state.users.map(element => {
        for (var i in users) {
          let uname = (users[i].username);
          let pin = (users[i].address.zipcode).slice(0, 5);
          if (a === uname && b === pin){
            this.setState({ status: true });
          }
        }
       });
       return this.state.status;
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      if (!event.target.checkValidity()) {
        this.setState({ displayErrors: true });
        return;
      }
      this.setState({ displayErrors: false });

    const fetchData = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      const data = await response.json();
      this.setState({ users: data });
      return this.state.users;
    }

      let uname = document.getElementById("uname");
      let pwd = document.getElementById("password");
      let form = document.querySelector("form");

    const compare = fetchData().then(value => {
        this.setState({ status: compareValues(uname.value, pwd.value)});
        const status = this.state.status;

    //If entered username and password matches fetched data display success or not
        if(status) {
          form.innerHTML = `<h1>There was a match:Success!</h1>`;
        }
        else {
          form.innerHTML = `<h1>There was no match</h1>`;
        }
        return this.state.status;
      });

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
