"use client";

import { produce } from "immer";
import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useState
} from "react";
import { FormElementInstance } from "../FormElements";

type DesignerContextType = {
	elements: FormElementInstance[];
	setElements: Dispatch<SetStateAction<FormElementInstance[]>>;
	addElement: (index: number, element: FormElementInstance) => void;
	removeElement: (id: string) => void;

	selectedElement: FormElementInstance | null;
	setSelectedElement: Dispatch<SetStateAction<FormElementInstance | null>>;

	updateElement: (id: string, element: FormElementInstance) => void;
};

export const DesignerContext = createContext<DesignerContextType | null>(null);

export default function DesignerContextProvider({
	children
}: {
	children: ReactNode;
}) {
	const [elements, setElements] = useState<FormElementInstance[]>([]);
	const [selectedElement, setSelectedElement] =
		useState<FormElementInstance | null>(null);

	const addElement = (index: number, element: FormElementInstance) => {
		setElements(
			produce((draft) => {
				draft.splice(index, 0, element);
			})
		);
	};

	const removeElement = (id: string) => {
		setElements(
			produce((draft) => {
				const idx = draft.findIndex((element) => element.id === id);
				if (idx > -1) draft.splice(idx, 1);
			})
		);
	};

	const updateElement = (id: string, element: FormElementInstance) => {
		setElements(
			produce((draft) => {
				const idx = draft.findIndex((ele) => ele.id === id);
				if (idx > -1) draft[idx] = element;
			})
		);
	};

	return (
		<DesignerContext.Provider
			value={{
				elements,
				setElements,
				addElement,
				removeElement,

				selectedElement,
				setSelectedElement,

				updateElement
			}}
		>
			{children}
		</DesignerContext.Provider>
	);
}
