import React, { useState, useEffect, useRef, useContext } from "react";
import { ThemeContext } from "context/ThemeContext";
import { ItemContext } from "context/ItemContext";
import { Theme } from "theme/theme";
import styled from "styled-components";

import { ReactComponent as PickerIcon } from "assets/picker.svg";

export const colors = [
	"#fff",
	"#ee88bb",
	"#ffee99",
	"#77aa88",
	"#ffaa77",
	"#ffbbcc",
	"#ee7788",
	"#99aacc",
	"#aa88cc",
	"#bb8899",
	"#ffaa99",
	"#77bbaa",
];

const Wrapper = styled.div`
	position: relative;
`;

const Btn = styled.div`
	cursor: pointer;
	display: flex;
	align-items: center;
	:hover {
		opacity: 0.7;
	}
`;

const Picker = styled.div<{ isDark: boolean; theme: Theme }>`
	position: absolute;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	left: -1rem;
	top: 3rem;
	padding: 0.5rem;
	background: ${({ isDark }) =>
		isDark ? "rgba(42,42,42,0.7)" : "rgba(255,255,255,0.7)"};
	backdrop-filter: blur(2px);
	border-radius: 15px;
	input[type="radio"] {
		display: none;
	}
	input[type="radio"]:checked + .color-label {
		border: 3px solid
			${({ isDark }) =>
				isDark ? "rgba(180, 180, 180, 0.8)" : "rgba(0,0,0,0.5)"};
		:hover {
			opacity: 1;
		}
	}
	${({ theme }) =>
		colors.map((_, index) =>
			index
				? `
    .clr-${index} {
      background: ${colors[index]}
    }
    `
				: `.clr-0 {
      background: ${theme.bgSub}
    }`
		)}
`;

const Label = styled.label<{ isDark: boolean; firstChild: boolean }>`
	display: block;
	width: 30px;
	height: 30px;
	margin: 0.5rem 0.3rem;
	border-radius: 50%;
	border: ${({ isDark, firstChild }) =>
		firstChild
			? isDark
				? "1px solid rgba(255,255,255,0.3)"
				: "1px solid rgba(0,0,0,0.2)"
			: "0"};
	cursor: pointer;
	@media (hover: hover) {
		:hover {
			opacity: 0.7;
		}
	}
`;

const ColorPicker = () => {
	const [pick, setPick] = useState<boolean>(false);
	const iconRef = useRef<HTMLDivElement>(null);
	const pickRef = useRef<HTMLDivElement>(null);
	const { theme } = useContext(ThemeContext);
	const { listItem, setListItem } = useContext(ItemContext);

	useEffect(() => {
		const clickOutside = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			if (
				pick &&
				pickRef.current &&
				!iconRef.current?.contains(target) &&
				!pickRef.current.contains(target)
			)
				setPick(false);
		};
		document.addEventListener("click", clickOutside);
		return () => {
			document.removeEventListener("click", clickOutside);
		};
	}, [pick]);

	const clickColor = (e: React.MouseEvent) => {
		const target = e.target as HTMLDivElement;
		const id = target.dataset.id;
		if (!id) return;
		setListItem((prevState) => ({ ...prevState, color: id }));
	};

	return (
		<Wrapper ref={iconRef}>
			<Btn>
				<PickerIcon onClick={() => setPick(!pick)} />
			</Btn>
			{pick ? (
				<Picker
					isDark={theme.isDark}
					theme={theme}
					onClick={clickColor}
					ref={pickRef}
				>
					{colors.map((_, index) => {
						const id = `clr-${index}`;
						return (
							<div key={index}>
								<input
									id={id}
									type="radio"
									name="color"
									defaultChecked={+listItem.color === index ? true : false}
								/>
								<Label
									isDark={theme.isDark}
									firstChild={!index}
									data-id={index}
									className={"color-label " + id}
									htmlFor={id}
								/>
							</div>
						);
					})}
				</Picker>
			) : null}
		</Wrapper>
	);
};

export default ColorPicker;
