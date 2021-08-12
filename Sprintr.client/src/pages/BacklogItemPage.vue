<template>
  <div class="backlogItem row justify-content-center">
    <div class="col-12 d-flex m-2 justify-content-around">
      <div class="font-weight-bold bigtext">
        Backlog Items:
      </div>
      <div class="mx-3 text-muted">
        Group your tasks into backlog items for project goals!
      </div>
      <button type="button" data-toggle="modal" data-target="#createBacklogItem" class="btn btn-success ml-3">
        Create new backlog Item
      </button>
    </div>
    <div class="row justify-content-center">
      <BacklogItem v-for="item in backlog" :key="item._id" :item="item" />
    </div>

    <!-- Modal -->
    <div class="modal"
         id="createBacklogItem"
         tabindex="-1"
         role="dialog"
         aria-labelledby="modelTitleId"
         aria-hidden="true"
    >
      <form class="modal-dialog" role="document" @submit.prevent="createBacklogItem">
        <div class="modal-content">
          <div class="modal-header bg-dark">
            <h5 class="modal-title">
              Add a new backlog Item
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
                       v-model="state.backlogItem.name"
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
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { backlogItemsService } from '../services/BacklogItemsService'
import Pop from '../utils/Notifier'
import { useRoute } from 'vue-router'
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'

export default {
  name: 'BacklogItemPage',
  setup() {
    const route = useRoute()
    const state = reactive({
      backlogItem: {}
    })
    onMounted(async() => {
      try {
        await backlogItemsService.getAll()
      } catch (error) {
        Pop.toast(error)
      }
    })

    return {
      state,
      backlog: computed(() => AppState.backlogItems.filter((item) => item.projectId === AppState.activeProject.id)),
      async createBacklogItem() {
        try {
          state.backlogItem.projectId = route.params.id
          await backlogItemsService.createBacklogItem(state.backlogItem)
          state.backlogItem = {}
        } catch (error) {
          Pop.toast(error, 'you got a big fat error')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bigtext {
  font-size: 1.5rem;
}
</style>
