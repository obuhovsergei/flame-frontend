import People from "@/store/modules/people/models/people";

export default class Search {
	query: string;
	isLoading: boolean;
	items: People[];

	constructor(
		query: string = "",
		isLoading: boolean = false,
		items: [] = []
	)
	{
		this.query = query;
		this.isLoading = isLoading;
		this.items = items;
	}
}
