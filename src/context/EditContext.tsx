import React, { useState, createContext, useContext } from "react";
import { ListContext } from "./ListContext";

interface IState {
	openEdit: number | boolean;
	setOpenEdit: React.Dispatch<React.SetStateAction<number | boolean>>;
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
	openEdit: true,
	setOpenEdit: () => null,
});

const EditProvider = ({ children }: { children: React.ReactNode }) => {
	const { list } = useContext(ListContext);
	const [openEdit, setOpenEdit] = useState<number | boolean>(
		list.length ? false : true
	);

	return (
		<EditContext.Provider value={{ openEdit, setOpenEdit }}>
			{children}
		</EditContext.Provider>
	);
};

export { EditContext, EditProvider };
