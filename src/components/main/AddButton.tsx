import { useContext } from "react";
import styled from "styled-components";
import { ReactComponent as Add } from "assets/add.svg";

import { EditContext } from "context/EditContext";
import { initialState, ItemContext } from "context/ItemContext";

const Btn = styled.div`
	position: absolute;
	right: 0;
	bottom: 0;
	margin: 8%;
	svg {
		width: 70px;
		cursor: pointer;
		:hover {
			.add-bg {
				fill: #69f;
			}
		}
	}
`;

const AddButton = () => {
	const { setOpenEdit } = useContext(EditContext);
	const { setListItem } = useContext(ItemContext);
	return (
		<Btn
			onClick={() => {
				setOpenEdit(true);
				setListItem(initialState);
			}}
		>
			<Add />
		</Btn>
	);
};

export default AddButton;
