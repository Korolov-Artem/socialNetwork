import Header from "./Header";
import React from "react";
import { connect } from "react-redux";
import { setUserData, logout } from "../../redux/auth-reducer";
import { setIsFetching } from "../../redux/auth-reducer";

class HeaderContainer extends React.Component {

  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
});

export default connect(mapStateToProps, {
  setUserData,
  setIsFetching,
  logout
})(HeaderContainer);
