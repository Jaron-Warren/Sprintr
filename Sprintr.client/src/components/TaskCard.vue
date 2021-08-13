<template>
  <div class="col-3">
    <div class="card m-2 form" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">
          {{ task.name }}
        </h5>
        <p class="card-text">
          <label for="status">{{ task.status }}</label>
          <select class="form-control" id="status" @change="changeTaskStatus(value)">
            <option value="pending">
              pending
            </option>
            <option value="in-progress">
              in-progress
            </option>
            <option value="review">
              review
            </option>
            <option value="done">
              done
            </option>
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
            @click="changeTaskStatus(task)"
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
import Pop from '../utils/Notifier'
import { tasksService } from '../services/TasksService'
export default {

  props: {
    task: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      task: props.task,
      sprint: {}
    })
    return {
      state,
      async destroyTask() {
        try {
          await tasksService.destroyTask(props.task._id)
        } catch (error) {
          Pop.toast(error)
        }
      },
      async changeTaskStatus() {
        console.log(state.task)
        try {
          await tasksService.updateTask(props.task._id, state.task)
        } catch (error) {
          Pop.toast(error)
        }
      }
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
