<!-- <template>
  <div class="login">
    <h2>Вход в систему</h2>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email">
      <input v-model="password" type="password" placeholder="Password">
      <button type="submit">Войти</button>
    </form>
  </div>
</template>

<script>
import { auth } from '../firebase';

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        await auth.signInWithEmailAndPassword(this.email, this.password);
        this.$router.push('/management');
      } catch (error) {
        console.error('Ошибка при входе:', error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>

</style> -->