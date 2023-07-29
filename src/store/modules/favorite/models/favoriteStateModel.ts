import People from "@/store/modules/people/models/people";

export default class FavoriteStateModel {
	isLoading: boolean;
	favorites: People[];

	constructor({
		            isLoading = false,
		            favorites = []
	})
	{
		this.isLoading = isLoading;
		this.favorites = favorites;
	}
}
