<template>
	<v-app>
		<v-main>
			<v-container class="pa-6 white flex-nowrap darken-2 align-start flex-column justify-start" style="height: 100vh;"
						 fill-height>
				<router-view :key="$route.meta.key || $route.name"/>
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
export default {
	data() {
		return {
			drawer: null
		};
	},
	components: {}
};
</script>
