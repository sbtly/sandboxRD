import React from "react";
import styled from "styled-components";

const SidebarDiv = styled.div`
  position: fixed;
  border-radius: 0 16px 16px 0;

  width: ${(props) => (props.expand ? 200 : 80)}px;
  /* height: calc(100vh - 20px); */
  height: 100%;
  background: #fff;
`;

const Sidebar = () => {
  return <SidebarDiv></SidebarDiv>;
};

export default Sidebar;
