<template>
  <q-page id="main" class="container-fluid">
    <div class="row">
      <div class="col-md-3 col-12 drawer">
        <login />
      </div>
      <div class="col-md-9 main-view"></div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import Login from 'components/Login'

export default defineComponent({
  name: 'Index',
  components: { Login },
  beforeRouteEnter (to, from, next) {
    next()
  }
})
</script>
<style lang="scss" scoped>
  // colors
  $main     : #0b0c22;
  $secondary: #10122d;

  #main, .drawer {
    height: 100vh;
  }

  .main-view {
    background-image: url('/backgrounds/login-wallpaper5.png');
    background-size: cover;
  }
  .drawer {
    background-color: $main;
  }
</style>
