<template>
  <div id="app">
    <WelcomePage/>
    <div class="container">
    <router-view/>
    </div>
  </div>
</template>

<script>
import WelcomePage from './components/WelcomePage.vue'

export default {
  name: 'App',
  components: {
    WelcomePage
  }
}
</script>

<style>
#app {
  @import url(https://unpkg.com/bootstrap@4.1.0/dist/css/bootstrap.min.css)
}
</style>
