<template>
  <q-page id="main" class="container-fluid">
    <div class="row">
      <div class="col-md-3 col-12 drawer">
        <login
          v-if="activeComponent === 'login'"
          @changeActiveComponent="changeActiveComponent"
        />
        <register
          v-if="activeComponent === 'register'"
          @changeActiveComponent="changeActiveComponent"
        />
      </div>
      <div class="col-md-9 main-view"></div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import Login from 'components/Login'
import Register from 'components/Register'

export default defineComponent({
  name: 'Index',
  components: { Login, Register },
  data: () => ({
    activeComponent: 'login'
  }),
  beforeRouteEnter (to, from, next) {
    next()
  },

  methods: {
    changeActiveComponent (val) {
      console.log(val)
      this.activeComponent = val.component
    }
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
