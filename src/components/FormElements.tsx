import React from "react";
import TextField from "./fields/TextField";
import { TitleField } from "./fields/TitleField";
import { SubTitleField } from "./fields/SubTitleField";
import { ParagprahField } from "./fields/ParagraphField";
import { SeparatorField } from "./fields/SeparatorField";
import { SpacerField } from "./fields/SpacerField";
import { NumberField } from "./fields/NumberField";
import { TextArea } from "./fields/TextAreaField";
import { DateField } from "./fields/DateField";
import { SelectField } from "./fields/SelectField";
import { CheckboxField } from "./fields/CheckboxField";

export type ElementsType =
	| "TextField"
	| "TitleField"
	| "SubTitleField"
	| "ParagraphField"
	| "SeparatorField"
	| "SpacerField"
	| "NumberField"
	| "TextAreaField"
	| "DateField"
	| "SelectField"
	| "CheckboxField";

export type FormElementInstance = {
	id: string;
	type: ElementsType;
	extraAttributes?: Record<string, any>;
};

export type SubmitFunction = (key: string, value: string) => void;

export type FormElement = {
	type: ElementsType;

	construct: (id: string) => FormElementInstance;

	designerBtnElement: {
		icon: React.ElementType;
		label: string;
	};

	designerComponent: React.FC<{
		elementInstance: FormElementInstance;
	}>;
	formComponent: React.FC<{
		elementInstance: FormElementInstance;
		submitValue?: SubmitFunction;
		isInvalid?: boolean;
		defaultValue?: string;
	}>;
	propertiesComponent: React.FC<{
		elementInstance: FormElementInstance;
	}>;

	validate: (
		formElement: FormElementInstance,
		currentValue: string
	) => boolean;
};

type FormElementsType = {
	[key in ElementsType]: FormElement;
};

export const FormElements: FormElementsType = {
	TextField: TextField,
	TitleField: TitleField,
	SubTitleField: SubTitleField,
	ParagraphField: ParagprahField,
	SeparatorField: SeparatorField,
	SpacerField: SpacerField,
	NumberField: NumberField,
	TextAreaField: TextArea,
	DateField: DateField,
	SelectField: SelectField,
	CheckboxField: CheckboxField
};
