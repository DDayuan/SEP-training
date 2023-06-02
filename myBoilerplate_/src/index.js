import React, { Component } from "react";
import ReactDOM from "react-dom";
import Home from "./Home/Home";
import "./style.scss";
console.log("app")
class App extends Component {
	render() {
		//return React.createElement("h1", null, "Hello ", this.props.name);
		//return <h1>hello</h1>;
		return <Home className="heading"/>;
	}
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
//root.render(React.createElement(App, { name: "nicole" }));