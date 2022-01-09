import React from "react";

// contains logic to render a single lable and text input
export default (props) => {
    // props: automatically gain acceess to props provided by redux-form and other custom props
    // ref: https://redux-form.com/8.2.2/docs/api/field.md/#props

  return (
      <div>
          <label>{props.label}</label>
          <input {...props.input} />
          <div className="red-text" style={ {marginBottom: '20px'} }>
          { props.meta.touched && props.meta.error }
          </div> 
          
      </div>
  )
};