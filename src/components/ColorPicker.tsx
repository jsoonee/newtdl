import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import { ReactComponent as PickerIcon } from "assets/picker.svg";

export const colors = [
	"#fff",
	"#ee88cc",
	"#ffee99",
	"#55aa77",
	"#ff9955",
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
	display: flex;
	align-items: center;
`;

const Picker = styled.div`
	position: absolute;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	top: 4rem;
	background: #d2d2d2;
	padding: 1rem;
	border-radius: 15px;
	input[type="radio"] {
		display: none;
	}
	input[type="radio"]:checked + .color-label {
		border: 3px solid rgba(0, 0, 0, 0.3);
	}
	${colors.map(
		(_, index) => `
    .clr-${index} {
      background: ${colors[index]}
    }
    `
	)}
`;

const Label = styled.label`
	display: inline-block;
	width: 30px;
	height: 30px;
	border-radius: 50%;
	margin: 10px;
	cursor: pointer;
`;

const ColorPicker = ({ setListItem }: any) => {
	const [pick, setPick] = useState<boolean>(false);
	const iconRef = useRef<HTMLDivElement>(null);
	const pickRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const clickOutside = (e: any) => {
			if (
				pick &&
				pickRef.current &&
				!iconRef.current?.contains(e.target) &&
				!pickRef.current.contains(e.target)
			)
				setPick(false);
		};
		document.addEventListener("click", clickOutside);
		return () => {
			document.removeEventListener("click", clickOutside);
		};
	}, [pick]);

	const clickColor = (e: any) => {
		const id = e.target.dataset.id;
		if (!id) return;
		setListItem((prevState: any) => ({ ...prevState, color: id }));
	};

	return (
		<Wrapper ref={iconRef}>
			<PickerIcon onClick={() => setPick(!pick)} />
			{pick ? (
				<Picker onClick={(e) => clickColor(e)} ref={pickRef}>
					{colors.map((_, index) => {
						const id = `clr-${index}`;
						return (
							<div key={index}>
								<input
									id={id}
									type="radio"
									name="color"
									defaultChecked={!index}
								/>
								<Label
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
