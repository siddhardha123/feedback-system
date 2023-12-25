import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard.jsx";
import Layout from "./components/Layout.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/"  element={<Home />} />
                <Route path="/dashboard"  element={<Dashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
