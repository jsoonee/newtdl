import React, { useEffect, useRef, useContext } from "react";
import { ThemeContext } from "context/ThemeContext";
import { EditContext } from "context/EditContext";
import { ItemContext } from "context/ItemContext";
import { Theme } from "theme/theme";
import CheckBox from "../list/CheckBox";
import { colors } from "./ColorPicker";
import styled from "styled-components";

export interface IStyled {
	bgColor: string;
	done?: boolean;
	theme: Theme;
}

const Task = styled.div<IStyled>`
	display: flex;
	justify-content: center;
	background: ${({ bgColor, theme }) =>
		+bgColor ? colors[+bgColor] : theme.bgSub};
	border-radius: 10px;
	svg {
		height: 20px;
	}
`;

const TextArea = styled.textarea<IStyled>`
	width: 100%;
	margin: 1rem 0;
	padding-right: 1rem;
	background: ${({ bgColor, theme }) =>
		+bgColor ? colors[+bgColor] : theme.bgSub};
	border: 0;
	font-size: 1rem;
	resize: none;
	:focus {
		outline: none;
	}
	color: ${({ bgColor, done, theme }) =>
		+bgColor ? "#000" : done ? theme.fontSub : theme.fontColor};
	text-decoration: ${(props) => (props.done ? "line-through" : "none")};
	::placeholder {
		color: ${({ theme, bgColor }) => (+bgColor ? "#5c5c5c" : theme.fontSub)};
	}
`;

const InputBox = ({ clickSubmit }: { clickSubmit: () => void }) => {
	const taskRef = useRef<HTMLTextAreaElement>(null);
	const { theme } = useContext(ThemeContext);
	const { openEdit } = useContext(EditContext);
	const { listItem, setListItem } = useContext(ItemContext);

	useEffect(() => {
		if (typeof openEdit === "number" && taskRef.current) {
			taskRef.current.value = listItem.task;
			taskRef.current.style.height = "auto";
			taskRef.current.style.height = taskRef.current.scrollHeight + "px";
		}
	}, [openEdit]);

	const inputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		e.target.style.height = "auto";
		e.target.style.height = e.target.scrollHeight + "px";
		setListItem((prevState) => ({ ...prevState, task: e.target.value }));
	};

	const inputEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
			clickSubmit();
		}
	};

	return (
		<Task theme={theme} bgColor={listItem.color}>
			<CheckBox
				id={listItem.id}
				bgColor={listItem.color}
				done={listItem.done}
			/>
			<TextArea
				rows={1}
				theme={theme}
				bgColor={listItem.color}
				done={listItem.done}
				placeholder="할 일을 입력하세요"
				onChange={inputChange}
				onKeyDown={(e) => {
					if (e.key === "Enter") e.preventDefault();
				}}
				onKeyUp={inputEnter}
				ref={taskRef}
				spellCheck={false}
			/>
		</Task>
	);
};

export default InputBox;
