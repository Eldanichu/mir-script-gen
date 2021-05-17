<template>
  <div class="w-full h-full page-index">
    <eld-nav-bar/>
    <div class="absolute inset-x-0 bottom-0 bg-gray-700 app-warp overflow-hidden">
      <router-view/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import EldNavBar from "@/components/EldNavBar/EldNavBar";
export default {
  name: "Index",
  components: {EldNavBar},
  mounted() {
    this.$router.replace('/scriptGen')
  }
};
</script>
<style lang="scss" scoped>

.page-index {
  .app-warp {
    top:var(--eld-nav-height);
  }
}
</style>
