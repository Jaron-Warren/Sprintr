<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="d-flex flex-column align-items-center">
      <h2>Project: {{ project.name }}</h2>
    </div>

    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link :to="{ name: 'BacklogItem' }" class="nav-link">
            Backlog
          </router-link>
        </li>
        <li class="nav-item" v-for="s in sprints" :key="s.id">
          <router-link :to="{ name: 'Sprint', params: {sprintid: s.id} }" class="nav-link">
            Sprint
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
  <div class="ProjectPage">
    <router-view />
  </div>
</template>

<script>
import { onMounted, computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { router } from '../router'
import Pop from '../utils/Notifier'
import { projectsService } from '../services/ProjectsService'
import { useRoute } from 'vue-router'

export default {
  name: 'ProjectPage',
  setup() {
    const route = useRoute()
    onMounted(async() => {
      try {
        await projectsService.getById(route.params.id)
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })

    return {
      project: computed(() => AppState.activeProject),
      sprints: computed(() => AppState.sprints)
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
