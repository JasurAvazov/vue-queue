<template>
	<div class="items">
		<div class="card" v-for="(card, index) in cards" :key="index">
			<h2 class="card-title">{{ card.title }}</h2>
			<p class="card-description">{{ card.description }}</p>
			<button class="card-btn" @click="addToQueue(card)">Взять очередь</button>
		</div>
	</div>
</template>

<script>
import { useStore } from "vuex";

export default {
	data() {
		return {
			cards: [
				{
					title: "Загранпаспорт",
					description: "Улети отсюда",
				},
				{
					title: "Стать президентом",
					description: "Стать президентом за один клик. бесплатно",
				},
				{
					title: "Проверка",
					description: "Проверка на наличие болезней",
				},
			],
		};
	},
	methods: {
		addToQueue(card) {
			this.$store.dispatch("queue/addItem");
		},
	},
};
</script>

<style lang="scss" scoped>
.items {
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-content: flex-start;
	gap: 15px;
}
.card {
	width: calc(100% / 3 - 10px);
	padding: 1.5rem;
	border: 1px dashed #ccc;
	border-radius: 4px;
	&-title {
		font-size: 20px;
		margin-bottom: 0.8rem;
	}
	&-description {
		font-size: 16px;
		margin-bottom: 2rem;
	}
	&-btn {
		padding: 10px 15px;
		font-size: 16px;
		font-weight: 500;
		background-color: #156d24;
		color: white;
		border: none;
		border-radius: 4px;
		outline: none;
	}
}
</style>
