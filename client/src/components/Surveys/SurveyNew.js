import React, { Component } from "react";
import { reduxForm } from "redux-form";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";

// SurveyNew shows SurveyForms and SurveyFormReview components
class SurveyNew extends Component {
    state = { showFormReview: false };

    renderContent(){
        // toggle between survey form and survey form review component
        if (this.state.showFormReview){
            return <SurveyFormReview onCancel={()=> this.setState({showFormReview: false}) }
            />
        }
        return (
        <SurveyForm onSurveySubmit={ ()=> this.setState({showFormReview: true})} 
        />
        );
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        )
    }
}
// clear the form when user navigate away from SurveyNew components
export default reduxForm({
    form: 'surveyForm'
})(SurveyNew);