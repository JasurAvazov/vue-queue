<script setup>
import { db } from "../firebase.js";
import { getDocs, collection } from "firebase/firestore";
import { ref, onMounted } from "vue";

const items = ref ([])

onMounted(async () => {
	let queueC = await getDocs(collection(db, "queue"));
  queueC.forEach((el) => {
    items.value.push({...el.data(), id: el.id})
  });
});
</script> 

<template>
	<div class="management">
    <div v-for="item in items" :key="item.id">
      <h3>{{ item.title }}</h3>
      <p>{{ item.description }}</p>
    </div>
  </div>
</template>
