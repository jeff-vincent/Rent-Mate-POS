import React from "react";
import { connect } from "react-redux";
import BudgetPage from "../pages/BudgetPage";
import { updateBudgetInfo } from "../../../actions/formInfoActions";
import { updateCampaign } from "../../../actions/campaignActions";

const BudgetContainer = ({ campaigns, socialsToPost, updateBudgetInfo }) => {
  console.log(socialsToPost);

  const submitBudget = (budgetInfo) => {
    updateBudgetInfo(budgetInfo);
    let formData = new FormData();
    formData.append("budget", budgetInfo.amount);
    formData.append("objective", budgetInfo.objective);
    // Get campaign Id from state

    let campaignId = campaigns.current.id;
    // Save Targeting options to Campaign_Info
    updateCampaign(formData, campaignId);
  };

  return (
    <BudgetPage
      socialsToPost={socialsToPost}
      handleSubmitBudget={submitBudget}
    />
  );
};

const mapStateToProps = (state) => ({
  campaigns: state.campaigns,
  socialsToPost: state.newAdInfo.socialsToPost,
});

export default connect(mapStateToProps, { updateBudgetInfo })(BudgetContainer);
