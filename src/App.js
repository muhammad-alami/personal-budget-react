import './App.scss';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Menu from './Menu/Menu';
import HomePage from './HomePage/HomePage';
import AboutPage from './AboutPage/AboutPage';
import LoginPage from './LoginPage/LoginPage';
import Hero from './Hero/Hero';
import Footer from './Footer/Footer';

function App() {
  return (
    <Router>
      <Menu />
      <Hero />

      <div className="mainContainer">
        <Switch>
          <Route path="/about" component={AboutPage} />
          <Route path="/login" component={LoginPage} />
          <Route exact path="/" component={HomePage} />
        </Switch>
      </div>

      <Footer />
    </Router>
  );
}

export default App;
