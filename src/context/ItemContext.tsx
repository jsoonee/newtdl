import React, { useState, createContext } from "react";
import { IList } from "./ListContext";

interface IState {
	listItem: IList;
	setListItem: React.Dispatch<React.SetStateAction<IList>>;
}

const initialState: IList = {
	id: 0,
	done: false,
	task: "",
	color: "0",
	star: false,
	time: false,
};

const ItemContext = createContext<IState>({
	listItem: initialState,
	setListItem: () => null,
});

const ItemProvider = ({ children }: { children: React.ReactNode }) => {
	const [listItem, setListItem] = useState<IList>(initialState);
	return (
		<ItemContext.Provider value={{ listItem, setListItem }}>
			{children}
		</ItemContext.Provider>
	);
};

export { initialState, ItemContext, ItemProvider };
