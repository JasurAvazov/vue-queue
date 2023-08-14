<template>
	<div class="queue container">
		<h2 class="queue-title">Очередь</h2>
		<div class="queue__items">
			<div class="queue__item" v-for="item in reversedItems" :key="item.id">
                <div class="info">
				    <h3>{{ item.number }}</h3>
                    <p>{{ item.created_at }}</p>
                    <p>{{ item.branch }}</p>
                </div>
                <button class="delete" type="button" @click="deleteItem(item.id)">Удалить</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from "vue";
import { useStore } from "vuex";

const store = useStore();
const items = ref([]);

const fetchItems = async () => {
	await store.dispatch("queue/fetchItems");
	items.value = store.getters["queue/getItems"];
};

onMounted(fetchItems);

const deleteItem = async (itemId) => {
    console.log("Deleting item with itemId:", itemId);
	await store.dispatch("queue/deleteItem", itemId);
	await fetchItems();
};

const reversedItems = ref([]);

watchEffect(() => {
	fetchItems();
	reversedItems.value = items.value.slice().reverse();
});
</script>

<style lang="scss" scoped>
.queue {
	&__items {
		display: flex;
		flex-direction: column;
		align-content: center;
		justify-content: center;
		overflow: hidden;
		border-radius: 4px;
	}
	&__item {
		width: 100%;
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20px 20px;
		border: 1px dashed #ccc;
		border-bottom: 0;
		border-top: 0;
		&:last-child {
			border-bottom: 1px dashed #ccc;
			border-radius: 0 0 4px 4px;
		}
		&:first-child {
			border-top: 1px dashed #ccc;
			border-radius: 4px 4px 0 0;
		}
		&:nth-child(2n + 1) {
			background-color: #a5694711;
		}
	}
	&-title {
		font-size: 22px;
		text-align: center;
		margin-bottom: 2rem;
	}
	.delete {
		padding: 10px 15px;
		background-color: rgb(165, 0, 0);
		border-radius: 4px;
		color: white;
	}
    .info{
        display: flex;
        justify-content: flex-start;
        align-content: center;
        gap: 40px;
    }
}
</style>
