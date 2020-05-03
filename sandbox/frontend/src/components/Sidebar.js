import React, { useState } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { useHover } from "react-use-gesture";

const vars = {
  left: -120,
};

const SidebarDiv = styled(animated.div)`
  position: fixed;
  border-radius: 0 16px 16px 0;
  left: vars.left;
  /* width: ${(props) => (props.expand ? 200 : 80)}px; */
  /* height: calc(100vh - 20px); */
  width: 200px;
  height: 100%;
  background: #fff;
`;

const Sidebar = () => {
  // const [expand, setExpand] = useState(false);
  const [animate, set] = useSpring(() => ({ left: vars.left }));
  const gesture = useHover(({ hovering }) =>
    set({ left: hovering ? 0 : vars.left })
  );

  return <SidebarDiv {...gesture()} style={animate}></SidebarDiv>;
};

export default Sidebar;
