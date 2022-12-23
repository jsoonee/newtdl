import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
	  margin: 0;
	  padding: 0;
    box-sizing: border-box;
    font-family: 'Noto Sans KR', sans-serif;
  }

  .App {
	  display: flex;
	  justify-content: center;
	  align-items: center;
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
