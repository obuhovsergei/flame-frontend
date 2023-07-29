<template>
	<v-container>
		<v-row class="mb-10">
			<v-col cols="10" offset="1" class="d-flex justify-end">
				<v-breadcrumbs :items="breadcrumbs"
							   divider="/"/>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="10" offset="1">
				<v-data-table :headers="headers"
							  :items="peoples"
							  :loading="isLoading"
							  :loading-text="'Loading data...'"
							  item-value="name"
							  class="elevation-1">
					<template v-slot:top>
						<v-row class="d-flex align-center">
							<v-col cols="12" md="6">
								<h4 class="ml-4">People List</h4>
							</v-col>
							<v-col cols="12" md="6">
								<v-autocomplete class="ma-4 flex-full-width"
												:item-value="searchQuery"
												hide-details
												@keydown.enter.native.prevent="setSearch"
												:loading="searchIsLoading"
												item-title="name"
												@update:modelValue="handleItemSelect"
												item-value="name"
												item-key="url"
												rounded
												menu-icon=""
												placeholder="Search..."
												append-inner-icon="mdi-magnify"
												:items="searchItems"
												variant="outlined"
								></v-autocomplete>
							</v-col>
						</v-row>
					</template>
					<template v-slot:item.actions="{ item }">
						<v-btn variant="text" size="small"
							   v-if="setIsShowAddFav(item.value)"
							   :loading="isLoading"
							   @click="addItem(item)">
							<v-icon>
								mdi-plus
							</v-icon>
							<v-tooltip activator="parent"
									   location="bottom">
								Add in favorites
							</v-tooltip>
						</v-btn>
						<v-btn variant="text" size="small"
							   v-if="setIsShowRemoveFav(item.value)"
							   :loading="isLoading"
							   @click="deleteItem(item)">
							<v-icon>
								mdi-delete
							</v-icon>
							<v-tooltip activator="parent"
									   location="bottom">
								Remove from favorites
							</v-tooltip>
						</v-btn>
						<v-btn variant="text" size="small"
							   :loading="isLoading"
							   @click="handleItemSelect(item.value, true)">
							<v-icon>
								mdi-eye
							</v-icon>
						</v-btn>
					</template>
					<template v-slot:no-data>
						<v-btn @click="initializeStore">
							Reload
						</v-btn>
					</template>
				</v-data-table>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import router from "@/router";
import { RouteNames } from "@/router/routes";
import { actionTypes, mutationTypes, namespace } from "@/store/modules/people/types";
import { createNamespacedHelpers } from "vuex";

const { mapState, mapActions } = createNamespacedHelpers(namespace);

export default {
	data() {
		return {
			headers: [
				{
					title: "Name",
					key: "name"
				},
				{
					title: "Height",
					key: "height"
				},
				{
					title: "Mass",
					key: "mass"
				},
				{
					title: "Hair color",
					key: "hair_color"
				},
				{
					title: "Add Favorite / Remove favorite",
					width: "20%",
					align: "end",
					sortable: false,
					key: "actions"
				}
			],
			breadcrumbs: [
				{
					title: 'Home',
					disabled: false,
					to: { name: RouteNames.HOME }
				},
				{
					title: 'Peoples',
					disabled: true
				}
			]
		};
	},
	computed: {
		...mapState({
			isLoading: state => state.isLoading,
			peoples: state => state.peoples,
			searchQuery: state => state.search?.query,
			searchItems: state => state.search?.items,
			searchIsLoading: state => state.search?.isLoading,
			favorites: state => state.favorites
		})
	},
	methods: {
		...mapActions({
			initializeStore: actionTypes.initialize,
			destroyStore: actionTypes.destroy,
			updateSearch: actionTypes.updateSearch,
			updateFavorites: actionTypes.updateFavorites,
			deleteFavorite: actionTypes.deleteFavorite
		}),
		setIsShowAddFav(name) {
			return !this.favorites.find(x => x === name);
		},
		setIsShowRemoveFav(name) {
			return !!this.favorites.find(x => x === name);
		},
		setSearch(e) {
			if(e.target.value) this.updateSearch(e.target.value);
		},
		addItem({ value }) {
			if(value) this.updateFavorites(value);
		},
		deleteItem({ value }) {
			if(value) this.deleteFavorite(value);
		},
		handleItemSelect(item, isHandle) {
			if(item) {
				const items = isHandle ? this.peoples : this.searchItems;
				const url = items.find(x => x.name === item).url.split("/");
				const id = url[url.length - 2];
				if(id)
					router.push({ name: RouteNames.PEOPLES_DETAIL, params: { id } });
			}
		}
	},
	async created() {
		await this.initializeStore();
	},
	beforeUnmount() {
		this.destroyStore();
	}
};
</script>
