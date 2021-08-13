<template>
  <div>
    <p> {{ note.description }}</p>
  </div>
</template>

<script>
export default {
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  setup() {

  }
}
</script>

<style lang="">

</style>
