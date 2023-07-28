import React from "react";
import styles from "./users.module.css";
import userPhoto from "../../assets/images/user.png";
import { NavLink } from "react-router-dom";

const Users = (props) => {
  return (
    <div className={styles.users}>
      {props.users.map((u) => (
        <div key={u.id} className={styles.user}>
          <span>
            <div>
              <NavLink to={"/profile/" + u.id}>
                <img
                  src={u.photos.small != null ? u.photos.small : userPhoto}
                  className={styles.userPhoto}
                />
              </NavLink>
            </div>
            <div>
              {u.followed ? (
                <button disabled={props.followingProgress.some(id => id === u.id)}
                onClick={() => {props.UnfollowT(u.id)}}> Unfollow</button>
              ) : (
                <button disabled={props.followingProgress.some(id => id === u.id)}
                  onClick={() => {props.FollowT(u.id)}}>Follow</button>
              )}
            </div>
          </span>
          <span>
            <span>
              <div>{u.name}</div>
              <div>{u.status}</div>
            </span>
            <span>
              <div>{"u.location.country"}</div>
              <div>{"u.location.city"}</div>
            </span>
          </span>
        </div>
      ))}
      <div className={styles.pageCount}>
        {props.slicedPages.map((page) => {
          return (
            <button
              className={
                props.currentPage === page ? styles.selectedPage : styles.page
              }
              onClick={(event) => {
                props.onPageChange(page);
              }}
            >
              {page}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Users;
