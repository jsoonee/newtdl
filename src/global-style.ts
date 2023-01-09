import { createGlobalStyle } from "styled-components";

interface ITheme {
	theme: {
		fontColor: string;
		bgMain: string;
		bgThird: string;
	};
}

export const GlobalStyle = createGlobalStyle<ITheme>`
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
    color: ${({ theme }) => theme.fontColor};
    background: ${({ theme }) => theme.bgMain};
    transition: all 0.5s ease-in-out;
  }

  .App {
	  display: flex;
	  justify-content: center;
	  width: 100%;
	  height: 100vh;
  }

  a {
    text-decoration: none;
    :visited {
      color: #fff;
    }
  }
`;
