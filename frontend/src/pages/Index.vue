<template>
  <q-page id="main" class="container-fluid">
    <div class="row">
      <div class="col-md-3 col-12 drawer">
        <login
          v-show="activeComponent === 'login'"
          @changeActiveComponent="changeActiveComponent"
          ref="loginRef"
        />
        <login-one-time-passcode
          v-show="activeComponent === 'login-one-time-passcode'"
          @changeActiveComponent="changeActiveComponent"
          ref="loginOneTimePasscodeRef"
        />
        <register
          v-show="activeComponent === 'register'"
          @changeActiveComponent="changeActiveComponent"
        />
        <forgot-password
          v-show="activeComponent === 'forgot-password'"
          @changeActiveComponent="changeActiveComponent"
        />
      </div>
      <div class="col-md-9 main-view"></div>
    </div>
  </q-page>
</template>

<script>
import Login from 'components/login/Login'
import LoginOneTimePasscode from 'components/login/LoginOneTimePasscode'
import Register from 'components/Register'
import ForgotPassword from '../components/ForgotPassword.vue';

export default {
  name: 'Index',
  components: { Login, LoginOneTimePasscode, Register, ForgotPassword },
  data: () => ({
    activeComponent: 'login'
  }),
  beforeRouteEnter (to, from, next) {
    next()
  },
  async mounted () {
      this.activeComponent = this.$route.query.route || 'login';
      // console.log(this.$getUser())
      // this.$setUser({token: 'skdjfksjdfk'})
      // let user = this.$getUser()

      // console.log(user)
  },

  methods: {
    async changeActiveComponent (val) {
        this.activeComponent = val.component
        if (val.component === 'login-one-time-passcode') {
          this.$refs['loginRef'].form.username = '';
          this.$refs['loginRef'].form.password = '';
          this.$refs['loginOneTimePasscodeRef'].form.username = val.username;
          this.$refs['loginOneTimePasscodeRef'].key = val.key;
        }

    }
  }
}
</script>
<style lang="scss" scoped>
  // colors
  $main     : #0b0c22;
  $secondary: #10122d;
  
    @media (min-width:320px)  {
        /* smartphones, iPhone, portrait 480x320 phones */
        
    }
    @media (min-width:481px)  {
        /* portrait e-readers (Nook/Kindle), smaller tablets @ 600 or @ 640 wide. */

    }
    @media (min-width:641px)  {
        /* portrait tablets, portrait iPad, landscape e-readers, landscape 800x480 or 854x480 phones */
    }
    @media (min-width:961px)  {
        /* tablet, landscape iPad, lo-res laptops ands desktops */

    }
    @media (min-width:1025px) {
        /* big landscape tablets, laptops, and desktops */

    }
    @media (min-width:1281px) {
        /* hi-res laptops and desktops */
    }

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
