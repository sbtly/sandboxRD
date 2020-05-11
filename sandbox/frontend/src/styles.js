import styled, { createGlobalStyle } from "styled-components";

export const global = {
  colors: {
    bg: "#fbfbfb",
  },
};

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
    user-select: none;
    font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto,
      segoe ui, arial, sans-serif;
    background: ${global.colors.bg};
  }

  #root, .container {
    width: 100%;
    height: 100%;
  }

  .content {
      /* float: right; */
      position: absolute;
      right: 0;
      transform: translateX(0px);
      width: calc(100% - 80px - (40px)*2);
      height: 100%;
      padding: 40px;
      background: ${global.colors.bg};

  }
`;
