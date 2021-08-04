<template>
  <q-page id="main" class="container-fluid">
      <div class="row">
          <div class="col-12">
              <email-verifying v-if="$route.query.status === 'verifying'" />
          </div>
      </div>
  </q-page>
</template>

<script>
import EmailVerifying from "components/emailVerification/EmailVerifying"
export default {
    name: 'EmailVerfication',
    components: {
        EmailVerifying
    }
}
</script>

<style lang="scss" scoped>
  // colors
  $main     : #0b0c22;
  $secondary: #10122d;
  #main {
      background-color: $main;
      color: #FBFBFB;
  }
</style>