<template lang="html">
    <section class="modalContainer">

        <h1>This is a modal... To be used with Pause and Rules</h1>
        <component :is="'TetrisRules'"></component>
    </section>
</template>

<script>
import TetrisRules from './TetrisRules.vue'

export default {
    components: {
        TetrisRules: TetrisRules
    }
}
</script>

<style lang="css">
.modalContainer {
    color: white;
    background-color: grey;
}
</style>
