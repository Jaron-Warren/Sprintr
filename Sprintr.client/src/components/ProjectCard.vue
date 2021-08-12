<template>
  <div class="col-12">
    <div class="ProjectCard shadow card m-3 w-80">
      <router-link :to="{ name: 'BacklogItem', params: {id: projects.id} }">
        <div class="font-weight-bold ml-4">
          {{ projects.name }}
        </div>
        <div class="font-italic text-center">
          {{ projects.description }}
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
export default {
  props: {
    projects: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.w-80 {
  width: 40vw;
}
</style>
