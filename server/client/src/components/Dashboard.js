import React from "react";
import { Link } from "react-router-dom";
import SurveyList from "./Surveys/SurveyList"

const Dashboard = () =>{
    // materialzecss add icon ref: https://materializecss.com/icons.html
    return(
    <div>
      <SurveyList />
      <div className="fixed-action-btn">
        <Link to="/surveys/new" className="btn-floating btn-large red">
        <i className="large material-icons">add</i>
        </Link>
      </div>
    </div>
    );
}

export default Dashboard;