import React from "react";
import { connect } from "react-redux";
import formFields from "./formFields";
import * as actions from "../../actions";
import { withRouter } from "react-router-dom";

const SurveyFormReview = (props) => {
  
  // get user entries
  const reviewField = formFields.map( field =>{
      return(
          <div key={field.name}>
              <label>{field.label}</label>
              <div>{props.formValues[field.name]}</div>
          </div>
      )
  })
  return (
      <div>
          <h5>Please confirm your entries</h5>
          {reviewField}
          <button type="button" onClick={props.onCancel} className="waves-effect waves-light yellow darken-3 left btn">
            Back
            <i className="material-icons left">arrow_back</i>
          </button>
          <button type="submit" onClick={() => props.submitSurvey(props.formValues, props.history)} className="btn waves-effect waves-light right">
            Send Survey
            <i className="material-icons right">send</i>
          </button>
      </div>
  )
};

function mapStateToProps(state){
    // pass formValues objects to props
    return ({ formValues: state.form.surveyForm.values })
};

// Connects SurveyFormReview component to the redux store.
// use withRouter to get access to the history object for redirecting users after they submit the survey
export default connect(mapStateToProps,actions)(withRouter(SurveyFormReview));