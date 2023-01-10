import React, { createContext, useState, useEffect } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { lightTheme, darkTheme, Theme } from "theme/theme";

// export interface IDarkState {
// 	isDark: IDarkInfo;
// 	setIsDark: React.Dispatch<React.SetStateAction<IDarkInfo>>;
// }

interface IContext {
	theme: Theme;
	toggleTheme: () => void;
}

const getTheme = () => {
	const theme = window.localStorage.getItem("theme");
	if (theme) return JSON.parse(theme);
	return false;
};

const setTheme = (theme: string | boolean) => {
	window.localStorage.setItem("theme", JSON.stringify(theme));
};

const useDarkMode = () => {
	// const [theme, setTheme] = useState<Theme>(
	// 	window.matchMedia("(prefers-color-scheme: dark)").matches
	// 		? darkTheme
	// 		: lightTheme
	// );
	const initialState = getTheme()
		? {
				theme: getTheme() === "dark" ? darkTheme : lightTheme,
				userClick: true,
		  }
		: {
				theme: window.matchMedia("(prefers-color-scheme: dark)").matches
					? darkTheme
					: lightTheme,
				userClick: false,
		  };
	const [themeInfo, setThemeInfo] = useState<{
		theme: Theme;
		userClick: string | boolean;
	}>(initialState);

	// useLayoutEffect(() => {
	// 	if (getTheme()) {
	// 		setThemeInfo(
	// 			getTheme() === "light"
	// 				? { theme: lightTheme, userClick: "light" }
	// 				: { theme: darkTheme, userClick: "dark" }
	// 		);
	// 	} else {
	// 		const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
	// 		setThemeInfo({
	// 			theme: isDark ? darkTheme : lightTheme,
	// 			userClick: false,
	// 		});
	// 	}
	// }, []);

	const toggleTheme = () => {
		if (themeInfo.theme === lightTheme) {
			setTheme("dark");
			setThemeInfo({ theme: darkTheme, userClick: "dark" });
		} else {
			setTheme("light");
			setThemeInfo({ theme: lightTheme, userClick: "light" });
		}
	};

	return { theme: themeInfo.theme, toggleTheme };
};

const ThemeContext = createContext<IContext>({
	theme: lightTheme,
	toggleTheme: () => null,
});

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const { theme, toggleTheme } = useDarkMode();
	const setScreenSize = () => {
		const vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty("--vh", `${vh}px`);
	};
	useEffect(() => setScreenSize, []);
	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			<StyledThemeProvider theme={theme.isDark ? darkTheme : lightTheme}>
				{children}
			</StyledThemeProvider>
		</ThemeContext.Provider>
	);
};

export { useDarkMode, ThemeContext, ThemeProvider };
