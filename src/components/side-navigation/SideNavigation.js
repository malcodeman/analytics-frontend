import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Navigation = styled.nav`
  color: ${props => props.theme.colors.contentPrimary};
  ${props => props.theme.typography.font300}
`;

const List = styled.ul`
  list-style-type: none;
  padding-left: 0;
  margin: 0;
`;

const ListItem = styled.li`
  padding: 0.75rem 0.75rem 0.75rem 1.5rem;
  border-left: 4px solid
    ${props =>
      props.active ? props.theme.colors.primary : "transparent"};
  background-color: ${props =>
    props.active
      ? props.theme.colors.backgroundInversePrimary
      : "transparent"};
  background-image: linear-gradient(
    0deg,
    ${props => `${props.theme.colors.backgroundPrimary}E5`},
    ${props => `${props.theme.colors.backgroundPrimary}E5`}
  );
`;

const Link = styled.a`
  color: inherit;
  text-decoration: none;
`;

function SideNavigation(props) {
  const { items, activeItemId, onChange } = props;

  function onClick(event, item) {
    onChange({ event, item });
  }

  if (!items.length) {
    return null;
  }

  return (
    <Navigation {...props}>
      <List>
        {items.map(item => {
          return (
            <Link href={item.itemId} key={item.itemId}>
              <ListItem
                active={activeItemId === item.itemId}
                onClick={event => onClick(event, item)}
              >
                {item.title}
              </ListItem>
            </Link>
          );
        })}
      </List>
    </Navigation>
  );
}

SideNavigation.propTypes = {
  items: PropTypes.array,
  activeItemId: PropTypes.string
};

SideNavigation.defaultProps = {
  items: [],
  activeItemId: "/"
};

export default SideNavigation;
