import styled from "styled-components";
import { ReactComponent as Add } from "assets/add.svg";

const Btn = styled.div`
	position: absolute;
	right: 0;
	bottom: 0;
	margin: 3rem;
	svg {
		width: 70px;
		cursor: pointer;
	}
`;

const AddButton = ({ clickAdd }: any) => {
	return (
		<Btn onClick={clickAdd}>
			<Add />
		</Btn>
	);
};

export default AddButton;
