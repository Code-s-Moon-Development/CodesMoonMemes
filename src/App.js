// Dependencies
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";

// Components
import Navbar from "./components/Navbar";
import Upload from "./components/upload/Upload";
import Feed from "./components/feed/Feed";
import About from "./components/about/About";

const MainWrap = styled.main`
    padding: 0 2rem;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    max-width: 1950px;
`;

function App() {
    return (
        <MainWrap>
            <Navbar />
            <Switch>
                <Route path="/" exact>
                    <Upload />
                    <Feed />
                </Route>
                <Route path="/about">
                    <About />
                </Route>
            </Switch>
        </MainWrap>
    );
}

export default App;
