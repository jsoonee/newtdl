import { useContext } from "react";
import { ThemeContext } from "context/ThemeContext";
import { ListContext } from "context/ListContext";
import { EditContext } from "context/EditContext";
import { ItemContext } from "context/ItemContext";
import { Theme } from "theme/theme";
import styled from "styled-components";

import InputBox from "./InputBox";
import InputOptions from "./InputOptions";
import InputActions from "./InputActions";

const Wrapper = styled.div<{ theme: Theme }>`
	display: flex;
	flex-direction: column;
	width: 100%;
	background-color: ${({ theme }) => theme.bgSub};
	border-radius: 10px;
	margin-bottom: 1rem;
	box-shadow: 0 2px 3px -2px ${({ theme }) => (theme.isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)")};
`;

export const Checkbox = styled.div`
	display: flex;
	align-items: center;
	padding: 1rem;
	svg {
		height: 20px;
	}
	:hover {
		cursor: pointer;
		.check-1 {
			display: block;
		}
		opacity: 0.7;
	}
`;

const Control = styled.div`
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	padding: 0 1rem 1rem 1rem;
`;

const InputToDo = () => {
	const { theme } = useContext(ThemeContext);
	const { dispatch } = useContext(ListContext);
	const { openEdit, setOpenEdit } = useContext(EditContext);
	const { listItem } = useContext(ItemContext);

	const clickSubmit = () => {
		if (!listItem.task.length) return;
		if (openEdit === true) {
			dispatch({ type: "CREATE", item: listItem });
		} else {
			dispatch({ type: "EDIT", id: listItem.id, item: listItem });
		}
		setOpenEdit(false);
	};

	return (
		<Wrapper theme={theme}>
			<InputBox clickSubmit={clickSubmit} />
			<Control>
				<InputOptions />
				<InputActions clickSubmit={clickSubmit} />
			</Control>
		</Wrapper>
	);
};

export default InputToDo;
