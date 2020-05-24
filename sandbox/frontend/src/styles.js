import styled, { createGlobalStyle } from "styled-components";
// import "typeface-notosans-kor";
// import "spoqa-han-sans";

export const global = {
  colors: {
    // bg: "#fbfbfb",
    // bg: "#fff",
    // bg: "#f5f5f5",
    // bg: "#E9D3D0",
    // bg: "#DBDAE0",
    // bg: "#ececec",
    bg: "#ececef",
    text: "#3a3a3a",
    // primary: "#583b77",
    // primary: "#f0335e",
    primary: "#000",
  },
  fonts: {
    // kor: "Noto Sans KR",
    kor: "Spoqa Han Sans",
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
    /* overflow: hidden; */
    overflow-x: hidden;
    user-select: none;
    color: ${global.colors.text};
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
