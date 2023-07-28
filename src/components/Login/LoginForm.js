import React from "react";
import { Field } from "redux-form";
import { Input } from "../../common/FormsControl/FormsControl";
import { required } from "../../utilities/validators/validators";
import styles from '../../common/FormsControl/FormsControl.module.css' 

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field validate={[required]} placeholder={"Email"} name={'email'} component={Input}></Field>
      </div>
      <div>
        <Field validate={[required]} placeholder={"Password"} name={'password'} type={"password"} component={Input}></Field>
      </div>
      <div>
        <Field type={"checkbox"} name={'rememberMe'} component={Input}></Field> Remember me
      </div>
      <div className={styles.formSummaryError}>
        {props.error}
      </div>
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

export default LoginForm;
