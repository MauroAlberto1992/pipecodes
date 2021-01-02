//import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./store";
import Question from "./components/Question";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/questions" component={Question} />
                </Switch>
            </Router>
        </Provider>

    );
}

export default App;
