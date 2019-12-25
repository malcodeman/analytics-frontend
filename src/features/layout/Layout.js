import React from "react";
import styled from "styled-components";
import { useHistory, useLocation } from "react-router-dom";
import { SideNavigation, ThemeProvider, DarkTheme } from "malcomponents";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 146px 1fr;
  min-height: 100vh;
`;

const SideNavigationWrapper = styled.div`
  height: 100%;
  background-color: ${DarkTheme.colors.backgroundPrimary};
`;

function Layout(props) {
  const { children } = props;
  const history = useHistory();
  const location = useLocation();

  return (
    <Grid>
      <SideNavigationWrapper>
        <ThemeProvider theme={DarkTheme}>
          <SideNavigation
            activeItemId={location.pathname}
            items={[
              {
                itemId: "/",
                title: "Dashboard"
              },
              {
                itemId: "/sites",
                title: "Sites"
              },
              {
                itemId: "/billing",
                title: "Billing"
              },
              {
                itemId: "/account",
                title: "Account"
              }
            ]}
            onChange={({ event, item }) => {
              event.preventDefault(), history.push(item.itemId);
            }}
          />
        </ThemeProvider>
      </SideNavigationWrapper>
      {children}
    </Grid>
  );
}

export default Layout;
