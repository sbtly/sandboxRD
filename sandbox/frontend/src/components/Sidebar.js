import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { useHover } from "react-use-gesture";
import { Activity, Users, ShoppingBag, Tag, Eye } from "react-feather";
import { SidebarContext } from "../App";

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

  display: flex;
  align-items: center;
`;

const icons = {
  activity: Activity,
  users: Users,
  shoppingbag: ShoppingBag,
  tag: Tag,
  eye: Eye,
};

const SidebarIconStyled = styled(animated.div)`
  width: 80px;
  height: 100%;

  /* centering hack */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SidebarTextStyled = styled(animated.div)`
  font-size: 1em;
  font-weight: 500;

  transform: translateX(0px);
`;

const SidebarList = (props) => {
  const { sidebarHovered } = useContext(SidebarContext);
  const Icon = icons[props.icon];
  const animate = useSpring({
    transform: sidebarHovered ? "translateX(-10px)" : "translateX(0px)",
    opacity: sidebarHovered ? 1 : 0,
  });

  return (
    <SidebarListStyled>
      <SidebarIconStyled>
        <Icon size={20} />
      </SidebarIconStyled>
      <SidebarTextStyled style={animate}>{props.title}</SidebarTextStyled>
    </SidebarListStyled>
  );
};

const SidebarDiv = (props) => {
  const { sidebarHovered, setSidebarHovered } = useContext(SidebarContext);

  const gesture = useHover(({ hovering }) => {
    setSidebarHovered(hovering);
  });
  const animate = useSpring({
    background: sidebarHovered ? "#fff" : "rgba(255,255,255,0)",
  });

  return (
    <SidebarDivStyle {...gesture()} style={animate}>
      {props.children}
    </SidebarDivStyle>
  );
};

export const Sidebar = (props) => {
  return (
    <SidebarWrapper>
      <SidebarDiv>
        <SidebarList icon={"activity"} title={"요약"}></SidebarList>
        <SidebarList icon={"users"} title={"고객"}></SidebarList>
        <SidebarList icon={"shoppingbag"} title={"가맹점"}></SidebarList>
        <SidebarList icon={"tag"} title={"태그"}></SidebarList>
        <SidebarList icon={"eye"} title={"지켜보기"}></SidebarList>
      </SidebarDiv>
    </SidebarWrapper>
  );
};
