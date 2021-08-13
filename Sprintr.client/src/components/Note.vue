<template>
  <div>
    <p> {{ note.description }}</p>
    <a href="#" class="btn btn-danger m-1" @click="destroyNote()">Delete</a>
    {{ note.creator.name }}
    <img :src="note.creator.picture" alt="">
  </div>
</template>

<script>
import { tasksService } from '../services/TasksService'
export default {
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      async destroyNote() {
        await tasksService.destroyNote(props.note._id)
      }
    }
  }
}
</script>

<style lang="">

</style>
