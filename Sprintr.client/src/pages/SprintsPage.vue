<template>
  <div class="backlogItem">
    Sprints view page!
    <div v-for="t in tasks" :key="t.id">
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { computed } from '@vue/runtime-core'
export default {
  name: 'BacklogItem',
  setup() {
    return {
      task: computed(() => AppState.tasks)
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
