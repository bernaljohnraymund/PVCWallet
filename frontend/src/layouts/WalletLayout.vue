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

        <q-toolbar-title>
          PVC
        </q-toolbar-title>
      </q-toolbar>

    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      v-if="!noGlobalComponentRoutes.drawer.includes($route.name)"
    >
      <div id="drawer-content">
        <div id="profile" class="absolute-top text-center">
          <img src="/temporary/couple-img.jpg" />
          <h6 class="name absolute-bottom">{{ profile.firstName }} {{ profile.lastName }}</h6>
        </div>
        <div class="menu q-pa-md" style="max-width: 350px">
          <q-list bordered>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon color="primary" name="bluetooth" />
              </q-item-section>

              <q-item-section>Icon as avatar</q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-avatar color="teal" text-color="white" icon="bluetooth" />
              </q-item-section>

              <q-item-section>Avatar-type icon</q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-avatar rounded color="purple" text-color="white" icon="bluetooth" />
              </q-item-section>

              <q-item-section>Rounded avatar-type icon</q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-avatar color="primary" text-color="white">
                  R
                </q-avatar>
              </q-item-section>
              <q-item-section>Letter avatar-type</q-item-section>
          </q-item>
          </q-list>
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import noGlobalComponentRoutes from '../utils/data/noGlobalComponentRoutes'

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
];

import { ref } from 'vue'

export default {
  name: 'WalletLayout',

  components: {
    EssentialLink
  },
  data: () => ({
    noGlobalComponentRoutes: noGlobalComponentRoutes,
    profile: {
      firstName: "John Raymund",
      middleName: "",
      lastName: "Bernal",
    }
  }),

  setup () {
    const leftDrawerOpen = ref(true)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },

  async mounted () {
  }
}
</script>

<style lang="scss" scoped>

.q-layout {
    background-color: #10122d;
    color: #FBFBFB;
    header {
      background-color: #00a1ff
    }
    #drawer-content {
      background-color: #0b0c22 !important;
      width: 100%;
      height: 100%;
    }
    #profile {
      width: 100%;
      max-height: 244px;
      height: 37vh;
      padding-top: 7vh;
      display: block;
      position: relative;

      img {
        width: 50%;
        border-radius: 50%;
      }

      .name {
        margin: 0;
      }
    }
    .menu {
      position: relative;
      margin-top: 7vh;
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
