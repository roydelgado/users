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

  hasMatch = (data) => {
    let { uname, password } = this.state;

    // iterate over data (array)
    return data.find((userObj) => userObj.username === uname && userObj.address.zipcode.split("-")[0] ===  password;
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
      
      return data;
    };

    fetchData().then((data) => {
      
        const hasMatch = this.hasMatch(data),
     
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
