import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails";
import formFields from "./formFields";


class SurveyForm extends Component {
    renderField(){
        return(
            formFields.map((field)=>{
                return <Field key={field.name} type="text" label={field.label} name={field.name} component={SurveyField}/>
            })
        )
    }

    render() {
        return (
            <div>
                <form onSubmit={ this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderField()}
                    <Link to="/surveys" className="waves-effect waves-light red left btn">
                        Cancel
                        <i className="material-icons right">cancel</i>
                    </Link>
                    <button type="submit" className="waves-effect waves-light right btn">
                        Next 
                        <i className="material-icons right">arrow_forward</i>
                    </button>
                </form>
            </div>
        )

    }
}

function validate(values){
    // validate user inputs
    // reference: https://redux-form.com/8.3.0/examples/syncvalidation/
    // if return empty object, redux form will assumes that entire form is valid
    const errors = {};
    
    formFields.forEach((element) => {
      if (!values[element.name]){
        errors[element.name] = element.noValueError
      }
    });
    
    if (values.recipients){
        errors.recipients = validateEmails(values.recipients);
    }
    return errors;
  
}

// connect the component to redux storage with reduxForm
export default reduxForm({
    validate: validate, // <--- validation function given to redux-form
    form: 'surveyForm',  // a unique identifier for this form
    destroyOnUnmount: false  // keep user input values within survey related components
})(SurveyForm);