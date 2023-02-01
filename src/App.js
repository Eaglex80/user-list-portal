import "./App.css";

import { Route, Switch } from "react-router-dom";

import HomeScreen from "./screens/HomeScreen";
import Edit from "./screens/Edit";
import Create from "./screens/Create";

import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./screens/components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomeScreen} />
        <Route exact path="/create" component={Create} />
        <Route exact path="/edit/:id" component={Edit} />
      </Switch>
    </>
  );
}

export default App;
