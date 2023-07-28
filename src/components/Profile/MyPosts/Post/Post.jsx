import React from 'react';
import s from './Post.module.css';
import user from '../../../../assets/images/user.png'

const Post = (props) => {
  return (
    <div className={s.item}>
      <img src={user} />
        { props.message }
          <div>
        <span>like</span> { props.likesCount }
      </div>
    </div>
  )
}

export default Post;