import axios from "axios";
import { getHeaders } from "@/api/config/headers";

export class Client {
	async get<T>(url: string, options?: object): Promise<T> {
		try {
			const dateBeforeRequest = Date.now();
			console.log("Запрос", url);

			let { data } = await axios.get(`${url}`, {
				headers: getHeaders(),
				...options
			});

			console.log(`Запрос: ${url}, time: ${Date.now() - dateBeforeRequest}ms`, data);

			return data;
		} catch (error) {
			throw (error)
		}
	}
}
