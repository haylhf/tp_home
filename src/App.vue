<template>
    <div id="app">
        <router-view class="router-view"></router-view>
    </div>
</template>

<script>
    export default {
        debug: true,
        name: 'app',
        data () {
            return {}
        },

        methods: {
        },
    }
</script>
<style>
@font-face {
    font-family: 'SquareFont';
    src: url('./assets/font/Square.ttf');
    font-weight: normal;
    font-style: normal;
}

</style>
