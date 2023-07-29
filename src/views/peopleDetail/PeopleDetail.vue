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
							  :items="items"
							  :loading="isLoading"
							  items-per-page="100"
							  :loading-text="'Loading data ...'"
							  item-value="name"
							  class="elevation-1">
					<template v-slot:top>
						<v-row class="d-flex align-center">
							<v-col cols="12" md="6">
								<h4 class="ml-4">Person</h4>
							</v-col>
							<v-col cols="12" md="6" class="d-flex justify-end align-center">
								<v-btn class="text-white text-none"
									   :disabled="!isShowAddFavorite"
									   color="blue-darken-4"
									   @click="addItem"
									   :loading="isLoading"
									   variant="flat">
									Add favorite
								</v-btn>
								<v-btn class="text-white text-none ml-4"
										color="blue-darken-4"
									   @click="deleteItem"
									   :loading="isLoading"
									   :disabled="!isShowRemoveFavorite"
										variant="flat">
									Remove favorite
								</v-btn>
							</v-col>
						</v-row>
					</template>
					<template v-slot:item.value="{ item }">
						<v-list lines="one" v-if="Array.isArray(item.raw.value)">
							<v-list-item class="pl-0" v-for="(item, key) in item.raw.value"
										 :key="`${item}_${key}`"
										 :title="item"/>
						</v-list>
						<p v-else>{{ item.raw.value }}</p>
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
import { RouteNames } from "@/router/routes";
import { getterTypes, actionTypes, mutationTypes, namespace } from "@/store/modules/peopleDetails/types";
import { createNamespacedHelpers } from "vuex";

const { mapState, mapGetters, mapActions, mapMutations } = createNamespacedHelpers(namespace);

export default {
	data() {
		return {
			headers: [
				{
					title: "Name",
					key: "key"
				},
				{
					title: "Value",
					key: "value"
				}
			],
			breadcrumbs: [
				{
					title: "Home",
					disabled: false,
					to: { name: RouteNames.HOME }
				},
				{
					title: "Peoples",
					disabled: false,
					to: { name: RouteNames.PEOPLES_LIST }
				},
				{
					title: "Person",
					disabled: true
				}
			]
		};
	},
	computed: {
		...mapState({
			isLoading: state => state.isLoading,
			isShowRemoveFavorite: state => state.isShowRemoveFavorite,
			isShowAddFavorite: state => state.isShowAddFavorite,
			favorites: state => state.favorites
		}),
		...mapGetters({
			items: getterTypes.formattedItems
		})
	},
	methods: {
		...mapActions({
			initializeStore: actionTypes.initialize,
			destroyStore: actionTypes.destroy,
			updateFavorites: actionTypes.updateFavorites,
			deleteFavorite: actionTypes.deleteFavorite
		}),
		addItem() {
			this.updateFavorites();
		},
		deleteItem() {
			this.deleteFavorite();
		}
	},
	async created() {
		await this.initializeStore(this.$route.params);
	},
	beforeUnmount() {
		this.destroyStore();
	}
};
</script>
