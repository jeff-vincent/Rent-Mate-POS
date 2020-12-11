import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Box, Button } from "@material-ui/core";
import { addBusinessInfo } from "../../../actions/businessInfoActions"
import OutlinedButton from "../../../sharedComponents/components/OutlinedButton";
import { connect } from "react-redux";

const BackAndNextButtons = ({ currPage, handleNextClick, addBusinessInfo }) => {
  const location = useLocation();
  const history = useHistory();
  const [page, setPage] = React.useState();

  React.useEffect(() => {
    const pageNum = location.pathname.split("/")[2];
    setPage(pageNum);
  }, []);

  

  const handleNext = () => {
    handleNextClick();
    // if (page == 1) {
    //   // Submit basic info form
    //   addBusinessInfo();

    // } else if (page == 2) {
    //   // Submit social auth info
  
    // }
    history.push(`/onboarding/${+page + 1}`);
  };

  const handleBack = () => {
    history.push(`/onboarding/${+page - 1}`);
  };

  return (
    <Box>
      {page === "1" ? (
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={handleNext}
          >
            Next &#8594;
          </Button>
        </Box>
      ) : (
        <Box display="flex" justifyContent="space-between">
          <OutlinedButton onClick={handleBack}>Back</OutlinedButton>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={handleNext}
          >
            Next &#8594;
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default BackAndNextButtons;
