import React from "react";
import { Navigate } from "react-router-dom";

export const AuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render () {
            if(this.props.isAuth === false) return <Navigate to={'/login'}/>
            return <Component {...this.props} />
        }
    }
    return RedirectComponent
}

