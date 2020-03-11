import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

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
  color: ${props => props.theme.colors.primary};
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
  border-radius: ${props => props.theme.borders.radius200};
  background-color: ${props => props.theme.colors.backgroundSecondary};
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
  color: ${props => props.theme.colors.contentSecondary};
`;

function SiteGrid(props) {
  const { siteId, name, domain, uniqueVisits, pageViews, bounceRate } = props;

  return (
    <Wrapper>
      <Container>
        <Link to={`/${siteId}`}>
          <StyledSite>
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
        </Link>
        <SitePopover>
          <IconWrapper>
            <ChevronDownIcon size={12} />
          </IconWrapper>
        </SitePopover>
      </Container>
      <ParagraphSmall>{name}</ParagraphSmall>
    </Wrapper>
  );
}

SiteGrid.propTypes = {
  siteId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  domain: PropTypes.string.isRequired,
  uniqueVisits: PropTypes.number.isRequired,
  pageViews: PropTypes.number.isRequired,
  bounceRate: PropTypes.number.isRequired
};

export default SiteGrid;
