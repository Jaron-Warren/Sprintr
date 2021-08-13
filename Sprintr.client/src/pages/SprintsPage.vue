<template>
  <div class="row">
    <div class="col-12">
      <h3>  Sprints view page!</h3>
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
import { logger } from '../utils/Logger'
export default {
  name: 'Sprints',
  setup() {
    const state = reactive({
      note: {}
    })
    const route = useRoute()
    onMounted(async() => {
      try {
        logger.log(route.params)
        await sprintsService.getAll(route.params.id)
      } catch (error) {
        Pop.toast(error)
      }
    })
    return {
      state,
      tasks: computed(() => AppState.tasks)
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
