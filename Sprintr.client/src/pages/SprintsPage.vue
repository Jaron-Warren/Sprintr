<template>
  <div class="row">
    <div class="col-12">
      <div class="row">
        <div class="col-4">
          <h3>{{ currentSprint.name }}</h3>
          <b>{{ currentSprint.startDate.slice(0, 10) }} - {{ currentSprint.endDate.slice(0, 10) }}</b>
        </div>
        <p class="col-7">
          Weight: {{ calculateWeight(tasks) }}
        </p>
      </div>
      <div class="sprints row">
        <div v-for="t in tasks" :key="t.id">
          <TaskCard :task="t" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { computed, reactive, onMounted } from '@vue/runtime-core'
import { sprintsService } from '../services/SprintsService'
import Pop from '../utils/Notifier'
import { useRoute } from 'vue-router'
import { tasksService } from '../services/TasksService'

export default {
  name: 'Sprints',
  setup() {
    const state = reactive({
      note: {}
    })
    const route = useRoute()
    onMounted(async() => {
      try {
        if (AppState.sprints.length === 0) {
          await sprintsService.getAll(route.params.sprintid)
        }
        if (AppState.tasks.length === 0) {
          await tasksService.getProjectTasks(route.params.id)
        }
      } catch (error) {
        Pop.toast(error)
      }
    })

    return {
      state,
      tasks: computed(() => AppState.tasks.filter((task) => task.sprintId === route.params.sprintid)),
      currentSprint: computed(() => AppState.sprints.find((sprint) => sprint._id === route.params.sprintid)),
      calculateWeight(tasks) {
        let total = 0
        tasks.forEach(task => {
          total += task.weight
        })
        return total
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
