export const lightTheme = {
	isDark: false,
	fontColor: "#000",
	fontSub: "#5c5c5c",
	bgMain: "#eaeaea",
	bgSub: "#fff",
	bgThird: "#fff",
	check: "#5c5c5c",
};

export const darkTheme = {
	isDark: true,
	fontColor: "#fff",
	fontSub: "#bebebe",
	bgMain: "#111",
	bgSub: "#2a2a2a",
	bgThird: "#203040",
	check: "#8e8e8e",
};

export type Theme = typeof lightTheme;
