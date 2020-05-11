import React from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
// import { useHover } from "react-use-gesture";
import { global } from "../styles";

const ContentStyled = styled(animated.div)`
  position: absolute;
  right: 0;
  transform: translateX(0px);
  width: calc(100% - 80px - (40px) * 2);
  height: 100%;
  padding: 40px;
  background: ${global.colors.bg};
`;

export const Content = (props) => {
  const animate = useSpring({
    transform: props.hovered ? "translateX(100px)" : "translateX(0px)",
    background: props.hovered ? global.colors.bg : "#fff",
    // opacity: props.hovered ? 0.6 : 1,
  });

  return <ContentStyled style={animate}>{props.children}</ContentStyled>;
};
