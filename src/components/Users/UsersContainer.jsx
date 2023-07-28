import { connect } from "react-redux";
import Users from "./Users";
import React from "react";
import {
  follow,
  setCurrentPage,
  unfollow,
  setIsFollowing,
  getUsers,
  FollowT,
  UnfollowT
} from "../../redux/users-reducer";
import style from "./users.module.css";
import Loader from "../../common/loader/loader";
import { compose } from "redux";
import { getCurrentPage, getFollowingProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsersSelector } from "../../redux/users-selectors";

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  }

  onPageChange = (pageNumber) => {
    this.props.setCurrentPage(pageNumber);
    this.props.getUsers(pageNumber, this.props.pageSize);
  };

  render() {
    let pageCount = Math.ceil(this.props.totalCount / this.props.pageSize);
    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
      pages.push(i);
    }

    let slicedPages;
    let curPage = this.props.currentPage;
    if (curPage - 3 < 0) {
      slicedPages = pages.slice(0, 5);
    } else {
      slicedPages = pages.slice(curPage - 3, curPage + 2);
    }

    return (
      <>
        {this.props.isFetching ? <Loader className={style.loader} /> : null}
        <Users
          slicedPages={slicedPages}
          onPageChange={this.onPageChange}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
          users={this.props.users}
          currentPage={this.props.currentPage}
          followingProgress={this.props.followingProgress}
          FollowT={this.props.FollowT}
          UnfollowT={this.props.UnfollowT}

        />
      </>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    users: getUsersSelector(state),
    pageSize: getPageSize(state),
    totalCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingProgress: getFollowingProgress(state)
  };
};

export default compose(
  connect(mapStateToProps, {
    follow,
    unfollow,
    setCurrentPage,
    setIsFollowing,
    getUsers,
    FollowT,
    UnfollowT
  })
) (UsersContainer)

