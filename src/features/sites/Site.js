import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { ParagraphSmall, ParagraphXSmall } from "../../components/typography";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledSite = styled.div`
  width: 100%;
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-radius: ${props => props.theme.borders.radius200};
  background-color: ${props => props.theme.colors.backgroundSecondary};
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

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

const Header = styled.div``;

function Site(props) {
  const { name, domain, uniqueVisits, pageViews, bounceRate } = props;

  return (
    <Wrapper>
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
      <ParagraphSmall>{name}</ParagraphSmall>
    </Wrapper>
  );
}

Site.propTypes = {
  name: PropTypes.string.isRequired,
  domain: PropTypes.string.isRequired,
  uniqueVisits: PropTypes.number.isRequired,
  pageViews: PropTypes.number.isRequired,
  bounceRate: PropTypes.number.isRequired
};

export default Site;
