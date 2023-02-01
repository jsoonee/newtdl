import { createGlobalStyle } from "styled-components";

interface ITheme {
	theme: {
		fontColor: string;
		bgMain: string;
		bgThird: string;
	};
}

export const GlobalStyle = createGlobalStyle<ITheme>`
  :root {
    --vh: 100vh;
  }
  * {
	  margin: 0;
	  padding: 0;
    box-sizing: border-box;
    font-family: '맑은 고딕', 'malgun gothic', 'Apple SD Gothic Neo', 'Apple SD 산돌고딕 Neo', 'Microsoft NeoGothic', 'Droid sans', sans-serif;
  }

  html, body, #root, .App, main {
    height: 100%;
  }

  body {
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select: none;
  }

  .App {
	  display: flex;
	  justify-content: center;
	  width: 100%;
    height: 100%;
    color: ${({ theme }) => theme.fontColor};
    transition: color 0.5s, background-color 0.5s;
  }

  a {
    text-decoration: none;
    :visited {
      color: #fff;
    }
  }
`;
