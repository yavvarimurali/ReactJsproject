import React from 'react';
import { BrowserRouter as Router, Route, Navigate } from 'react-router-dom';
import Login from './components/LoginPage';
import Dashboard from './components/DashboardPage';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);

  function handleLogin(username, password) {
    if (username === 'admin' && password === 'password') {
      setLoggedIn(true);
    }
  }

  return (
    <Router>
      <div>
        <Route exact path="/">
          {loggedIn ? <Navigate to="/dashboard" /> : <Login handleLogin={handleLogin} />}
        </Route>
        <Route path="/dashboard">
          {loggedIn ? <Dashboard /> : <Navigate to="/" />}
        </Route>
      </div>
    </Router>
  );
}

export default App;
