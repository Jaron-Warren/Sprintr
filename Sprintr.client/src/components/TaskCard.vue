<template>
  <div class="col-3">
    <div class="card m-2 form" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">
          {{ task.name }}
        </h5>
        <p class="card-text">
          <label for="status">{{ task.status }}</label>
          <select class="form-control" id="status" v-model="state.status" @change="changeTaskStatus">
            <option>pending</option>
            <option>in-progress</option>
            <option>review</option>
            <option>done</option>
          </select>
        </p><div class="form-group">
          <label for="weight">Task Weight</label>
          <input
            type="number"
            name="weight"
            v-model="state.weight"
            class="form-control"
            placeholder="weight..."
            required
            min="1"
            :default="task.weight"
            @change="changeTasksWeight"
          />
        </div>
        <a href="#" class="btn btn-primary m-1" @click="addNote">Add Note</a>
        <a href="#" class="btn btn-danger m-1" @click="destroyTask">Delete</a>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
export default {

  props: {
    task: {
      type: Object,
      required: true
    }
  },
  setup() {
    const state = reactive({
      status: {},
      weight: {},
      sprint: {}
    })
    return {
      state
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
