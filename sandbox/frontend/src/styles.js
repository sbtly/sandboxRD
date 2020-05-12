import styled, { createGlobalStyle } from "styled-components";
import "typeface-notosans-kor";

export const global = {
  colors: {
    bg: "#fbfbfb",
  },
  fonts: {
    kor: "Noto Sans KR",
  },
};

export const GlobalStyle = createGlobalStyle`
  a {
    color: inherit;
    text-decoration: none;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
    user-select: none;
    font-family: ${global.fonts.kor}, -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto,
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
