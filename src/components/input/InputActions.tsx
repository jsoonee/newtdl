import { useState, useContext } from "react";
import { ThemeContext } from "context/ThemeContext";
import { ListContext } from "context/ListContext";
import { EditContext } from "context/EditContext";
import { ItemContext } from "context/ItemContext";
import styled from "styled-components";

import { ReactComponent as TrashIcon } from "assets/trash.svg";
import { ReactComponent as XIcon } from "assets/x.svg";
import { ReactComponent as Submit } from "assets/submit.svg";

const Btn = styled.div<{ color: string }>`
	display: flex;
	padding-top: 1rem;
	svg {
		display: block;
	}
	[disabled] {
		.submit-2 {
			fill: #8f8f8f;
		}
		:hover {
			opacity: 1;
		}
		svg {
			cursor: not-allowed;
		}
	}
	.xicon-1 {
		stroke: ${({ color }) => color};
	}
`;

const Delete = styled.div`
	position: relative;
	display: flex;
	align-items: center;
`;

const Trash = styled.div`
	fill: #ff4444;
	svg {
		height: 32px;
	}
	:hover {
		cursor: pointer;
		opacity: 0.7;
	}
`;

const Confirm = styled.div`
	position: absolute;
	display: flex;
	background-color: webgray;
	right: -3rem;
	bottom: 3rem;
	svg {
		height: 20px;
	}
	.trash-1 {
		stroke: #fff;
	}
	> * {
		padding: 1rem;
		cursor: pointer;
	}
`;

const DeleteConfirm = styled.div`
	background: #ff4444;
	fill: #fff;
	border-radius: 8px 0 0 8px;
	:hover {
		background: #ff7777;
	}
`;

const DeleteCancel = styled.div`
	background: #000;
	.xicon-1 {
		stroke: #fff;
	}
	border-radius: 0 8px 8px 0;
	:hover {
		background: #444;
	}
`;

const Cancel = styled.div`
	display: flex;
	align-items: center;
	svg {
		height: 30px;
	}
	cursor: pointer;
	:hover {
		opacity: 0.7;
	}
	margin: 0 1rem;
`;

const SubmitBtn = styled.button`
	background: none;
	border: none;
	svg {
		height: 40px;
	}
	:hover {
		cursor: pointer;
		opacity: 0.7;
	}
`;

const InputActions = ({ clickSubmit }: { clickSubmit: () => void }) => {
	const [confirm, setConfirm] = useState<boolean>(false);
	const { theme } = useContext(ThemeContext);
	const { list, dispatch } = useContext(ListContext);
	const { openEdit, setOpenEdit } = useContext(EditContext);
	const { listItem } = useContext(ItemContext);

	const clickDelete = () => {
		dispatch({ type: "DELETE", id: listItem.id });
		setOpenEdit(list.length <= 1 ? true : false);
	};

	const deleteCancel = () => {
		setConfirm(false);
	};

	const clickCancel = () => {
		setOpenEdit(false);
	};

	return (
		<Btn color={theme.fontColor}>
			{list.length && typeof openEdit === "number" ? (
				<Delete>
					<Trash onClick={() => setConfirm(!confirm)}>
						<TrashIcon />
					</Trash>
					{confirm ? (
						<Confirm>
							<DeleteConfirm onClick={clickDelete}>
								<TrashIcon />
							</DeleteConfirm>
							<DeleteCancel onClick={deleteCancel}>
								<XIcon />
							</DeleteCancel>
						</Confirm>
					) : null}
				</Delete>
			) : null}
			{list.length ? (
				<Cancel onClick={clickCancel}>
					<XIcon />
				</Cancel>
			) : null}
			<SubmitBtn
				disabled={listItem.task.length ? false : true}
				onClick={clickSubmit}
			>
				<Submit />
			</SubmitBtn>
		</Btn>
	);
};

export default InputActions;
