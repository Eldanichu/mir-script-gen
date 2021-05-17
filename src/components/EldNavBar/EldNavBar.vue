<template>
  <div class="eld-nav-bar text-nm bg-blue-550 text-white px-2 py-1 flex flex-row justify-between items-center">
    <div class="app-title">

    </div>
    <div class="routers">
      <router-link
          v-for="router in routers"
          :key="router.name"
          :to="router.path"
          class="eld-nav-item"
          active-class="eld-nav-active"
      >
      <span>
        {{ mapper[router.name].name }}
      </span>
      </router-link>
    </div>
    <div class="app-util">

    </div>
  </div>
</template>

<script>
import {RouterHelper} from "@/utils/RouterHelper";

let rh = new RouterHelper();
export default {
  name: "EldNavBar",
  data() {
    return {}
  },
  computed: {
    routers() {
      return rh.getRouters()
    },
    mapper() {
      return rh.getRouterMapper()
    }
  },
}
</script>

<style scoped lang="scss">

</style>
