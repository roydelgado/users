import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      displayErrors: null
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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (event) => {
      event.preventDefault();
    if (!event.target.checkValidity()) {
      this.setState({ displayErrors: true });
      return;
    }
    this.setState({ displayErrors: false });


    let uname = document.getElementById("uname");
    let pwd = document.getElementById("password");
    let form = document.querySelector("form");
    let {users} = this.state;
    console.log(users);
     let data = JSON.stringify(users);

     console.log("Uname is" + uname.value);
     let name = data.includes(uname.value);
     let zipcode = data.includes(pwd.value);

     //If entered username and password matches fetched data display success or not
      if(name && zipcode && !null) {
        form.innerHTML = `<h1>There was a match:Success!</h1>`;
        console.log("matched");
      }
      else {
        form.innerHTML = `<h1>There was no match</h1>`;
        console.log("not matched");
      }
    };

  render() {
    const { displayErrors } = this.state;
    return (
      <form noValidate onSubmit={this.handleSubmit} className={displayErrors ? 'displayErrors' : ''}>
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
