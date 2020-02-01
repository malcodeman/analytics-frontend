import React from "react";
import PropTypes from "prop-types";

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

function VerifySiteCode(props) {
  const { isOpen, onClose, name, siteId } = props;
  const code = `<script defer src="${constants.ANALYTICS_SCRIPT_SOURCE}" siteId="${siteId}" graphqlUri="${constants.GRAPHQL_URI}"></script>`;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>{name} embed code</ModalHeader>
      <ModalBody>
        To start securely tracking data, please add this code to the bottom of
        your website.
        <FormControl label="Site ID">
          <Input value={siteId} />
        </FormControl>
        <FormControl label="HTML embed code">
          <Textarea value={code} />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <ModalButton onClick={onClose}>
          <span>Close</span>
        </ModalButton>
        <ModalButton>
          <span>Verify site code</span>
        </ModalButton>
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
