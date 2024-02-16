import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard.jsx";
import QuestionSelection from "./components/QuestionSelection.jsx";
import Analytics from "./components/Analytics.jsx";
import { Chart, registerables } from 'chart.js';
import GenericForm from "./components/GenericForm.jsx";
function App() {
    Chart.register(...registerables);
    return (
        <Router>
            <Routes>
                <Route path="/"  element={<Home />} />
                <Route path="/dashboard"  element={<Dashboard />} />
                <Route path="/temp" element={<QuestionSelection/>}></Route>
                <Route path="/analytics" element={<Analytics/>}></Route>
                <Route path="/form/:subject" element={<GenericForm/>}></Route>
            </Routes>
        </Router>
    );
}

export default App;
