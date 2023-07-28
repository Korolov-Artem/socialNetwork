import React from "react";
import s from "./ProfileInfo.module.css";
import Loader from "../../../common/loader/loader";
import ProfileStatusWithHooks from "../Status/ProfileStatusWithHooks";


const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Loader />;
  }

  return (
    <div>
      <div className={s.descriptionBlock}>
        <div>
          <img src={props.profile.photos.large} />
          <ProfileStatusWithHooks updateStatus={props.updateStatus } status={props.status}/>
        </div>
        <p>{props.profile.fullName}</p>
        <p>{props.profile.aboutMe}</p>
        <p>{props.profile.lookingForAJob}</p>
        <p>{props.profile.lookingForAJobDescription}</p>
        <div>
          <p>{props.profile.contacts.twitter}</p>
          <p>{props.profile.contacts.facebook}</p>
          <p>{props.profile.contacts.instagram}</p>
          <p>{props.profile.contacts.email}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
