// Dependencies
import { Route, Switch } from "react-router-dom";

// Components
import VidContainer from "./components/Videoswrap";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Final from "./components/Final";

function App() {
    return (
        <div className="allaround-wrapper">
            <Navbar />
            <Switch>
                <Route path="/" exact>
                    <VidContainer />
                    <Final />
                </Route>
                <Route path="/about">
                    <About />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
