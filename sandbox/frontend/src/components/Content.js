import React, { useContext } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
// import { useHover } from "react-use-gesture";
import { global } from "../styles";
import { SidebarHoverContext } from "../App";

const ContentStyled = styled(animated.div)`
  position: absolute;
  right: 0;
  transform: translateX(0px);
  width: calc(100% - 80px - (40px) * 2);
  height: 100%;
  padding: 40px;
  /* background: ${global.colors.bg}; */
  background: transparent;
`;

export const Content = (props) => {
  const { sidebarHovered } = useContext(SidebarHoverContext);
  const animate = useSpring({
    transform: sidebarHovered ? "translateX(100px)" : "translateX(0px)",
    background: sidebarHovered ? global.colors.bg : "rgba(255,255,255,0)",
  });

  return <ContentStyled style={animate}>{props.children}</ContentStyled>;
};
