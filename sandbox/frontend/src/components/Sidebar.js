import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";

import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { useHover } from "react-use-gesture";
import { Activity, Users, ShoppingBag, Tag, Eye } from "react-feather";
import { SidebarContext } from "../App";

const SidebarWrapper = styled(animated.div)`
  position: fixed;
  width: 200px;
  height: 100%;
  pointer-events: none;
`;

const SidebarDivStyle = styled(animated.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  background: #fff;
  pointer-events: auto;
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
  const [listHovered, setListHovered] = useState(null);
  const { sidebarHovered } = useContext(SidebarContext);
  const Icon = icons[props.icon];

  const gesture = useHover(({ hovering }) => {
    setListHovered(hovering);
  });

  const textAnimate = useSpring({
    transform: sidebarHovered ? "translateX(-10px)" : "translateX(0px)",
    opacity: sidebarHovered ? 1 : 0,
  });

  const hoverAnimate = useSpring({
    opacity: listHovered ? 1 : 0.3,
  });

  return (
    <NavLink to={props.href} {...gesture()}>
      <SidebarListStyled style={hoverAnimate}>
        <SidebarIconStyled>
          <Icon size={20} />
        </SidebarIconStyled>
        <SidebarTextStyled style={textAnimate}>{props.title}</SidebarTextStyled>
      </SidebarListStyled>
    </NavLink>
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
        <SidebarList
          href={"/user"}
          icon={"activity"}
          title={"요약"}
        ></SidebarList>
        <SidebarList href={"/"} icon={"users"} title={"고객"}></SidebarList>
        <SidebarList
          href={"/merch"}
          icon={"shoppingbag"}
          title={"가맹점"}
        ></SidebarList>
        <SidebarList href={"/tag"} icon={"tag"} title={"태그"}></SidebarList>
        <SidebarList
          href={"/watch"}
          icon={"eye"}
          title={"지켜보기"}
        ></SidebarList>
      </SidebarDiv>
    </SidebarWrapper>
  );
};
