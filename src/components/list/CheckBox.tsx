import { useContext } from "react";
import { ThemeContext } from "context/ThemeContext";
import { ListContext } from "context/ListContext";
import { EditContext } from "context/EditContext";
import { ItemContext } from "context/ItemContext";
import { Theme } from "theme/theme";

import styled from "styled-components";

import { ReactComponent as Check } from "assets/check.svg";

const Wrapper = styled.div<{ theme: Theme; bgColor: string; isCheck: boolean }>`
	display: flex;
	align-items: center;
	margin: 0.7rem;
	padding: 0.3rem;
	cursor: pointer;
	.check-1 {
		display: ${(props) => (props.isCheck ? "block" : "none")};
		stroke: ${({ theme, bgColor, isCheck }) =>
			+bgColor
				? isCheck
					? "#000"
					: "#5c5c5c"
				: isCheck
				? theme.fontColor
				: theme.check};
	}
	.uncheck-1 {
		fill: ${({ theme, bgColor, isCheck }) =>
			+bgColor
				? isCheck
					? "#000"
					: "#5c5c5c"
				: isCheck
				? theme.fontColor
				: theme.check};
	}
	:hover {
		.check-1 {
			display: block;
			stroke: ${({ theme, bgColor }) => (+bgColor ? "#000" : theme.fontColor)};
			opacity: ${(props) => (props.isCheck ? "1" : "0.3")};
		}
		.uncheck-1 {
			fill: ${({ theme, bgColor, isCheck }) =>
				+bgColor
					? isCheck
						? "#5c5c5c"
						: "#000"
					: isCheck
					? theme.check
					: theme.fontColor};
		}
	}
`;

const CheckBox = ({
	id,
	bgColor,
	done,
}: {
	id: number;
	bgColor: string;
	done: boolean;
}) => {
	const { theme } = useContext(ThemeContext);
	const { dispatch } = useContext(ListContext);
	const { openEdit } = useContext(EditContext);
	const { setListItem } = useContext(ItemContext);

	const onClick = () => {
		if (openEdit || openEdit === 0) {
			setListItem((prev) => ({
				...prev,
				done: !done,
			}));
		} else {
			dispatch({ type: "CHECK", id: id });
		}
	};

	return (
		<Wrapper theme={theme} bgColor={bgColor} isCheck={done} onClick={onClick}>
			<Check />
		</Wrapper>
	);
};

export default CheckBox;
