import React, { useReducer, createContext, Dispatch } from "react";

export interface IList {
	id: number;
	done: boolean;
	task: string;
	color: string;
	star: boolean;
	time: false | string;
}

interface IAction {
	type: string;
	id?: number;
	item?: IList;
	from?: number;
	to?: number;
}

interface IReducer {
	list: IList[];
	dispatch: Dispatch<IAction>;
}

const getList = () => {
	const list = window.localStorage.getItem("list");
	if (list) return JSON.parse(list);
	return [];
};

const setList = (list: IList[]) => {
	window.localStorage.setItem("list", JSON.stringify(list));
};

const sortList = (list: IList[]) => {
	const sorted = list.sort((a, b) => +b.star - +a.star);
	return sorted.map((item, index) => ({
		...item,
		id: index + 1,
	}));
};

const reducer = (state: IList[], action: IAction): IList[] => {
	switch (action.type) {
		case "CREATE":
			if (action.item) {
				const createdList = sortList([action.item, ...state]);
				setList(createdList);
				return createdList;
			} else {
				return state;
			}
		case "EDIT":
			if (
				action.id &&
				action.item &&
				!state[action.id - 1].star &&
				action.item.star
			) {
				const copied = [...state];
				copied.splice(action.id - 1, 1);
				copied.unshift(action.item);
				const editedList = copied.map((value: IList, index: number) => ({
					...value,
					id: index + 1,
				}));
				setList(editedList);
				return editedList;
			} else {
				const editedList = sortList(
					state.map((value: any) =>
						value.id === action.id ? action.item : value
					)
				);
				setList(editedList);
				return editedList;
			}
		case "DRAG":
			if (typeof action.from === "number" && typeof action.to === "number") {
				const copied = [...state];
				copied.splice(action.from, 1);
				copied.splice(action.to, 0, state[action.from]);
				const newList = copied.map((item, index) => ({
					...item,
					id: index + 1,
				}));
				setList(newList);
				return newList;
			} else {
				return state;
			}
		case "CHECK":
			const checkedList = state.map((value: IList) =>
				value.id === action.id ? { ...value, done: !value.done } : value
			);
			setList(checkedList);
			return checkedList;
		case "STAR":
			if (action.id && !state[action.id - 1].star) {
				const copied = [...state];
				const item = state[action.id - 1];
				copied.splice(action.id - 1, 1);
				copied.unshift({ ...item, star: true });
				const newList = copied.map((value: IList, index: number) => ({
					...value,
					id: index + 1,
				}));
				setList(newList);
				return newList;
			} else {
				const newList = state.map((value: IList) =>
					value.id === action.id ? { ...value, star: !value.star } : value
				);
				const sorted = sortList(newList);
				setList(sorted);
				return sorted;
			}
		case "DELETE":
			const deletedList = state
				.filter((value: IList) => value.id !== action.id)
				.map((el: IList, index: number) => ({ ...el, id: index + 1 }));
			setList(deletedList);
			return deletedList;
		default:
			return state;
	}
};

const ListContext = createContext<IReducer>({ list: [], dispatch: () => null });

const ListProvider = ({ children }: { children: React.ReactNode }) => {
	const [list, dispatch] = useReducer(reducer, getList());
	return (
		<ListContext.Provider value={{ list, dispatch }}>
			{children}
		</ListContext.Provider>
	);
};

export { ListContext, ListProvider };
