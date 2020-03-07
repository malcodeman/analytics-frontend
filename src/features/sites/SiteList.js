import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { ParagraphSmall } from "../../components/typography";

const StyledLink = styled(Link)`
  width: 100%;
`;

const StyledSite = styled.div`
  padding: 1rem;
  border-radius: ${props => props.theme.borders.radius200};
  background-color: ${props => props.theme.colors.backgroundSecondary};
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

function SiteList(props) {
  const { siteId, name } = props;

  return (
    <StyledLink to={`/${siteId}`}>
      <StyledSite>
        <ParagraphSmall>{name}</ParagraphSmall>
      </StyledSite>
    </StyledLink>
  );
}

SiteList.propTypes = {
  siteId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default SiteList;
