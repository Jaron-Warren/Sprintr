<template>
  <div class="col-11">
    <div class="ProjectCard shadow card m-3">
      <div class="d-flex d-inline m-3">
        <a data-toggle="collapse"
           :href="'#collapse' + item._id"
           role="button"
           aria-expanded="false"
           aria-controls="collapseExample"
        >
          <h3>{{ item.name }}</h3>
        </a>
        <h5 class="ml-5 mb-0 mt-2">
          Weight: 0
        </h5>
        <button class="btn btn-primary ml-5" type="button" data-toggle="modal" :data-target="'#createTask' + item._id">
          Add Task
        </button>
        <div class="ml-5">
          0/0 Tasks completed
        </div>
        <button class="btn btn-danger ml-5" @click.stop="deleteBacklogItem">
          delete
        </button>
      </div>
      <div class="collapse" :id="'collapse' + item._id">
        <div class="row">
          <div class="card card-body">
            <div v-for="t in task" :key="t.id">
              <TaskCard :task="t" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal -->
  <div class="modal"
       :id="'createTask' + item._id"
       tabindex="-1"
       role="dialog"
       aria-labelledby="modelTitleId"
       aria-hidden="true"
  >
    <form class="modal-dialog" role="document" @submit.prevent="createTask">
      <div class="modal-content">
        <div class="modal-header bg-dark">
          <h5 class="modal-title">
            Add a new Task to {{ item.name }}!
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
                     id="backlogitemname"
                     class="form-control"
                     placeholder="Name..."
                     v-model="state.newTask.name"
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
import { computed, onMounted, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { backlogItemsService } from '../services/BacklogItemsService'
import { tasksService } from '../services/TasksService'
import Pop from '../utils/Notifier'
import $ from 'jquery'
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      newTask: {}
    })
    return {
      state,
      task: computed(() => AppState.tasks.filter((task) => task.backlogItemId === props.item._id)),
      deleteBacklogItem() {
        backlogItemsService.destroy(props.item._id)
      },
      async createTask() {
        state.newTask.projectId = AppState.activeProject.id
        state.newTask.backlogItemId = props.item._id
        try {
          await tasksService.createTask(state.newTask)
          state.newTask = {}
          await tasksService.getProjectTasks(AppState.activeProject.id)
          $('#createTask').modal('hide')
        } catch (error) {
          Pop.toast(error)
        }
      }
    }
  }
}

// name: { type: String, required: true },
// projectId: { type: ObjectId, ref: 'Project', required: true },
// creatorId: { type: ObjectId, ref: 'Account', required: true },
// sprintId: { type: ObjectId, ref: 'Sprint', required: true }, REMOVE REQUIRED!
// backlogItemId: { type: ObjectId, ref: 'BacklogItem', required: true }

</script>

<style lang="scss" scoped>
.card {
  min-height: 10vh;
}
</style>
