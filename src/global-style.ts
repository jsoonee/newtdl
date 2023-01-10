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
    --vh: 100%;
  }

  * {
	  margin: 0;
	  padding: 0;
    box-sizing: border-box;
    font-family: 'Noto Sans KR', sans-serif;
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
	  height: calc(var(--vh, 1vh) * 100);
    color: ${({ theme }) => theme.fontColor};
    background-color: ${({ theme }) => theme.bgMain};
    transition: color 0.5s, background-color 0.5s;
  }

  a {
    text-decoration: none;
    :visited {
      color: #fff;
    }
  }
`;
