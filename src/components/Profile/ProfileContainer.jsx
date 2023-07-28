import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import {
  setUser,
  setUserProfile,
  updateUser,
  getStatus,
  updateStatus
} from "../../redux/profile-reducer";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { setIsFetching } from "../../redux/users-reducer";
import { compose } from "redux";
import { useEffect } from "react";

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();

    useEffect(() => {
      if (!props.isAuth) {
        navigate("/login");
      }
    }, [props.isAuth, navigate]);

    return (
      <Component {...props} router={{ location, navigate, params }} />
    );
  }
  return ComponentWithRouterProp;
}

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.router.params.userId;
    this.props.setUser(userId);
    this.props.getStatus(userId)
  }

  componentDidUpdate(prevProps) {
    let prevUserId = prevProps.router.params.userId;
    let userId = this.props.router.params.userId;
    if(!userId && this.props.isAuth) {
      userId = this.props.authorizedUserId
    }
    this.props.updateUser(prevUserId, userId);
  }

  render() {
    return (
      <div>
        <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus}/>
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  isAuth: state.auth.isAuth,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
  isAuth : state.auth.isAuth
});

export default compose (
  connect(mapStateToProps, {
    setUserProfile,
    setIsFetching,
    setUser,
    updateUser,
    getStatus,
    updateStatus
  }),
  withRouter,
) (ProfileContainer)
