import { useContext } from "react";
import styled from "styled-components";
import { ReactComponent as Add } from "assets/add.svg";

import { EditContext } from "context/EditContext";
import { ThemeContext } from "context/ThemeContext";

const Btn = styled.div<{ isDark: boolean }>`
	position: absolute;
	right: 0;
	bottom: 0;
	margin: 8%;
	svg {
		width: 70px;
		cursor: pointer;
	}
	-webkit-filter: drop-shadow(
		0px 1px 2px
			${({ isDark }) =>
				isDark ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.5)"}
	);
	filter: drop-shadow(
		0px 1px 2px
			${({ isDark }) =>
				isDark ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.5)"}
	);
	@media (hover: hover) {
		:hover {
			.add-bg {
				fill: #69f;
			}
		}
	}
`;

const AddButton = () => {
	const { setOpenEdit } = useContext(EditContext);
	const { theme } = useContext(ThemeContext);

	return (
		<Btn
			isDark={theme.isDark}
			onClick={() => {
				setOpenEdit(-1);
			}}
		>
			<Add />
		</Btn>
	);
};

export default AddButton;
