<template>
  <div class="text-gray-300 text-ns script-gen">
    <div class="script-props absolute inset-0 flex flex-row my-2">
      <vuescroll :ops="scroll_config" ref="scrolling">
        <draggable
            :list="maps"
            ghostClass="ghost"
            dragClass="drag"
        >
          <transition-group type="transition" name="flip-list">
            <div class="script-col mx-3 my-0.5 shadow-md rounded-md"
                 :class="[item.line?'':'border border-gray-600']"
                 v-for="(item,index) in maps"
                 :key="item.id"
            >
              <div class="flex flex-row" v-if="!item.line">
                <div class="script-row">
                  <div>事件名</div>
                  <input
                      type="text"
                      class="w-24"
                      @input="propChange({prop:'name',index:index,e:$event})"
                      :value="item.name"/>
                </div>
                <div class="script-row">
                  <div>地图名</div>
                  <input
                      type="text"
                      class="w-24"
                      @input="propChange({prop:'mapID',index:index,e:$event})"
                      :value="item.mapID"/>
                </div>
                <div class="script-row">
                  <div>
                    坐标
                    ( x | y )
                  </div>
                  <input
                      type="text"
                      class="w-14"
                      @input="propChange({prop:'cx',index:index,e:$event})"
                      :value="item.coords.x"
                  />
                  <input
                      type="text"
                      class="w-14"
                      @input="propChange({prop:'cy',index:index,e:$event})"
                      :value="item.coords.y"
                  />
                </div>
                <div class="script-row">
                  <div>费用类型</div>
                  <select
                      @change="propChange({prop:'type',index:index,e:$event})"
                      :value="item.type"
                  >
                    <option value="gold">金币</option>
                    <option value="gamegold">元宝</option>
                  </select>
                </div>
                <div class="script-row">
                  <div>费用</div>
                  <input
                      type="text"
                      class="w-24"
                      @input="propChange({prop:'fee',index:index,e:$event})"
                      :value="item.fee"
                  />
                </div>
                <div class="script-row text-gray-50 text-nm">
                  <div>*</div>
                  <button
                      class="bg-green-500 rounded-sm mr-0.5 px-0.5"
                      @click="insertPoint(index)"
                  >
                    增
                  </button>
                  <button
                      class="bg-yellow-600 rounded-sm mr-0.5 px-0.5"
                      @click="insertNext(index)"
                  >
                    行
                  </button>
                  <button
                      class="bg-red-500 rounded-sm px-0.5"
                      @click="deleteLine(index)"
                  >
                    删
                  </button>
                </div>
              </div>
              <n-line v-else/>
            </div>
          </transition-group>
        </draggable>
      </vuescroll>

      <div class="w-1/2 px-0.5">
        <textarea class="w-full h-full px-2 py-0.5 text-gray-300 bg-gray-800 rounded-sm shadow-md font-chn text-ns" :value="scripts"/>
      </div>
    </div>
  </div>
</template>

<script>
import {ScriptBuilder} from "@/views/pages/ScriptGen/ScriptBuilder";
import {scrollConfig} from "@/views/pages/ScriptGen/ScrollConfig";
import vuescroll from 'vuescroll/dist/vuescroll-native';
import draggable from "vuedraggable";
import NLine from "@/views/pages/ScriptGen/NLine";

export default {
  name: "index",
  components: {
    NLine,
    vuescroll,
    draggable
  },
  data() {
    return {
      maps: [],
      scripts: ''
    }
  },
  computed: {
    scroll_config() {
      return scrollConfig
    },
    DEFAULT_MAP_PROPS() {
      return {
        id: '',
        name: '',
        mapID: '',
        coords: {
          x: 0,
          y: 0
        },
        type: 'gold',
        fee: ''
      };
    },
    DEFAULT_NEXT() {
      return {
        id: '',
        line: true
      }
    }
  },
  mounted() {
    this.initialize();
  },
  watch: {
    maps: {
      deep: true,
      handler(v) {
        let sb = new ScriptBuilder({
          body: v,
        });
        this.scripts = sb.getString();
      }
    }
  },
  methods: {
    initialize() {
      this.insertPoint()
      this.scripts = `string \ntext`
    },
    propChange({prop, index, e}) {
      let {value} = e.target;
      if (prop === 'cx') {
        this.$set(this.maps[index].coords, 'x', value);
      } else if (prop === 'cy') {
        this.$set(this.maps[index].coords, 'y', value);
      } else {
        this.$set(this.maps[index], prop, value);
      }
    },
    insertPoint(index) {
      let _DEFAUT_PROPS = this.getCopyMapper();
      _DEFAUT_PROPS.id = this.getId();
      this.maps.splice(index, -1, _DEFAUT_PROPS);
    },
    insertNext(index) {
      let _DEFAUT_NEXT_PROPS = this.getCopyNextMapper();
      _DEFAUT_NEXT_PROPS.id = this.getId();
      this.maps.splice(index, -1, _DEFAUT_NEXT_PROPS);
    },
    deleteLine(index) {
      this.maps.splice(index, 1);
      if (!this.maps.length) {
        this.initialize()
      }
    },
    getId() {
      let Chance = require('chance');
      let _c = new Chance()
      return _c.string({length: 10})
    },
    getCopyMapper() {
      return JSON.parse(JSON.stringify(this.DEFAULT_MAP_PROPS))
    },
    getCopyNextMapper() {
      return JSON.parse(JSON.stringify(this.DEFAULT_NEXT))
    }
  },
}
</script>

<style lang="scss" scoped>
.script-gen {
  * {
    @apply outline-none;
  }

  .script-props {

  }

  .script-row {
    @apply mx-2 my-3;
    div {
      @apply text-center;
    }

    input, select {
      @apply px-2 py-0.5 my-1 rounded-lg border border-gray-600 text-gray-300 bg-gray-800;
    }
  }
}

.flip-list-move {
  transition: transform 0.3s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  @apply bg-gray-800 transition-opacity duration-500 opacity-50;
}

.drag {
  @apply bg-gray-800;
}
</style>
