import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      displayErrors: false,
      status: false,
      uname: "",
      password: "",
      matchMessage: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.compareValues = this.compareValues.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  hasMatch = (a, b) => {
    let { users } = this.state;

    let username = this.state.users.map((element) => {
      for (var i in users) {
        let uname = users[i].username;
        let pin = users[i].address.zipcode.slice(0, 5);
        if (a === uname && b === pin) {
         return true;
        }
      }
    });
    return false
  };
  handleInputChange = (event) => {
    const value = event.target.value;
    this.setState({
      [event.target.name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (!event.target.checkValidity()) {
      this.setState({
        displayErrors: true,
      });
      return;
    }
    this.setState({
      displayErrors: false,
    });

    const fetchData = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      this.setState({
        users: data,
      });
      return this.state.users;
    };

    fetchData().then((value) => {
      
        const hasMatch = this.hasMatch(this.state.uname, this.state.password),
     
        this.setState({
          matchMessage: hasMatch ? "There was a match:Success!" : "There was no match"
        });
    });
  };

  render() {
    const { displayErrors, matchMessage } = this.state;

    return (
      <form
        noValidate
        onSubmit={this.handleSubmit}
        className={displayErrors ? "displayErrors" : ""}
      >
        <p>
          <label className="name">
            <b>Username:</b>
          </label>
        </p>
        <input
          type="text"
          onChange={this.handleInputChange}
          pattern="[A-Za-z]*"
          name="uname"
          id="uname"
          required
          minLength="1"
        />
        <p>
          <label>
            <b>Password:</b>
          </label>
        </p>
        <input
          type="password"
          onChange={this.handleInputChange}
          name="password"
          id="password"
          required
          minLength="1"
          maxLength="5"
        />
        <p>
          <button id="submit">Submit</button>
        </p>
        {matchMessage ? <h1>matchMessage</h1> : ""}
      </form>
    );
  }
}

export default App;
