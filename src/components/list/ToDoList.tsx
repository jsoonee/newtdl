import React, { useContext } from "react";
import styled from "styled-components";

import { ThemeContext } from "context/ThemeContext";
import { IList, ListContext } from "context/ListContext";
import { EditContext } from "context/EditContext";
import { ItemContext } from "context/ItemContext";

import InputToDo from "../input/InputToDo";
import { IStyled } from "../input/InputBox";
import { colors } from "../input/ColorPicker";
import CheckBox from "./CheckBox";

import { ReactComponent as Star } from "assets/star.svg";

const Wrapper = styled.div`
	height: calc(100% - 100px);
`;

const List = styled.ul`
	list-style: none;
	overflow: overlay;
	height: 100%;
	padding-right: 1rem;
	.drag {
		position: absolute;
		width: 100%;
	}
	::-webkit-scrollbar {
		width: 4px;
	}
	::-webkit-scrollbar-thumb {
		background: #a5a5a5;
		border-radius: 5px;
		:hover {
			background: #878787;
		}
		:active {
			background: #555555;
		}
	}
	@media screen and (max-width: 320px) {
		padding-right: 0.5rem;
	}
`;

const Left = styled.div`
	display: flex;
	overflow: hidden;
`;

const ItemBg = styled.li<IStyled>`
	margin-bottom: 1rem;
	color: ${({ bgColor, done, theme }) =>
		+bgColor
			? done
				? "#5c5c5c"
				: "#000"
			: done
			? theme.fontSub
			: theme.fontColor};
	background-color: ${({ bgColor, theme }) =>
		+bgColor ? colors[+bgColor] : theme.bgSub};
	transition: color 0.5s, background-color 0.3s;
	border-radius: 10px;
	box-shadow: 0 2px 3px -2px ${({ theme }) => (theme.isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.5)")};
`;

const Item = styled.div<{ bgColor: string }>`
	display: flex;
	justify-content: space-between;
	border-radius: 10px;
	svg {
		height: 20px;
	}
	cursor: pointer;
	@media (hover: hover) {
		:hover {
			background: ${({ bgColor, theme }) =>
				+bgColor
					? "rgba(0,0,0,0.1)"
					: theme.isDark
					? "rgba(255,255,255,0.1)"
					: "rgba(0,0,0,0.05)"};
		}
	}
`;

const Task = styled.div<{ done: boolean }>`
	margin: 1rem 0;
	text-decoration: ${(props) => (props.done ? "line-through" : "none")};
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: initial;
	display: -webkit-box;
	-webkit-line-clamp: 4;
	-webkit-box-orient: vertical;
	word-break: break-word;
`;

const Important = styled.div<{ star: boolean; color: string; bgColor: string }>`
	flex-shrink: 0;
	display: flex;
	align-items: center;
	margin: 0.7rem;
	padding: 0.3rem;
	.fullstar-1 {
		display: ${(props) => (props.star ? "block" : "none")};
		fill: "#ffc100";
	}
	.emptystar-1 {
		display: ${(props) => (props.star ? "none" : "block")};
	}
	.emptystar-1 {
		fill: ${({ color, bgColor }) => (+bgColor ? "#000" : color)};
	}
	@media (hover: hover) {
		:hover {
			.fullstar-1 {
				display: block;
				opacity: ${(props) => (props.star ? "0.7" : "0.3")};
			}
		}
	}
`;

const ToDoList = () => {
	const { theme } = useContext(ThemeContext);
	const { list, dispatch } = useContext(ListContext);
	const { openEdit, setOpenEdit } = useContext(EditContext);
	const { listItem, setListItem } = useContext(ItemContext);

	const clickItem = (e: React.MouseEvent, value: IList) => {
		if (e.target !== e.currentTarget) return;
		setOpenEdit(value.id);
		setListItem(value);
	};

	return (
		<Wrapper>
			<List>
				{openEdit < 0 || !list.length ? <InputToDo /> : null}
				{list.map((value) => {
					const { id, done, task, color, star, time } = value;
					return openEdit === id ? (
						<InputToDo key={id} />
					) : (
						<ItemBg
							draggable
							key={id}
							bgColor={color}
							done={done}
							theme={theme}
						>
							<Item bgColor={color} onClick={(e) => clickItem(e, value)}>
								<Left>
									<CheckBox id={id} bgColor={color} done={done} />
									<Task done={done} onClick={(e) => clickItem(e, value)}>
										{task}
									</Task>
								</Left>
								<Important
									star={star}
									color={theme.fontColor}
									bgColor={color}
									onClick={(e) => {
										e.stopPropagation();
										if (openEdit > 0) {
											if (list[id - 1].star && openEdit > id) {
												setOpenEdit(openEdit - 1);
												setListItem({ ...listItem, id: openEdit - 1 });
											} else if (!list[id - 1].star && openEdit < id) {
												setOpenEdit(openEdit + 1);
												setListItem({ ...listItem, id: openEdit + 1 });
											}
										}
										dispatch({ type: "STAR", id: id });
									}}
								>
									<Star />
								</Important>
							</Item>
						</ItemBg>
					);
				})}
			</List>
		</Wrapper>
	);
};

export default ToDoList;
