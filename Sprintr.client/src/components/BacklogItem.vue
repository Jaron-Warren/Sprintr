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
        <button class="btn btn-primary ml-5">
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
        <div class="card card-body">
          Tasks!
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { backlogItemsService } from '../services/BacklogItemsService'
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      deleteBacklogItem() {
        backlogItemsService.destroy(props.item._id)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  min-height: 10vh;
}
</style>
