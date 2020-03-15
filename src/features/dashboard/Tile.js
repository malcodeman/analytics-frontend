import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { ParagraphMedium, ParagraphSmall } from "../../components/typography";
import { Spinner } from "../../components/spinner";

const StyledTile = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  text-align: center;
  border-radius: ${props => props.theme.borders.radius200};
  background-color: ${props => props.theme.colors.backgroundSecondary};
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledParagraphSmall = styled(ParagraphSmall)`
  margin-bottom: 0.5rem;
`;

function Tile(props) {
  const { label, value, isLoading } = props;

  return (
    <StyledTile>
      <StyledParagraphSmall>{label}</StyledParagraphSmall>
      {isLoading ? (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      ) : (
        <ParagraphMedium>{value}</ParagraphMedium>
      )}
    </StyledTile>
  );
}

Tile.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isLoading: PropTypes.bool
};

Tile.defaultProps = {
  isLoading: false
};

export default Tile;
