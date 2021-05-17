<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>

export default {
  name: 'App',
}
</script>

<style lang="scss">
@tailwind base;
@tailwind components;
@tailwind utilities;

@import "assets/css/index";
</style>
