import "./App.css";

//react router
import { BrowserRouter as Router, Route } from "react-router-dom";

//*components
import Navbar from "./components/Navbar";
import Table from "./components/Table";
import ButtonRequest from "./components/ButtonRequest";
import NewRequest from "./components/NewRequest";

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Route exact path='/'>
          <Table />
          <ButtonRequest/>
        </Route>
        <Route path='/newRequest' >
        <NewRequest />
        </Route>
      </Router>
    </div>
  );
}

export default App;
