import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { ParagraphSmall, ParagraphMedium } from "../../components/typography";

const StyledTile = styled.div`
  cursor: pointer;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${props => props.image});
  border-radius: ${props => props.theme.borders.radius200};
  background-color: ${props => props.theme.colors.backgroundSecondary};
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const Backdrop = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  height: 100%;
  padding: 1rem;
`;

const StyledParagraphSmall = styled(ParagraphSmall)`
  margin-bottom: 0.5rem;
`;

function ImageTile(props) {
  const { label, value, image } = props;

  return (
    <StyledTile image={image}>
      <Backdrop>
        <StyledParagraphSmall>{label}</StyledParagraphSmall>
        <ParagraphMedium>{value}</ParagraphMedium>
      </Backdrop>
    </StyledTile>
  );
}

ImageTile.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  image: PropTypes.string.isRequired
};

export default ImageTile;
