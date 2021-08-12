<template>
  <div class="backlogItem">
    <h2>Backlog Items:</h2>
    <p style="text-muted">
      Group your tasks into items for project goals
    </p>
    <button type="button" data-toggle="modal" data-target="#createBacklogItem">
      Create new backlog Item
    </button>

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
              <div class="form-group">
                <label class="pr-2" for="Name">Description:</label>
                <input type="text"
                       id="backlogitemdescription"
                       class="form-control"
                       placeholder="description..."
                       v-model="state.backlogItem.description"
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

export default {
  name: 'BacklogItem',
  setup() {
    const route = useRoute()
    const state = reactive({
      backlogItem: {}
    })
    return {
      state,
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
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
