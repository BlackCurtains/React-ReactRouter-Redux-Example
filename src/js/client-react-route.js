// Before using router
// npm install -S react-router// npm install -S history@1

import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from "react-router";

// Main layout
import Layout from "./pages/Layout";
import Archives from "./pages/Archives";
import Archive from "./pages/Archive";
import Featured from "./pages/Featured";
import Settings from "./pages/Settings";

const app = document.getElementById('app');

//ReactDOM.render(<Layout/>, app);

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={Layout}>
            <IndexRoute component={Featured}></IndexRoute>
            <Route path="archives" name="archives" component={Archives} ></Route>
            <Route path="settings" name="settings" component={Settings} ></Route>
            <Route path="*" component={Featured}/>
        </Route>
    </Router>,
    app);


