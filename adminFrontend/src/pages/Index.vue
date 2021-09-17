<template>
  <q-page id="main" class="container-fluid">
    <div class="row">
      <div class="col-12 m-auto">
        <login />
      </div>
    </div>
  </q-page>
</template>


<script>
import Login from 'components/Login.vue'
export default {
  name: 'Index',
  components: {
    Login
  },
  data: () => ({})
}
</script>
