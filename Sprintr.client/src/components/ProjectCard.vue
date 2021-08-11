<template>
  <div class="col-12">
    <div class="ProjectCard shadow card m-3 w-100">
      <router-link :to="{ name: 'ProjectPage', params: {id: projects.id} }">
        <div class="card-title">
          {{ projects.name }}
        </div>
        <div class="card-body">
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

</style>
