<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      v-if="!noGlobalComponentRoutes.header.includes($route.name)"
    >
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
          v-if="!noGlobalComponentRoutes.drawer.includes($route.name)"
        />

        <q-avatar>
          <img src="/logo/logo.png" name="logo" alt="logo" />
        </q-avatar>
      </q-toolbar>

    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      v-if="!noGlobalComponentRoutes.drawer.includes($route.name)"
    >
      <drawer-menu />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import noGlobalComponentRoutes from '../utils/data/array/noGlobalComponentRoutes'
import DrawerMenu from '../components/global/DrawerMenu.vue'
import { ref } from 'vue'

export default {
  name: 'AdminLayout',

  components: {
    DrawerMenu
  },
  data: () => ({
    noGlobalComponentRoutes: noGlobalComponentRoutes,
  }),

  setup () {
    const leftDrawerOpen = ref(true)
    
    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },

  async mounted () {
  },

  methods: {
  }
}
</script>

<style lang="scss" scoped>

.q-layout {
    background-color: #10122d;
    color: #FBFBFB;
    header {
      background-color: #00a1ff;
    }
    .q-page-container > div {
      padding: 20px;
    }
}

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
</style>
