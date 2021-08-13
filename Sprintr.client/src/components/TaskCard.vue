<template>
  <div class="col-3">
    <div class="card m-2 form" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">
          {{ task.name }}
        </h5>
        <form class="card-text" @click="changeTaskStatus(value)">
          <label for="status">{{ task.status }}</label>
          <select class="form-control" type="button" v-model="state.newTask.status" id="status">
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
        </form>
        <div class="form-group">
          <label for="weight">Task Weight</label>
          <input
            type="number"
            name="weight"
            v-model="state.task.weight"
            class="form-control"
            placeholder="weight..."
            required
            min="1"
            :default="task.weight"
            @click="changeTaskStatus(value)"
          />
        </div>
        <button class="btn btn-primary m-1" type="button" data-toggle="modal" :data-target="'#createNote' + task._id">
          View Notes
        </button>
        <button class="btn btn-danger m-1" @click.stop="destroyTask">
          Delete
        </button>
      </div>
    </div>
  </div>
  <!-- Modal -->
  <div class="modal"
       :id="'createNote' + task._id"
       tabindex="-1"
       role="dialog"
       aria-labelledby="modelTitleId"
       aria-hidden="true"
  >
    <form class="modal-dialog" role="document" @submit.prevent="createNote">
      <div class="modal-content">
        <div class="modal-header bg-dark">
          <h5 class="modal-title">
            Notes for {{ task.name }}!
          </h5>
          <div class="modal-body">
            <ol>
              <li v-for="index in note" :key="index">
                <Note :note="index" />
              </li>
            </ol>
          </div>
          <button type="button" class="close text-light" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body bg-dark">
          <div class="container-fluid">
            <div class="form-group">
              <input type="text"
                     id="description"
                     class="form-control"
                     placeholder="Add note here..."
                     v-model="state.newNote.description"
              >
            </div>
          </div>
        </div>
        <div class="modal-footer bg-dark">
          <button type="button" class="btn btn-danger" data-dismiss="modal">
            Close
          </button>
          <button type="submit" class="btn btn-primary">
            Add
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import Pop from '../utils/Notifier'
import { tasksService } from '../services/TasksService'
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
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
      newTask: {
        status: ''
      },
      newNote: {}
    })
    onMounted(async() => {
      try {
        await tasksService.getAllNotes()
      } catch (error) {
        Pop.toast(error)
      }
    })
    return {
      state,
      note: computed(() => AppState.notes),
      async destroyTask() {
        try {
          await tasksService.destroyTask(props.task._id)
        } catch (error) {
          Pop.toast(error)
        }
      },
      async changeTaskStatus() {
        try {
          await tasksService.updateTask(props.task._id, state.newTask)
        } catch (error) {
          Pop.toast(error)
        }
      },
      async createNote() {
        await tasksService.createNote(state.newNote)
      }

    }
  }

}
</script>

<style lang="scss" scoped>

</style>
