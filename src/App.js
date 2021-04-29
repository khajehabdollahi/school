
import './App.css'
import Navb from './TopNav';
import About from './About';
import Footer from './Footer';
import Login from './Login';
import Search from './Search';
import Register from './Register';
import SchoolForm from './SchoolForm';
import ForgetPassword from './ForgetPassword';

import { BrowserRouter as Router, Switch,Route } from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
        <Navb />
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/about" component={About}/>
          <Route path="/logIn" component={Login}/>
          <Route path="/register" component={Register}/> 
          <Route path="/schoolform" component={SchoolForm}/> 
          <Route path="/search" component={Search}/> 
          <Route path="/resetyourpassword" component={ForgetPassword}/> 
          
        </Switch> 
         <Footer />
      </div>
      </Router>
  );
}
const Home = () => (
  <div>
    <h1>Here is the homePage</h1>
    </div>
)

export default App;
