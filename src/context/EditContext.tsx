import React, { useState, createContext, useContext } from "react";
import { ListContext } from "./ListContext";

interface IState {
	openEdit: number;
	setOpenEdit: React.Dispatch<React.SetStateAction<number>>;
}

// const getEdit = () => {
// 	const edit = window.localStorage.getItem("edit");
// 	if (edit) return JSON.parse(edit);
// 	return true;
// };

// const setEdit = (edit: number | boolean) => {
// 	window.localStorage.setItem(
// 		"edit",
// 		JSON.stringify(edit === false ? false : true)
// 	);
// };

const EditContext = createContext<IState>({
	openEdit: -1,
	setOpenEdit: () => null,
});

const EditProvider = ({ children }: { children: React.ReactNode }) => {
	const { list } = useContext(ListContext);
	const [openEdit, setOpenEdit] = useState<number>(list.length ? 0 : -1);

	return (
		<EditContext.Provider value={{ openEdit, setOpenEdit }}>
			{children}
		</EditContext.Provider>
	);
};

export { EditContext, EditProvider };
