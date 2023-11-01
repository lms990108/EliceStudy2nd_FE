import "./App.css";
import Header from "./components/common/Header"
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <Header />
        <Switch>
          <Route exact path="/">
            {/* <Home/> */}
          </Route>
          
          <Route path="/signup">


          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App;
