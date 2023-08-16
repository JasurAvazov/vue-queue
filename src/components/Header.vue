<template>
	<header class="header">
		<div class="container">
            <router-link class="header-logo" to="/">
                <img src="../assets/logo.svg" alt="">
            </router-link>
			<nav>
				<router-link to="/">Главная</router-link>
				<router-link to="/management">Режим менеджера</router-link>
			</nav>
		</div>
	</header>
</template>

<style lang="scss" scoped>
.header{
    background-color: #a5694775;
    .container{
        padding: 20px 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    &-logo{
        font-size: 22px;
        font-weight: 500;
        img{
            max-width: 140px;
        }
    }
    nav{
        height: min-content;
        display: flex;
        align-content: center;
        justify-content: flex-start;
        gap: 20px;
        a{
            color: #a56947;
            background-color: white;
            padding: 10px;
            border-radius: 4px;
        }
    }
    margin-bottom: 2rem;
}
</style>