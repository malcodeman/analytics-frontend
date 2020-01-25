import React from "react";
import styled from "styled-components";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { Button } from "../../components/button";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton
} from "../../components/modal";
import { HeadingSmall } from "../../components/typography";

import queries from "../../api/queries";
import mutations from "../../api/mutations";

import AddSiteForm from "./AddSiteForm";

function Sites() {
  const [selected, setSelected] = React.useState([0]);
  const [isOpen, setIsOpen] = React.useState(false);
  const { loading, error, data } = useQuery(queries.FIND_MY_SITES_QUERY);
  const [destroySite, destroySiteResult] = useMutation(mutations.DESTROY_SITE);

  return (
    <div>
      <HeadingSmall>Sites</HeadingSmall>
      <Button onClick={() => setIsOpen(true)}>New site</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalHeader>Add a new site</ModalHeader>
        <ModalBody>
          <AddSiteForm onSuccess={() => setIsOpen(false)} />
        </ModalBody>
      </Modal>
    </div>
  );
}

export default Sites;
