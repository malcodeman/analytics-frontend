import React from "react";
import PropTypes from "prop-types";

import { Modal, ModalHeader, ModalBody } from "../../components/modal";
import AddSiteForm from "./AddSiteForm";
import VerifySiteForm from "./VerifySiteForm";
import VerifySiteSuccess from "./VerifySiteSuccess";

function AddSiteModal(props) {
  const {
    isOpen,
    onClose,
    refetch,
    current,
    site,
    setCurrent,
    setSite
  } = props;

  function onAddSiteFormSuccess(data) {
    setSite(data);
    setCurrent(1);
    refetch();
  }

  function onVerifySiteFormSuccess() {
    setCurrent(2);
    refetch();
  }

  function renderHeader() {
    switch (current) {
      case 0:
        return "Add a new site";
      case 1:
        return `${site.name} embed code`;
      case 2:
        return "Hooray";
      default:
        return "";
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>{renderHeader()}</ModalHeader>
      <ModalBody>
        {current === 0 && <AddSiteForm onSuccess={onAddSiteFormSuccess} />}
        {current === 1 && (
          <VerifySiteForm
            siteId={site.siteId}
            onSuccess={onVerifySiteFormSuccess}
          />
        )}
        {current === 2 && <VerifySiteSuccess siteId={site.siteId} />}
      </ModalBody>
    </Modal>
  );
}

AddSiteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
  current: PropTypes.number.isRequired,
  site: PropTypes.object.isRequired,
  setCurrent: PropTypes.func.isRequired,
  setSite: PropTypes.func.isRequired
};

export default AddSiteModal;
