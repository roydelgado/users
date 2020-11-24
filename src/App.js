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

  compareValues = (a, b) => {
    let { users } = this.state;

    let username = this.state.users.map((element) => {
      for (var i in users) {
        let uname = users[i].username;
        let pin = users[i].address.zipcode.slice(0, 5);
        if (a === uname && b === pin) {
          this.setState({
            status: true,
          });
        }
      }
    });
    return this.state.status;
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

    const compare = fetchData().then((value) => {
      this.setState({
        status: this.compareValues(this.state.uname, this.state.password),
      });
      const status = this.state.status;

      //If entered username and password matches fetched data display success or not
      if (status) {
        this.setState({
          matchMessage: "There was a match:Success!",
        });
      } else {
        this.setState({
          matchMessage: "There was no match",
        });
      }
      return this.state.matchMessage;
    });
  };

  render() {
    const { displayErrors } = this.state;
    const match = this.state.status;
    const matchMessage = this.state.matchMessage;
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
        <h1>{matchMessage ? matchMessage : ""}</h1>
      </form>
    );
  }
}

export default App;
