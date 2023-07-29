import TreeModel from "tree-model";

class Route {
	name: string;
	children: Route[];

	constructor(name: string, children: Route[] = []) {
		this.name = name;
		this.children = children;
	}
}

export enum RouteNames {
	ROOT = "ROOT",
	HOME = "HOME",
	PEOPLES = "PEOPLES",
	PEOPLES_LIST = "PEOPLES_LIST",
	PEOPLES_DETAIL = "PEOPLES_DETAIL",
	FAVORITES = "FAVORITES"
}


const tree = new TreeModel();

export const findRoute = (routeName: string, route = routesThreeRoot) => {
	return route.first(x => x.model.name === routeName);
};


export const routesThreeRoot = tree.parse<Route>(
	new Route(RouteNames.ROOT, [
		new Route(RouteNames.FAVORITES),
		new Route(RouteNames.PEOPLES),
		new Route(RouteNames.PEOPLES, [
			new Route(RouteNames.PEOPLES_DETAIL)
		])
	]));
