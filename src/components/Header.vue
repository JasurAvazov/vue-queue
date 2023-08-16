<template>
	<header class="header">
		<div class="container">
			<router-link class="header-logo" to="/">
				<img src="../assets/logo.svg" alt="" />
			</router-link>
			<nav>
				<router-link to="/">Главная</router-link>
				<template v-if="loggedIn">
					<router-link to="/management">Режим менеджера</router-link>
				</template>
				<template v-else>
					<button class="header-register" @click="openLoginModal">Войти</button>
				</template>
			</nav>
		</div>
	</header>
	<LoginModal v-if="showLoginModal" @close="closeLoginModal" />
</template>

<script>
import { mapState } from "vuex";

export default {
	computed: {
		...mapState("log", ["loggedIn"]),
	},
	data() {
		return {
			showLoginModal: false,
		};
	},
	methods: {
		openLoginModal() {
			this.showLoginModal = true;
		},
		closeLoginModal() {
			this.showLoginModal = false;
		},
	},
};
</script>

<style lang="scss" scoped>
.header {
	background-color: #a5694775;
	.container {
		padding: 20px 15px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	&-register {
		color: #a56947;
		background-color: white;
		padding: 10px;
		border-radius: 4px;
        font-size: 16px;
	}
	&-logo {
		font-size: 22px;
		font-weight: 500;
		img {
			max-width: 140px;
		}
	}
	nav {
		height: min-content;
		display: flex;
		align-content: center;
		justify-content: flex-start;
		gap: 20px;
		a {
			color: #a56947;
			background-color: white;
			padding: 10px;
			border-radius: 4px;
            font-size: 16px;
		}
	}
	margin-bottom: 2rem;
}
</style>
