import "./App.css";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import { getUserAuth } from "./actions";
import { connect } from "react-redux";
import { useEffect } from "react";
function App(props) {
  useEffect(() => {
    props.getUserAuth();
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <>
                <Header />
                <Home />
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { user: state.userState.user };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserAuth: () => dispatch(getUserAuth()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
