import People from "@/store/modules/people/models/people";
import Search from "@/store/modules/people/models/search";

export default class PeoplesStateModel {
	isLoading: boolean;
	count: number;
	next: string | null;
	previous: string | null;
	peoples: People[];
	search: Search;
	favorites: string[]

	constructor({
		            isLoading = false,
		            peoples = [],
		            count = 0,
		            next = null,
		            previous = null,
		            search = new Search(
		            	"",
			            false,
			            []
		            ),
		            favorites = []
	})
	{
		this.isLoading = isLoading;
		this.peoples = peoples;
		this.count = count;
		this.next = next;
		this.previous = previous;
		this.search = search;
		this.favorites = favorites;
	}
}
