export default class ApiPeopleStateModel {
	count: number | null
	next: string | null
	previous: string | null
	results: object[]

	constructor({
		            count = 0,
		            next = null,
		            previous = null,
		            results = []
	            }) {
		this.count = count;
		this.next = next;
		this.previous = previous;
		this.results = results;
	}
}
