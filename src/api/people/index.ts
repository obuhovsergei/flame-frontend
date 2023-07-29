import ApiPeopleStateModel from "@/api/types/people/ApiPeopleStateModel";
import urls, {urlTemplateParts} from "@/api/config/urls";
import BaseController from "@/api/shared/baseController";
import {prepareUrl} from "@/utils/query";
import ApiPersonStateModel from "@/api/types/people/ApiPersonStateModel";

export class PeopleController extends BaseController {
	getPeoplesList = async (): Promise<ApiPeopleStateModel | null> => {
		try {
			let data = await this.client.get<object>(prepareUrl(urls.people.list.get));
			return new ApiPeopleStateModel(data);
		} catch (e) {
			throw e;
		}
	}

	getPerson = async (id: string): Promise<ApiPersonStateModel | null> => {
		try {
			let data = await this.client.get<object>(urls.people.list.getById.replace(urlTemplateParts.id, id));
			return new ApiPersonStateModel(data);
		} catch (e) {
			throw e;
		}
	}

	getPeoplesListBySearch = async (search: string): Promise<ApiPeopleStateModel | null> => {
		try {
			let data = await this.client.get<object>(prepareUrl(urls.people.list.get, {
				search
			}));
			return new ApiPeopleStateModel(data);
		} catch (e) {
			throw e;
		}
	}
}
