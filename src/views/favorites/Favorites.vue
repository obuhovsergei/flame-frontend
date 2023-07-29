<template>
	<v-container>
		<v-row class="mb-10">
			<v-col cols="10" offset="1" class="d-flex justify-end">
				<v-breadcrumbs :items="breadcrumbs"
							   divider="/"/>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="12">
				<v-row>
					<v-col cols="10" offset="1">
						<v-data-table :headers="headers"
									  :items="favorites"
									  :loading="isLoading"
									  :loading-text="'Loading data ...'"
									  item-value="name"
									  class="elevation-1">
							<template v-slot:top>
								<v-row class="d-flex align-center">
									<v-col cols="12" md="6">
										<h4 class="ml-4">Favorites</h4>
									</v-col>
								</v-row>
							</template>
							<template v-slot:item.actions="{ item }">
								<v-btn variant="text" size="small"
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
							</template>
							<template v-slot:no-data>
								Empty data
							</template>
						</v-data-table>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { RouteNames } from "@/router/routes";
import { actionTypes, namespace } from "@/store/modules/favorite/types";
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
					title: "Remove favorite",
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
					title: 'Favorites',
					disabled: true
				}
			]
		};
	},
	computed: {
		...mapState({
			isLoading: state => state.isLoading,
			favorites: state => state.favorites
		})
	},
	methods: {
		...mapActions({
			initializeStore: actionTypes.initialize,
			destroyStore: actionTypes.destroy,
			deleteFavorite: actionTypes.deleteFavorite
		}),
		deleteItem({ value }) {
			if(value) this.deleteFavorite(value)
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
