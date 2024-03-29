import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { ParagraphSmall, ParagraphXSmall } from "../../components/typography";
import ChevronDownIcon from "../../icons/ChevronDown";
import SitePopover from "./SitePopover";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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
  margin-bottom: 0.5rem;
  width: 100%;
  &:hover ${IconWrapper} {
    opacity: 1;
  }
`;

const StyledSite = styled.div`
  padding: 1rem;
  transition: 0.085s all ease-in;
  border-radius: ${(props) => props.theme.borders.radius200};
  background-color: ${(props) => props.theme.colors.backgroundSecondary};
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const Header = styled.div``;

const Stats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.5rem;
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledParagraphXSmall = styled(ParagraphXSmall)`
  color: ${(props) => props.theme.colors.contentSecondary};
`;

const Caption = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 0.25rem;
  margin-right: 0.25rem;
`;

function SiteGrid(props) {
  const {
    siteId,
    name,
    domain,
    uniqueVisits,
    pageViews,
    bounceRate,
    addSite,
    destroySite,
    caption,
    onClick,
    refetch,
  } = props;
  const [isVisible, setIsVisible] = React.useState(false);

  function onDoubleClick() {
    setIsVisible(true);
  }

  return (
    <Wrapper>
      <Container>
        {caption && <Caption>{caption}</Caption>}
        <StyledSite onClick={onClick}>
          <Header>
            <ParagraphSmall>{domain}</ParagraphSmall>
          </Header>
          <Stats>
            <Stat>
              <StyledParagraphXSmall>Unique visits</StyledParagraphXSmall>
              <ParagraphXSmall>{uniqueVisits}</ParagraphXSmall>
            </Stat>
            <Stat>
              <StyledParagraphXSmall>Page views</StyledParagraphXSmall>
              <ParagraphXSmall>{pageViews}</ParagraphXSmall>
            </Stat>
            <Stat>
              <StyledParagraphXSmall>Bounce rate</StyledParagraphXSmall>
              <ParagraphXSmall>{bounceRate}%</ParagraphXSmall>
            </Stat>
          </Stats>
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
      <ParagraphSmall onDoubleClick={onDoubleClick}>{name}</ParagraphSmall>
    </Wrapper>
  );
}

SiteGrid.propTypes = {
  siteId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  domain: PropTypes.string.isRequired,
  uniqueVisits: PropTypes.number.isRequired,
  pageViews: PropTypes.number.isRequired,
  bounceRate: PropTypes.number.isRequired,
  addSite: PropTypes.func.isRequired,
  destroySite: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  caption: PropTypes.element,
  refetch: PropTypes.func.isRequired,
};

export default SiteGrid;
