import React, { useState } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { useHover } from "react-use-gesture";
import { Activity, Users, ShoppingBag, Tag, Eye } from "react-feather";

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
  const Icon = icons[props.icon];
  const animate = useSpring({
    transform: props.hovered ? "translateX(-10px)" : "translateX(0px)",
    opacity: props.hovered ? 1 : 0,
  });

  console.log(props.hovered);

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
  // const [animate, setAnimate] = useSpring(() => ({ left: vars.left }));
  const [animate, setAnimate] = useSpring(() => ({}));

  const gesture = useHover(({ hovering }) => {
    // setAnimate({ left: hovering ? 0 : vars.left });
    props.hovered(hovering);
  });

  return (
    <SidebarDivStyle {...gesture()} style={animate}>
      {props.children}
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
      <SidebarDiv hovered={receivedHovered}>
        <SidebarList
          hovered={hovered}
          icon={"activity"}
          title={"요약"}
        ></SidebarList>
        <SidebarList
          hovered={hovered}
          icon={"users"}
          title={"고객"}
        ></SidebarList>
        <SidebarList
          hovered={hovered}
          icon={"shoppingbag"}
          title={"가맹점"}
        ></SidebarList>
        <SidebarList
          hovered={hovered}
          icon={"tag"}
          title={"태그"}
        ></SidebarList>
        <SidebarList
          hovered={hovered}
          icon={"eye"}
          title={"지켜보기"}
        ></SidebarList>
      </SidebarDiv>
      {/* <SidebarDim hovered={hovered}></SidebarDim> */}
    </SidebarWrapper>
  );
};
