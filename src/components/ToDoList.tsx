import styled from "styled-components";

import { IBgColor } from "./AddToDo";
import { colors } from "./ColorPicker";

import { ReactComponent as Uncheck } from "assets/uncheck.svg";
import { ReactComponent as Check } from "assets/check.svg";
import { ReactComponent as EmptyStar } from "assets/emptystar.svg";
import { ReactComponent as FullStar } from "assets/fullstar.svg";

const List = styled.ul`
	display: flex;
	flex-direction: column;
	justify-content: center;
	list-style: none;
	overflow: auto;
`;

const Left = styled.div`
	display: flex;
`;

const Checkbox = styled.div`
	display: flex;
	align-items: center;
`;

const Item = styled.li<IBgColor>`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1rem;
	margin-bottom: 1rem;
	background-color: ${(props) => colors[+props.bgColor]};
	border-radius: 10px;
	svg {
		width: 20px;
	}
	cursor: pointer;
`;

interface IDone {
	done: boolean;
}

const Task = styled.div<IDone>`
	margin-left: 1rem;
	color: ${(props) => (props.done ? "#666" : "#000")};
	text-decoration: ${(props) => (props.done ? "line-through" : "none")};
`;

const Star = styled.div`
	display: flex;
	align-items: center;
`;

export const sortList = (array: any) => {
	return array.sort((a: any, b: any) => b.star - a.star || b.id - a.id);
};

const ToDoList = ({ list, setList }: any) => {
	const clickIcon = (icon: string, index: number) => {
		const copyList = [...list];
		copyList[index][icon] = !copyList[index][icon];

		setList(sortList(copyList));
	};
	console.log(list);
	return (
		<List>
			{list.map((value: any, index: any) => {
				const { id, done, task, color, star, time } = value;
				return (
					<Item key={id} bgColor={color}>
						<Left>
							<Checkbox onClick={() => clickIcon("done", index)}>
								{done ? <Check /> : <Uncheck />}
							</Checkbox>
							<Task done={done}>{task}</Task>
						</Left>
						<Star onClick={() => clickIcon("star", index)}>
							{star ? <FullStar /> : <EmptyStar />}
						</Star>
					</Item>
				);
			})}
		</List>
	);
};

export default ToDoList;
