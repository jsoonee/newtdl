import { useContext } from "react";
import styled from "styled-components";

import { ListContext } from "context/ListContext";
import { EditContext } from "context/EditContext";

import Header from "../header/Header";
import ToDoList from "../list/ToDoList";
import AddButton from "./AddButton";

const Wrapper = styled.div`
	position: relative;
	width: 100%;
	max-width: 800px;
	padding: 0 1rem 1rem 2rem;
	border-radius: 30px;
	@media screen and (max-width: 320px) {
		padding: 0 0.5rem 1rem 1rem;
	}
`;

const Main = () => {
	const { list } = useContext(ListContext);
	const { openEdit } = useContext(EditContext);

	return (
		<Wrapper>
			<Header />
			<ToDoList />
			{!openEdit && list.length ? <AddButton /> : null}
		</Wrapper>
	);
};

export default Main;
