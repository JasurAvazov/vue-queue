<template>
  <div class="modal">
    <div class="modal-bg" @click="closeModal"></div>
    <div class="modal-content" v-if="loaded">
      <h2 class="modal-title">Ваш номер:</h2>
      <p class="modal-number" v-if="newItemNumber !== undefined">
        {{ newItemNumber }}
      </p>
      <button @click="closeModal">Закрыть</button>
    </div>
    <div class="modal-loader" v-else>
      Идет загрузка, подождите
    </div>
  </div>
</template>

<script>
export default {
	props: {
    newItemNumber: Number,
    loaded: Boolean,
  },
	methods: {
		closeModal() {
			this.$emit("close");
		},
	},
};
</script>

<style lang="scss" scoped>
.modal {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
  &-loader{
		background-color: white;
		width: 400px;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
		border-radius: 5px;
		text-align: center;
    position: relative;
  }
  &-bg{
	  background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    position: absolute;
  }
	&-title {
    margin-bottom: 2rem;
	}
	&-content {
		background-color: white;
		width: 400px;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
		border-radius: 5px;
		text-align: center;
    position: relative;
	}
  &-number{
    font-size: 60px;
    font-weight: 600;
    margin-bottom: 2rem;
  }
}
button {
	padding: 10px 15px;
	background-color: #156d24;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
}
</style>
