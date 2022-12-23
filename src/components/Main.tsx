import { useState } from "react";
import styled from "styled-components";

import Header from "./Header";
import AddToDo from "./AddToDo";
import ToDoList from "./ToDoList";
import AddButton from "./AddButton";

const Wrapper = styled.div`
	position: relative;
	width: calc(100% - 50px);
	height: calc(100vh - 50px);
	max-width: 660px;
	max-height: 880px;
	background-color: #eaeaea;
	border-radius: 80px;
	border: 15px solid black;
	padding: 0 1rem 1rem 1rem;
`;

export interface IList {
	id: number;
	done: boolean;
	task: string;
	color: string;
	star: boolean;
	time: false | string;
}

const Main = () => {
	const [count, setCount] = useState<number>(0);
	const [openAdd, setOpenAdd] = useState<boolean>(false);
	const [list, setList] = useState<IList[]>([]);
	const clickAdd = () => {
		setOpenAdd(true);
	};
	return (
		<Wrapper>
			<Header />
			<div>
				{openAdd || !list.length ? (
					<AddToDo
						count={count}
						setCount={setCount}
						list={list}
						setList={setList}
						setOpenAdd={setOpenAdd}
					/>
				) : null}
				<ToDoList list={list} setList={setList} />
			</div>
			{!openAdd && list.length ? (
				<AddButton
					openAdd={openAdd}
					setOpenAdd={setOpenAdd}
					clickAdd={clickAdd}
				/>
			) : null}
		</Wrapper>
	);
};

export default Main;
