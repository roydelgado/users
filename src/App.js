import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      displayErrors: false,
      status: false,
      uname: "",
      password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.compareValues = this.compareValues.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  };

  compareValues = (a,b) => {
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
  handleInputChange = (event) => {
    const value = event.target.value;
    this.setState({ [event.target.name]: value })
    // console.log(this.state.uname);
    // console.log(this.state.password);
  };

  handleSubmit = (event) => {
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

    // let uname = document.getElementById("uname");
    // let pwd = document.getElementById("password");
    let form = document.querySelector("form");

  const compare = fetchData().then(value => {
      this.setState({ status: this.compareValues(this.state.uname, this.state.password)});
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

  render() {
      const { displayErrors } = this.state;
    return (

      <form noValidate onSubmit={this.handleSubmit} className={displayErrors ? 'displayErrors' : ''}>
        <p>
          <label className="name">
            <b>Username:</b>
          </label>
        </p>
        <input type="text" onChange={this.handleInputChange} pattern="[A-Za-z]*" name="uname" id="uname" required minLength='1' />
          <p>
            <label>
              <b>Password:</b>
            </label>
          </p>
        <input type="password" onChange={this.handleInputChange} name="password" id="password" required minLength='1' maxLength='5'/>
          <p>
            <button id="submit">Submit</button>
          </p>
      </form>
    );
  }
}

export default App;
