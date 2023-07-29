import format from "date-fns/format";
import parseISO from "date-fns/parseISO";

export const dateTimeFormat = "HH:mm dd.MM.yy";

export const convertIsoToNumber = (value: any) => {
	if(!value) return value;

	return parseISO(value).getTime();
};

export const formatDate = (date: Date | number, dateFormat: string) => {
	return date && format(date, dateFormat);
};