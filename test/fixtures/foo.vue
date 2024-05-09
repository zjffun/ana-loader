<template>
  <img src="./assets/foo.png" alt="">
  <img :src="'./assets/bar.png'" alt="">
</template>

<script>
import "./node_modules/test.js";
import "./fooDep.js";
</script>

<script lang="ts">
import "./node_modules/test.js";
import "./fooDep.js";
</script>

<style>
.test {
  background: url("./assets/foo1.png");
}
</style>

<style lang="scss">
.test {
  background: url("./assets/foo2.png");
}
</style>

<style lang="less">
.test {
  background: url("./assets/foo3.png");
}
</style>


