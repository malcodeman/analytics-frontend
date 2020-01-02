import React from "react";
import styled from "styled-components";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  HeaderNavigation,
  NavigationList,
  NavigationItem,
  ButtonGroup,
  ThemeProvider,
  DarkTheme
} from "malcomponents";

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
      <ThemeProvider theme={DarkTheme}>
        <HeaderNavigation>
          <NavigationList />
          <NavigationList align="center">
            <NavigationItem>
              <ButtonGroup
                selected={selected}
                onClick={(event, index) => {
                  setSelected([index]);
                }}
              >
                <Button>Private</Button>
                <Button>Public</Button>
              </ButtonGroup>
            </NavigationItem>
          </NavigationList>
          <NavigationList align="right">
            <NavigationItem>
              <Button onClick={() => setIsOpen(true)}>New site</Button>
            </NavigationItem>
          </NavigationList>
        </HeaderNavigation>
      </ThemeProvider>
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
