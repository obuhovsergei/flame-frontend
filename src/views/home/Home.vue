<template>
	<v-container class="fill-height">
		<v-row class="d-flex align-baseline">
			<v-col cols="12" md="4" offset-md="1">
				<v-card title="Peoples"
						:to="{ name: RouteNames.PEOPLES }"
						text="This link to /peoples"/>
			</v-col>
			<v-col cols="12" md="4" offset-md="1">
				<v-card title="Favorites"
						:to="{ name: RouteNames.FAVORITES }"
						text="This link to /favorites"/>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { RouteNames } from "@/router/routes"
export default {
	data() {
		return {
			RouteNames
		}
	}
};
</script>