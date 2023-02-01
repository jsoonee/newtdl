import { useContext } from "react";
import { ThemeContext } from "context/ThemeContext";
import { ItemContext } from "context/ItemContext";
import styled from "styled-components";
import ColorPicker from "./ColorPicker";

import { ReactComponent as Star } from "assets/star.svg";
// import { ReactComponent as Clock } from "assets/clock.svg";

const Option = styled.div<{ color: string }>`
	display: flex;
	align-items: center;
	padding-top: 1rem;
	svg {
		width: 30px;
	}
	> * {
		margin-right: 0.5rem;
	}
	.emptystar-1,
	.clock-0 {
		fill: ${({ color }) => color};
	}
	.clock-1 {
		stroke: ${({ color }) => color};
	}
`;

const Important = styled.div<{ star: boolean }>`
	display: flex;
	align-items: center;
	.fullstar-1 {
		display: ${(props) => (props.star ? "block" : "none")};
		fill: "#ffc100";
	}
	.emptystar-1 {
		display: ${(props) => (props.star ? "none" : "block")};
	}
	cursor: pointer;
	@media (hover: hover) {
		:hover {
			.fullstar-1 {
				display: block;
				opacity: ${(props) => (props.star ? "0.7" : "0.3")};
			}
		}
	}
`;

// const Time = styled.div`
// 	display: flex;
// 	align-items: center;
// 	:hover {
// 		opacity: 0.7;
// 	}
// 	cursor: pointer;
// `;

const InputOptions = () => {
	const { theme } = useContext(ThemeContext);
	const { listItem, setListItem } = useContext(ItemContext);

	return (
		<Option color={theme.fontColor}>
			<ColorPicker />
			<Important
				star={listItem.star}
				onClick={() =>
					setListItem((prevState) => ({
						...prevState,
						star: !listItem.star,
					}))
				}
			>
				<Star />
			</Important>
			{/* <Time>
				<Clock />
			</Time> */}
		</Option>
	);
};

export default InputOptions;
