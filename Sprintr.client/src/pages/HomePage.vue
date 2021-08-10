<template>
  <div class="home m-3">
    <form @submit.prevent="createProject">
      <div class="form-group">
        <input v-model="state.project.name"
               type="text"
               class="form-control"
               id="projectName"
               aria-describedby="projectName"
               placeholder="Project name..."
        >
      </div>
      <div class="form-group">
        <input v-model="state.project.description" type="text" class="form-control" id="description" placeholder="Project description...">
      </div>
      <button type="submit" class="btn btn-primary">
        Submit
      </button>
    </form>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import Pop from '../utils/Notifier'
import { projectsService } from '../services/ProjectsService'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      project: {}
    })
    return {
      state,

      async createProject() {
        try {
          await projectsService.createProject(state.project)
          state.project = {}
        } catch (error) {
          Pop.toast(error)
        }
      }

    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
