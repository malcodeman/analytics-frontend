import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";

import { Button } from "../../components/button";
import { FormControl } from "../../components/form-control";
import { Input } from "../../components/input";
import { Textarea } from "../../components/textarea";
import constants from "../../constants";
import queries from "../../api/queries";

const StyledTextarea = styled(Textarea)`
  height: 128px;
  margin-bottom: 0.5rem;
`;

function VerifySiteForm(props) {
  const { siteId } = props;
  const code = `<script defer src="${constants.ANALYTICS_SCRIPT_SOURCE}" siteId="${siteId}" graphqlUri="${constants.GRAPHQL_URI}"></script>`;
  const { loading, error, data, refetch } = useQuery(
    queries.FIND_DASHBOARD_QUERY,
    {
      skip: !siteId,
      variables: { siteId },
      notifyOnNetworkStatusChange: true
    }
  );

  React.useEffect(() => {
    if (data && data.findDashboard && data.findDashboard.pageViews) {
      props.onSuccess && props.onSuccess(data.findDashboard);
    }
  }, [data]);

  return (
    <>
      {error && error.message}
      <FormControl label="Site ID">
        <Input value={siteId} />
      </FormControl>
      <FormControl label="HTML embed code">
        <StyledTextarea value={code} />
      </FormControl>
      <Button onClick={() => refetch()}>
        <span>{loading ? "Verifying" : "Verify site code"}</span>
      </Button>
    </>
  );
}

VerifySiteForm.propTypes = {
  siteId: PropTypes.string.isRequired,
  onSuccess: PropTypes.func
};

export default VerifySiteForm;
