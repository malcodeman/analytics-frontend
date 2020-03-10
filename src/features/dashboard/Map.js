import React from "react";
import styled, { useTheme } from "styled-components";
import MapGL, { Marker } from "react-map-gl";
import { useQuery } from "@apollo/react-hooks";

import CITIES from "./data/CITIES.json";
import MapPinIcon from "../../icons/MapPin.js";
import { MAP_STYLES } from "./constants";
import constants from "../../constants";
import queries from "../../api/queries";

const StyledMap = styled(MapGL)`
  &.mapboxgl-map {
    border-radius: ${props => props.theme.borders.radius200};
  }
`;

function Map() {
  const TOKEN = process.env.MAPBOX_ACCESS_TOKEN;
  const theme = useTheme();
  const findTheme = useQuery(queries.FIND_THEME);
  const mapStyle =
    findTheme.data && findTheme.data.theme === constants.THEMES.DARK
      ? MAP_STYLES.dark
      : MAP_STYLES.light;
  const [viewport, setViewport] = React.useState({
    latitude: 37.785164,
    longitude: -100,
    zoom: 3.5,
    bearing: 0,
    pitch: 0
  });

  function onViewportChange(viewport) {
    setViewport(viewport);
  }

  return (
    <StyledMap
      {...viewport}
      width="100%"
      height="100%"
      mapStyle={mapStyle}
      onViewportChange={onViewportChange}
      mapboxApiAccessToken={TOKEN}
    >
      {CITIES.length > 0 &&
        CITIES.map((item, index) => {
          return (
            <Marker
              key={index}
              longitude={item.longitude}
              latitude={item.latitude}
            >
              <MapPinIcon color={theme.colors.primary} />
            </Marker>
          );
        })}
    </StyledMap>
  );
}

export default Map;
