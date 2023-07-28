import React from "react";
import styles from "./FormsControl.module.css";

const FormControl = ({ input, meta, ...props }) => {

    const hasError = meta.touched && meta.error

  return (
    <div className={ hasError && styles.formControl + " " + styles.error}>
      <div>
        {props.children}
      </div>
      <div>
        {hasError && <span>{meta.error}</span>} 
      </div>
    </div>
  );
};

export const Textarea = (props) => {
    const { input, meta, ...restProps } = props
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}

export const Input = (props) => {
    const { input, meta, ...restProps } = props
    return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
}
