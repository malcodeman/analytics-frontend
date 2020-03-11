import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Popover } from "../../components/popover";
import CopyIcon from "../../icons/Copy";
import TrashIcon from "../../icons/Trash";
import { ParagraphSmall } from "../../components/typography";

const Overlay = styled.div`
  display: flex;
  flex-direction: column;
  width: 260px;
  z-index: 1;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  border-radius: ${props => props.theme.borders.radius200};
  background-color: ${props => props.theme.colors.backgroundTertiary};
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

function SitePopover(props) {
  function overlay() {
    return (
      <Overlay>
        <Menu>
          <MenuItem>
            <CopyIcon />
            <StyledParagraphSmall>Duplicate site</StyledParagraphSmall>
          </MenuItem>
          <MenuItem>
            <TrashIcon />
            <StyledParagraphSmall>Delete site</StyledParagraphSmall>
          </MenuItem>
        </Menu>
      </Overlay>
    );
  }

  return (
    <Popover placement="bottom" overlay={overlay}>
      {props.children}
    </Popover>
  );
}

SitePopover.propTypes = {
  children: PropTypes.element
};

export default SitePopover;
