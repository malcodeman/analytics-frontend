import React from "react";
import styled from "styled-components";
import { useApolloClient, useQuery } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";

import { Popover } from "../../components/popover";
import UserIcon from "../../icons/User";
import LogOutIcon from "../../icons/LogOut";
import { ParagraphSmall } from "../../components/typography";
import { Switch } from "../../components/switch";
import queries from "../../api/queries";
import constants from "../../constants";

const Overlay = styled.div`
  display: flex;
  flex-direction: column;
  width: 240px;
  z-index: 1;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  border-radius: ${props => props.theme.borders.radius200};
  background-color: ${props => props.theme.colors.backgroundTertiary};
`;

const IconWrapper = styled.div`
  cursor: pointer;
  color: ${props => props.theme.colors.primary};
`;

const Menu = styled.ul`
  list-style-type: none;
  margin: 0;
  padding-left: 0;
  padding: 0.25rem 1rem;
`;

const MenuItem = styled.li`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  cursor: pointer;
  color: ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.borders.radius200};
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const StyledParagraphSmall = styled(ParagraphSmall)`
  margin-left: 0.5rem;
`;

function UserPopover(props) {
  const client = useApolloClient();
  const history = useHistory();
  const { data } = useQuery(queries.FIND_THEME);

  function handleLogOut() {
    localStorage.removeItem("token");
    client.writeData({ data: { isLoggedIn: false } });
    history.push("/");
  }

  function toggleTheme() {
    const theme =
      data.theme === constants.THEMES.DARK
        ? constants.THEMES.LIGHT
        : constants.THEMES.DARK;

    localStorage.setItem("theme", theme);
    client.writeData({ data: { theme } });
  }

  function overlay() {
    return (
      <Overlay>
        <Menu>
          <MenuItem onClick={toggleTheme}>
            <Switch
              state={data.theme === constants.THEMES.DARK ? true : false}
            />
            <StyledParagraphSmall>Dark theme</StyledParagraphSmall>
          </MenuItem>
          <MenuItem onClick={handleLogOut}>
            <LogOutIcon />
            <StyledParagraphSmall>Log out</StyledParagraphSmall>
          </MenuItem>
        </Menu>
      </Overlay>
    );
  }

  return (
    <Popover {...props} placement="bottom-end" overlay={overlay}>
      <IconWrapper>
        <UserIcon />
      </IconWrapper>
    </Popover>
  );
}

export default UserPopover;
