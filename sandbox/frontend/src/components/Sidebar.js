import React, { useState, useContext, useEffect, createContext } from "react";
import { NavLink, useLocation } from "react-router-dom";

import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { useHover } from "react-use-gesture";
import { Activity, Users, ShoppingBag, Tag, Eye } from "react-feather";
import { SidebarHoverContext } from "../App";

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

const SidebarCurrentStyled = styled(animated.div)`
  position: absolute;
  width: 4px;
  height: 40px;
  margin: 20px 0 20px 0;
  /* height: 50%; */
  background: black;
`;

// Context
export const SidebarCurrentContext = createContext();

// Component
const SidebarList = (props) => {
  const { sidebarHovered } = useContext(SidebarHoverContext);
  const { currentPath } = useContext(SidebarCurrentContext);

  const [listHovered, setListHovered] = useState(null);
  const Icon = icons[props.icon];

  const gesture = useHover(({ hovering }) => {
    setListHovered(hovering);
  });

  const textAnimate = useSpring({
    transform: sidebarHovered ? "translateX(-10px)" : "translateX(0px)",
    opacity: sidebarHovered ? 1 : 0,
  });

  const hoverAnimate = useSpring({
    opacity: currentPath === props.href || listHovered ? 1 : 0.3,
  });

  // const currentStyle =
  //   currentPath === props.href ? { opacity: 1 } : { opacity: 0 };

  // const currentAnimate = useSpring({
  //   opacity: currentPath === props.href ? 1 : 0,
  // });

  return (
    <NavLink to={props.href} {...gesture()}>
      <SidebarListStyled style={hoverAnimate}>
        {/* <SidebarCurrentStyled style={currentAnimate} /> */}
        <SidebarIconStyled>
          <Icon size={20} />
        </SidebarIconStyled>
        <SidebarTextStyled style={textAnimate}>{props.title}</SidebarTextStyled>
      </SidebarListStyled>
    </NavLink>
  );
};

const SidebarDiv = (props) => {
  const { sidebarHovered, setSidebarHovered } = useContext(SidebarHoverContext);
  const { currentPath } = useContext(SidebarCurrentContext);

  const gesture = useHover(({ hovering }) => {
    setSidebarHovered(hovering);
  });
  const animate = useSpring({
    background: sidebarHovered ? "#fff" : "rgba(255,255,255,0)",
  });

  return (
    <SidebarDivStyle {...gesture()} style={animate}>
      <SidebarCurrentStyled />
      {props.children}
    </SidebarDivStyle>
  );
};

export const Sidebar = (props) => {
  let location = useLocation();
  const [currentPath, setCurrentPath] = useState(null);
  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  return (
    <SidebarCurrentContext.Provider value={{ currentPath, setCurrentPath }}>
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
    </SidebarCurrentContext.Provider>
  );
};
