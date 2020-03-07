import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Input } from "../../components/input";
import GridIcon from "../../icons/Grid";
import ListIcon from "../../icons/List";
import { VIEWS } from "./constants";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 0.5rem;
  align-items: center;
`;

const IconWrapper = styled.div`
  display: flex;
  cursor: pointer;
  border-radius: 50%;
  padding: 0.5rem;
  color: ${props => props.theme.colors.contentPrimary};
  background-color: ${props =>
    props.selected ? props.theme.colors.backgroundSecondary : "transparent"};
`;

function Sidebar(props) {
  const { search, setSearch, view, setView } = props;

  return (
    <Wrapper>
      <Input
        placeholder="Find a site"
        value={search}
        onChange={e => setSearch(e.currentTarget.value)}
      />

      <IconWrapper
        selected={view === VIEWS.grid}
        onClick={() => setView(VIEWS.grid)}
      >
        <GridIcon />
      </IconWrapper>
      <IconWrapper
        selected={view === VIEWS.list}
        onClick={() => setView(VIEWS.list)}
      >
        <ListIcon />
      </IconWrapper>
    </Wrapper>
  );
}

Sidebar.propTypes = {
  search: PropTypes.string,
  setSearch: PropTypes.func,
  view: PropTypes.oneOf([VIEWS.grid, VIEWS.list]),
  setView: PropTypes.func.isRequired
};

export default Sidebar;
