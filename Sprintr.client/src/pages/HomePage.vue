<template>
  <div class="row" v-if="user.isAuthenticated">
    <div class="col-3">
      <div class="home card shadow p-2 m-3">
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
    </div>
    <div class="col-9">
      <div class="row">
        <div>
          <ProjectCard v-for="p in projects" :key="p.id" :projects="p" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import Pop from '../utils/Notifier'
import { projectsService } from '../services/ProjectsService'
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { router } from '../router'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      project: {}
    })
    onMounted(async() => {
      try {
        await projectsService.getAll()
      } catch (error) {
        Pop.toast(error)
      }
    })
    return {
      state,
      projects: computed(() => AppState.projects),
      user: computed(() => AppState.user),

      async createProject() {
        try {
          const newId = await projectsService.createProject(state.project)
          state.project = {}
          router.push({ name: 'BacklogItem', params: { id: newId } })
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
