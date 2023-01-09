import { useState, useEffect } from "react";
import styled from "styled-components";

import ThemeToggle from "./ThemeToggle";
// import { ReactComponent as Signal } from "assets/signal.svg";
// import { ReactComponent as Wifi } from "assets/wifi.svg";
// import { ReactComponent as Battery } from "assets/battery.svg";

const Wrapper = styled.div`
	position: relative;
`;

// const Notch = styled.div`
// 	display: flex;
// 	justify-content: center;
// 	align-items: center;
// 	position: absolute;
// 	width: 46%;
// 	height: 36px;
// 	left: 50%;
// 	transform: translate(-50%);
// 	background: #222;
// 	color: #fff;
// 	border-bottom-left-radius: 30px;
// 	border-bottom-right-radius: 30px;
// `;

// const Top = styled.div`
// 	width: 100%;
// 	display: flex;
// 	justify-content: space-between;
// `;

// const Time = styled.div`
// 	padding: 2% 10%;
// 	font-weight: 700;
// 	font-size: 1.2rem;
// `;

// const Icons = styled.div<{ color: string }>`
// 	display: flex;
// 	align-items: center;
// 	padding: 2% 7%;
// 	* {
// 		padding: 0 0.2rem;
// 	}
// 	svg {
// 		height: 16px;
// 	}
// 	* {
// 		fill: ${({ color }) => color};
// 	}
// 	.wifi-arc {
// 		stroke: ${({ color }) => color};
// 	}
// `;

const Upper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 2rem 8%;
`;

const Today = styled.div`
	font-weight: 700;
	font-size: 1.5rem;
`;

const Header = () => {
	const [current, setCurrent] = useState<IDate>({ date: "", time: "" });

	interface IDate {
		date: string;
		time: string;
	}

	const getDate = () => {
		const now = new Date();
		const week = ["일", "월", "화", "수", "목", "금", "토"];
		const date = `
	    ${now.getMonth() + 1}월
	    ${now.getDate()}일
	    (${week[now.getDay()]})
	  `;
		const hour = now.getHours();
		const minute = now.getMinutes();
		const time = `${hour > 12 ? hour - 12 : hour}:${
			minute < 10 ? "0" + minute : minute
		}`;
		setCurrent({ date: date, time: time });
	};

	useEffect(() => {
		getDate();
		let updateDate: ReturnType<typeof setInterval>;
		const secRemaining = (61 - new Date().getSeconds()) * 1000;
		setTimeout(() => {
			updateDate = setInterval(getDate, 60000);
		}, secRemaining);
		return () => clearInterval(updateDate);
	}, []);

	return (
		<Wrapper>
			{/* <Notch>
				<a href="./">오늘 할 일은?</a>
			</Notch>
			<Top>
				<Time>{current.time}</Time>
				<Icons color={theme.fontColor}>
					<Signal />
					<Wifi />
					<Battery />
				</Icons>
			</Top> */}
			<Upper>
				<Today>{current.date}</Today>
				<ThemeToggle />
			</Upper>
		</Wrapper>
	);
};

export default Header;
