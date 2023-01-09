import { useContext } from "react";
import { ThemeContext } from "context/ThemeContext";
import styled from "styled-components";

import { ReactComponent as Light } from "assets/light.svg";
import { ReactComponent as Dark } from "assets/dark.svg";

const Wrapper = styled.div`
	display: flex;
	svg {
		width: 30px;
	}
	cursor: pointer;
	:hover {
		opacity: 0.7;
	}
`;

const ThemeToggle = () => {
	const { theme, toggleTheme } = useContext(ThemeContext);
	return (
		<Wrapper onClick={toggleTheme}>
			{theme.isDark ? <Dark /> : <Light />}
		</Wrapper>
	);
};

export default ThemeToggle;
