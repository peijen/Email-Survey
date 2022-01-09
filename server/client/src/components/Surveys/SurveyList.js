import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSurveys } from "../../actions";

class SurveyList extends Component {
  
  componentDidMount(){
      //every time this component is rendered, called fetchSurveys action creator
      this.props.fetchSurveys();
  }

  rednerSurveys(){
      return this.props.surveys.reverse().map(survey =>{
        return (<div class="card waves-light red lighten-5" key={ survey._id }>
          <div class="card-content dark-text">
            <span class="card-title">{survey.title}</span>
            <p>
              {survey.body}
            </p>
            <p className="right">
                Sent On: {new Date(survey.dateSent).toLocaleDateString()}
            </p>
          </div>
          <div class="card-action">
          <a >Yes: {survey.yes}</a>
          <a >No: {survey.no}</a>
        </div>
        </div>
        )
      });
  }

  render(){
      return (
          <div>
              {this.rednerSurveys()}
          </div>
      )
  } 
}

function mapStateToProps(state) {
    return { surveys: state.surveys }
}
// connect survey list component with redux
export default connect(mapStateToProps, {fetchSurveys})(SurveyList);