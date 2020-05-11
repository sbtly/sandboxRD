import React, { useState } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { useHover } from "react-use-gesture";
import { X } from "react-feather";

// const vars = {
//   left: -120,
// };

const SidebarWrapper = styled(animated.div)`
  position: fixed;
  /* width: 100%; */
  width: 200px;
  height: 100%;
  pointer-events: none;
`;

const SidebarDivStyle = styled(animated.div)`
  position: absolute;
  /* border-radius: 0 16px 16px 0; */
  /* left: vars.left; */

  /* width: 200px; */
  width: 100%;
  /* top: 10px;
  height: calc(100vh - 20px); */
  height: 100%;
  background: #fff;
  /* z-index: 200; */
  pointer-events: auto;
`;

const SidebarDimStyle = styled(animated.div)`
  width: 100%;
  height: 100%;
  background-color: whitesmoke;
  opacity: 0.3;
  /* z-index: 100; */
`;

const SidebarListStyled = styled(animated.div)`
  width: 100%;
  height: 80px;
  background: salmon;
`;

const SidebarIconStyled = styled(animated.div)`
  width: 80px;
  height: 100%;

  /* centering hack */
  display: flex;
  align-items: center;
  justify-content: center;

  background: brown;
`;

const SidebarList = (props) => {
  return (
    <SidebarListStyled>
      <SidebarIconStyled>
        <X></X>
      </SidebarIconStyled>
    </SidebarListStyled>
  );
};

const SidebarDiv = (props) => {
  // const [animate, setAnimate] = useSpring(() => ({ left: vars.left }));
  const [animate, setAnimate] = useSpring(() => ({}));

  const gesture = useHover(({ hovering }) => {
    // setAnimate({ left: hovering ? 0 : vars.left });
    props.hovered(hovering);
  });

  return (
    <SidebarDivStyle {...gesture()} style={animate}>
      <SidebarList></SidebarList>
    </SidebarDivStyle>
  );
};

// const SidebarDim = (props) => {
//   // console.log(props.hovered);
//   const animate = useSpring({
//     opacity: props.hovered ? 0.5 : 0,
//   });

//   return <SidebarDimStyle style={animate}></SidebarDimStyle>;
// };

export const Sidebar = (props) => {
  const [hovered, setHovered] = useState(null);
  const receivedHovered = (value) => {
    setHovered(value);
    props.hovered(value);
  };

  // console.log(hovered);
  return (
    <SidebarWrapper>
      <SidebarDiv hovered={receivedHovered}></SidebarDiv>
      {/* <SidebarDim hovered={hovered}></SidebarDim> */}
    </SidebarWrapper>
  );
};
