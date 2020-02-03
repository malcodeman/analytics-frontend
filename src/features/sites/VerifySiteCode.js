import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton
} from "../../components/modal";
import { FormControl } from "../../components/form-control";
import { Input } from "../../components/input";
import { Textarea } from "../../components/textarea";
import constants from "../../constants";
import queries from "../../api/queries";
import { Notification, KIND } from "../../components/notification";

const StyledTextarea = styled(Textarea)`
  height: 128px;
`;

function VerifySiteCode(props) {
  const { isOpen, onClose, name, siteId } = props;
  const code = `<script defer src="${constants.ANALYTICS_SCRIPT_SOURCE}" siteId="${siteId}" graphqlUri="${constants.GRAPHQL_URI}"></script>`;
  const { loading, error, data, refetch } = useQuery(
    queries.FIND_DASHBOARD_QUERY,
    {
      skip: !siteId,
      variables: { siteId }
    }
  );
  const [isVerified, setIsVerified] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    if (data && data.findDashboard && data.findDashboard.pageViews) {
      setIsVerified(true);
    }
  }, [data]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>{isVerified ? null : `${name} embed code`}</ModalHeader>
      <ModalBody>
        {isVerified ? (
          <Notification kind={KIND.positive}>
            <span>The tracker is installed</span>
          </Notification>
        ) : (
          <>
            {error && error.message}
            To start securely tracking data, please add this code to the head of
            your website.
            <FormControl label="Site ID">
              <Input value={siteId} />
            </FormControl>
            <FormControl label="HTML embed code">
              <StyledTextarea value={code} />
            </FormControl>
          </>
        )}
      </ModalBody>
      <ModalFooter>
        <ModalButton onClick={onClose}>
          <span>Close</span>
        </ModalButton>
        {isVerified ? (
          <ModalButton onClick={() => history.push(`/?siteId=${siteId}`)}>
            <span>Go to dashboard</span>
          </ModalButton>
        ) : (
          <ModalButton isLoading={loading} onClick={() => refetch()}>
            <span>Verify site code</span>
          </ModalButton>
        )}
      </ModalFooter>
    </Modal>
  );
}

VerifySiteCode.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  siteId: PropTypes.string.isRequired
};

export default VerifySiteCode;
