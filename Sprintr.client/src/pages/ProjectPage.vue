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
        <li class="nav-item" v-for="s in sprints" :key="s._id">
          <router-link :to="{ name: 'Sprint', params: {sprintid: s._id} }" class="nav-link">
            {{ s.name }}
          </router-link>
        </li>
      </ul>
    </div>
    <button class="btn btn-secondary" data-toggle="modal" data-target="#createNewSprint">
      Create Sprint
    </button>
    <button class="btn btn-danger mx-4" @click="deleteProject">
      Delete this Project
    </button>
  </nav>
  <div class="ProjectPage">
    <router-view />
  </div>

  <!-- Modal -->
  <div class="modal"
       id="createNewSprint"
       tabindex="-1"
       role="dialog"
       aria-labelledby="modelTitleId"
       aria-hidden="true"
  >
    <form class="modal-dialog" role="document" @submit.prevent="createSprint">
      <div class="modal-content">
        <div class="modal-header bg-dark">
          <h5 class="modal-title">
            Add a new sprint
          </h5>
          <button type="button" class="close text-light" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body bg-dark">
          <div class="container-fluid">
            <div class="form-group">
              <label class="pr-2" for="Name">Name:</label>
              <input type="text"
                     class="form-control"
                     placeholder="Name..."
                     v-model="state.newSprint.name"
              >
            </div>
            <div class="form-group">
              <label class="pr-2" for="startDate">Start Date:</label>
              <input type="date"
                     class="form-control"
                     placeholder="starting Date..."
                     v-model="state.newSprint.startDate"
              >
            </div>
            <div class="form-group">
              <label class="pr-2" for="endDate">End Date:</label>
              <input type="date"
                     class="form-control"
                     placeholder="ending Date..."
                     v-model="state.newSprint.endDate"
              >
            </div>
          </div>
        </div>
        <div class="modal-footer bg-dark">
          <button type="button" class="btn btn-danger" data-dismiss="modal">
            Close
          </button>
          <button type="submit" class="btn btn-primary">
            create
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { onMounted, computed, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { router } from '../router'
import Pop from '../utils/Notifier'
import { projectsService } from '../services/ProjectsService'
import { useRoute } from 'vue-router'
import { sprintsService } from '../services/SprintsService'

export default {
  name: 'ProjectPage',
  setup() {
    const route = useRoute()
    const state = reactive({
      newSprint: {}
    })
    onMounted(async() => {
      try {
        await projectsService.getById(route.params.id)
        await sprintsService.getAll(route.params.id)
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })

    return {
      state,
      project: computed(() => AppState.activeProject),
      sprints: computed(() => AppState.sprints),
      deleteProject() {
        projectsService.destroy(this.project.id)
        router.push({ name: 'Home' })
      },
      createSprint() {
        state.newSprint.projectId = this.project.id
        sprintsService.createSprint(state.newSprint)
        state.newSprint = {}
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
