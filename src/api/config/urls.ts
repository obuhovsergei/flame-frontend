const baseUrl = "https://swapi.dev/api";

export const urlTemplateParts = {
	id: "{id}"
};

const urls = {
	people: {
		list: {
			get: `${baseUrl}/people`,
			getById: `${baseUrl}/people/${urlTemplateParts.id}`
		}
	}
};

export default urls;
