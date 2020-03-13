import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { Notification, KIND } from "../../components/notification";
import { Button } from "../../components/button";

const StyledNotification = styled(Notification)`
  margin-bottom: 0.5rem;
`;

function VerifySiteSuccess(props) {
  const { siteId } = props;
  const history = useHistory();

  return (
    <>
      <StyledNotification kind={KIND.positive}>
        <span>The tracker is installed</span>
      </StyledNotification>
      <Button onClick={() => history.push(`/${siteId}`)}>
        <span>Go to dashboard</span>
      </Button>
    </>
  );
}

VerifySiteSuccess.propTypes = {
  siteId: PropTypes.string.isRequired
};

export default VerifySiteSuccess;
