import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { ParagraphMedium, ParagraphSmall } from "../../components/typography";

const StyledTile = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  text-align: center;
  border-radius: ${props => props.theme.borders.radius200};
  background-color: ${props => props.theme.colors.backgroundSecondary};
`;

const StyledParagraphSmall = styled(ParagraphSmall)`
  margin-bottom: 0.5rem;
`;

function Tile(props) {
  const { label, value } = props;

  return (
    <StyledTile>
      <StyledParagraphSmall>{label}</StyledParagraphSmall>
      <ParagraphMedium>{value}</ParagraphMedium>
    </StyledTile>
  );
}

Tile.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default Tile;
