import People from "@/store/modules/people/models/people";

export default class PersonStateModel {
	isLoading: boolean;
	person: People;
	favorites: string[];
	isShowAddFavorite: boolean;
	isShowRemoveFavorite: boolean;

	constructor({
		            isLoading = false,
		            person = new People(),
		            favorites = [],
		            isShowAddFavorite = false,
		            isShowRemoveFavorite = false
	})
	{
		this.isLoading = isLoading;
		this.person = person;
		this.favorites = favorites;
		this.isShowAddFavorite = isShowAddFavorite;
		this.isShowRemoveFavorite = isShowRemoveFavorite;
	}
}
