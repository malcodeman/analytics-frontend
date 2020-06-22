import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { ParagraphSmall } from "../../components/typography";
import ChevronDownIcon from "../../icons/ChevronDown";
import SitePopover from "./SitePopover";

const IconWrapper = styled.div`
  opacity: 0;
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  margin-right: 0.25rem;
  margin-bottom: 0.25rem;
  transition: 0.085s all ease-in;
  cursor: pointer;
  color: ${(props) => props.theme.colors.primary};
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const Container = styled.div`
  position: relative;
  &:hover ${IconWrapper} {
    opacity: 1;
  }
`;

const StyledSite = styled.div`
  padding: 1rem;
  transition: 0.085s all ease-in;
  height: 100%;
  display: flex;
  align-items: center;
  border-radius: ${(props) => props.theme.borders.radius200};
  background-color: ${(props) => props.theme.colors.backgroundSecondary};
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const Caption = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 0.25rem;
  margin-right: 0.25rem;
`;

function SiteList(props) {
  const {
    siteId,
    name,
    domain,
    addSite,
    destroySite,
    caption,
    onClick,
    refetch,
  } = props;
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <Container>
      {caption && <Caption>{caption}</Caption>}
      <StyledSite onClick={onClick}>
        <ParagraphSmall>{name}</ParagraphSmall>
      </StyledSite>
      <SitePopover
        name={name}
        domain={domain}
        addSite={addSite}
        destroySite={destroySite}
        siteId={siteId}
        refetch={refetch}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      >
        <IconWrapper onClick={() => setIsVisible(true)}>
          <ChevronDownIcon size={12} />
        </IconWrapper>
      </SitePopover>
    </Container>
  );
}

SiteList.propTypes = {
  siteId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  domain: PropTypes.string.isRequired,
  addSite: PropTypes.func.isRequired,
  destroySite: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  caption: PropTypes.element,
  refetch: PropTypes.func.isRequired,
};

export default SiteList;
