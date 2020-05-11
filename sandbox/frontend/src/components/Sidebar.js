import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { useHover } from "react-use-gesture";

const vars = {
  left: -120,
};

const SidebarWrapper = styled(animated.div)`
  position: fixed;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const SidebarDivStyle = styled(animated.div)`
  position: absolute;
  /* border-radius: 0 16px 16px 0; */
  left: vars.left;
  width: 200px;
  /* top: 10px;
  height: calc(100vh - 20px); */
  height: 100%;
  background: #fff;
  z-index: 200;
  pointer-events: auto;
`;

const SidebarDimStyle = styled(animated.div)`
  width: 100%;
  height: 100%;
  background-color: whitesmoke;
  opacity: 0.3;
  z-index: 100;
`;

export const ContentStyled = styled(animated.div)`
  float: right;
  width: calc(100% - 80px - (40px) * 2);
  height: 100%;
  padding: 40px;
  transform: translateX(0);

  ${SidebarDivStyle}:hover & {
    transform: translateX(vars.left + "px");
  }
`;

export const Content = (props) => {
  return <ContentStyled>{props.children}</ContentStyled>;
};

const SidebarDiv = (props) => {
  const [animate, setAnimate] = useSpring(() => ({ left: vars.left }));

  const gesture = useHover(({ hovering }) => {
    // setAnimate({ left: hovering ? 0 : vars.left });
    props.hovered(hovering);
  });

  return (
    <SidebarDivStyle {...gesture()} style={animate}>
      {/* <p>{state.hovered}</p> */}
    </SidebarDivStyle>
  );
};

const SidebarDim = (props) => {
  // console.log(props.hovered);
  const animate = useSpring({
    opacity: props.hovered ? 0.5 : 0,
  });

  return <SidebarDimStyle style={animate}></SidebarDimStyle>;
};

export const Sidebar = () => {
  const [hovered, setHovered] = useState();
  const receivedHovered = (value) => {
    setHovered(value);
  };
  return (
    <SidebarWrapper>
      <SidebarDiv hovered={receivedHovered}></SidebarDiv>
      <SidebarDim hovered={hovered}></SidebarDim>
    </SidebarWrapper>
  );
};

// export default Sidebar;
