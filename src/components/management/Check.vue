<template>
  <div class="queue container" v-if="reversedItems.length > 0">
    <h2 class="queue-title">Очередь на проверку</h2>
    <div class="queue__items">
      <div class="queue__item" v-for="item in reversedItems" :key="item.id">
        <div class="info">
          <h3 class="queue-number">{{ item.number }}</h3>
          <p>{{ formatCreatedAt(item.created_at) }}</p>
        </div>
        <button class="delete" type="button" @click="deleteItem(item.id)">
          Снять с очереди
        </button>
      </div>
    </div>
  </div>
  <div class="queue container" v-else>
    <h2 class="queue-title">Очередь на проверку</h2>
    <div class="empty">
      пусто
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from "vue";
import { useStore } from "vuex";
import { format } from "date-fns";

const formatCreatedAt = (date) => {
  return format(new Date(date), "dd.MM.yyyy HH:mm:ss");
};

const store = useStore();
const items = ref([]);

const fetchItems = async () => {
	await store.dispatch("check/fetchItems");
	items.value = store.getters["check/getItems"];
};

onMounted(fetchItems);

const deleteItem = async (itemId) => {
	console.log("Deleting item with itemId:", itemId);
	await store.dispatch("check/deleteItem", itemId);
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
	margin-bottom: 4rem;
	.empty{
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 100px 60px;
		background-color: #f2f2f2;
		border-radius: 4px;
		color: #ccc;
		font-size: 18px;
	}
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
			border: 1px dashed #ccc;
			border-radius: 4px 4px 0 0;
			background: #a2f76a4d !important;
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
	&-number{
		font-size: 30px;
		line-height: 30px;
	}
	.info {
		display: flex;
		justify-content: flex-start;
		align-items: flex-end;
		gap: 20px;
	}
}
</style>
