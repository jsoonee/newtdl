import { useState, useRef } from "react";
import styled from "styled-components";

import { IList } from "./Main";
import { sortList } from "./ToDoList";
import ColorPicker, { colors } from "./ColorPicker";

import { ReactComponent as EmptyStar } from "assets/emptystar.svg";
import { ReactComponent as FullStar } from "assets/fullstar.svg";
import { ReactComponent as Uncheck } from "assets/uncheck.svg";
import { ReactComponent as Clock } from "assets/clock.svg";
import { ReactComponent as XIcon } from "assets/x.svg";
import { ReactComponent as Disabled } from "assets/submit-disabled.svg";
import { ReactComponent as Submit } from "assets/submit.svg";

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	background-color: #fff;
	border-radius: 10px;
	margin-bottom: 1rem;
`;

export interface IBgColor {
	bgColor: string;
}

const Text = styled.div<IBgColor>`
	display: flex;
	justify-content: center;
	background: ${(props) => colors[+props.bgColor]};
	padding: 1rem;
	border-radius: 10px;
	input {
		width: 100%;
		padding: 5px;
		margin-left: 0.5rem;
		background: ${(props) => colors[+props.bgColor]};
		border: 0;
		:focus {
			outline: none;
		}
		font-size: 1rem;
	}
	svg {
		width: 20px;
	}
`;

const Control = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 1rem;
`;

const Option = styled.div`
	display: flex;
	align-items: center;
	svg {
		width: 30px;
		cursor: pointer;
	}
	* {
		margin-right: 0.3rem;
	}
`;

const Important = styled.div`
	display: flex;
	align-items: center;
`;

const Btn = styled.div`
	display: flex;
	cursor: pointer;
	svg {
		width: 40px;
		display: block;
	}
	[disabled] {
		cursor: not-allowed;
	}
`;

const SubmitBtn = styled.button`
	background: none;
	border: none;
	cursor: pointer;
`;

const Cancel = styled.div`
	display: flex;
	align-items: center;
	margin-right: 1rem;
	svg {
		width: 30px;
	}
`;

const AddToDo = ({ count, setCount, list, setList, setOpenAdd }: any) => {
	const [listItem, setListItem] = useState<IList>({
		id: count + 1,
		done: false,
		task: "",
		color: "0",
		star: false,
		time: false,
	});
	const taskRef = useRef<HTMLInputElement>(null);

	const inputChange = (e: any) => {
		setListItem((prevState) => ({ ...prevState, task: e.target.value }));
	};

	const inputEnter = (e: any) => {
		if (e.key === "Enter") clickSubmit();
	};

	const clickCancel = () => {
		setOpenAdd(false);
	};

	const clickSubmit = () => {
		if (!listItem.task.length) return;
		setCount(count + 1);
		const copyList = [listItem, ...list];
		setList(sortList(copyList));
		setOpenAdd(false);
	};

	return (
		<Wrapper>
			<Text bgColor={listItem.color}>
				<Uncheck />
				<input
					type="text"
					placeholder="할 일을 입력하세요"
					onChange={inputChange}
					onKeyUp={inputEnter}
					ref={taskRef}
				/>
			</Text>
			<Control>
				<Option>
					<ColorPicker setListItem={setListItem} />
					<Important
						onClick={() =>
							setListItem((prevState) => ({
								...prevState,
								star: !listItem.star,
							}))
						}
					>
						{listItem.star ? <FullStar /> : <EmptyStar />}
					</Important>
					<Clock />
				</Option>
				<Btn>
					{list.length ? (
						<Cancel onClick={clickCancel}>
							<XIcon />
						</Cancel>
					) : null}
					<SubmitBtn
						disabled={listItem.task.length ? false : true}
						onClick={clickSubmit}
					>
						{listItem.task.length ? <Submit /> : <Disabled />}
					</SubmitBtn>
				</Btn>
			</Control>
		</Wrapper>
	);
};

export default AddToDo;
