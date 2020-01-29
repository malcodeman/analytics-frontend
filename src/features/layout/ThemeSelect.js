import React from "react";
import { useQuery } from "@apollo/react-hooks";

import constants from "../../constants";
import queries from "../../api/queries";

function ThemeSelect() {
  const findTheme = useQuery(queries.FIND_THEME);
  const theme = findTheme.data && findTheme.data.theme;

  return theme === constants.THEMES.DARK ? <span>☀️</span> : <span>🌑</span>;
}

export default ThemeSelect;
