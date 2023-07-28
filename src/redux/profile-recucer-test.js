import React from "react";
import profileReducer from "./profile-reducer";
import { addPost } from "./profile-reducer";

it('new post should be added', () => {
    let action = addPost('Hi');
    let state = {
        posts: [
          { id: 1, message: "Hi, how are you?", likesCount: 12 },
          { id: 2, message: "It's my first post", likesCount: 11 },
        ]
      };
      

    let newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(5)
})