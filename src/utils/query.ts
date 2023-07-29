import { stringify } from "qs";
import { omitBy, isNil } from "lodash";

export const prepareUrlQuery = (obj: object) => {
	if(!obj) return "";

	let processedObject = omitBy(obj, isNil);

	let query = stringify(processedObject);

	return query ? `?${query}` : query;
};

export const prepareUrl = (path: string, params?: object) => {
	return params ? `${path}${prepareUrlQuery(params)}` : path;
};
