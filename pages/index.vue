<template>
    <section class="container">
        <div class="mainBody">
            <h1 class="title">
                Tetris<span class="colored">One</span>
            </h1>
            <h3 class="subtitle">
                A simple version of the tetris game.
            </h3>
            <h3>
                Created by Caitlyn Priese
            </h3>

            <router-link :to="{ name: 'Rules' }" class="link">
                View Rules and Play
            </router-link>
            <br>

        </div>
    </section>
</template>

<script>

import ModalScreen from '~/components/ModalScreen.vue'
export default {
    data() {
        return {
            modalOpen: false
        }
    },
  components: {
        ModalScreen
    }
}
</script>

<style>
.container {
    font-family: "Trebuchet MS", sans-serif;
    height: 100vh;
    width: 100vw;
    text-align: center;
    display: inline-block;
    position: absolute;

    background-color: #9f9f9f;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='200' viewBox='0 0 16 32'%3E%3Cg fill='%23b60000' fill-opacity='0.8'%3E%3Cpath fill-rule='evenodd' d='M0 24h4v2H0v-2zm0 4h6v2H0v-2zm0-8h2v2H0v-2zM0 0h4v2H0V0zm0 4h2v2H0V4zm16 20h-6v2h6v-2zm0 4H8v2h8v-2zm0-8h-4v2h4v-2zm0-20h-6v2h6V0zm0 4h-4v2h4V4zm-2 12h2v2h-2v-2zm0-8h2v2h-2V8zM2 8h10v2H2V8zm0 8h10v2H2v-2zm-2-4h14v2H0v-2zm4-8h6v2H4V4zm0 16h6v2H4v-2zM6 0h2v2H6V0zm0 24h2v2H6v-2z'/%3E%3C/g%3E%3C/svg%3E");

}
.link{
    margin-top: 10px;
    width:auto;
    text-decoration: none;
    background-color: white;
    color: #ae0000;
    border-radius: 10px;
    padding-left: 3px;
    padding-right: 3px;
    border: solid 1px;
    border-color: #59c3aa;
    margin-left: 3px;
    margin-right: 3px;
}
.mainBody{
    font-family: "Trebuchet MS", sans-serif;
    background-color: grey;
    border: solid 3px;
    color: #e1e0e1;
    border-color: #ae0000;
    border-radius: 30px;
    display: inline-block;
    padding: 20px;

    padding-bottom: 15px;
    margin-top: 10px;
    margin-left: 100px;
    margin-right: 100px;
    text-align: center;

    font-size: 20px;

}
.colored{
    color: #59c3aa;
}
</style>
