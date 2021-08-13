<template>
  <header>
    <Navbar />
  </header>
  <main class="container-fluid">
    <div class="row vw-100">
      <div class="col-12 p-0">
        <router-view />
      </div>
    </div>
  </main>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

</style>
