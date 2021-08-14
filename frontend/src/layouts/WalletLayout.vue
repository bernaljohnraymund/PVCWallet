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
      <div id="drawer-content">
        <div id="profile" class="absolute-top text-center">
          <img src="/temporary/couple-img.jpg" />
          <h6 class="name absolute-bottom">{{ profile.firstName }} {{ profile.lastName }}</h6>
        </div>
        <div class="menu q-pa-md" style="max-width: 350px">
          <q-list>
            <q-item
              clickable
              v-ripple
              v-for="(item, i) in menuItems"
              :key="i"
              @click="activeItem(item.name)"
              :active="menu.item === item.name"
              active-class="active"
            >
              <q-item-section avatar>
                <q-icon :name="item.icon"  class="text-center" />
              </q-item-section>
              <q-item-section>{{ item.label }}</q-item-section>
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
import noGlobalComponentRoutes from '../utils/data/noGlobalComponentRoutes'
import { ref } from 'vue'

let menuItems= [{
      name: 'dashboard',
      label: 'Dashboard',
      icon: 'dashboard'
    },
    {
      name: 'portfolio',
      label: 'Portfolio',
      icon: 'pie_chart'
    }, {
      name: 'transactions',
      label: 'Transactions',
      icon: 'receipt_long'
    },
    {
      name: 'chart',
      label: 'Chart',
      icon: 'trending_up'
    },
    {
      name: 'settings',
      label: 'Settings',
      icon: 'settings'
    },{
      name: 'logout',
      label: 'Logout',
      icon: 'logout'
    }]

export default {
  name: 'WalletLayout',

  components: {
  },
  data: () => ({
    noGlobalComponentRoutes: noGlobalComponentRoutes,
    profile: {
      firstName: "John Raymund",
      middleName: "",
      lastName: "Bernal",
    },
    menu: {
      item: 'dashboard'
    },
    
  }),

  setup () {
    const leftDrawerOpen = ref(true)
    
    return {
      leftDrawerOpen,
      menuItems,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },

  async mounted () {
  },

  methods: {
    async activeItem (menuItem) {
      console.log(menuItem)
      this.menu.item = menuItem;
    }
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
    #drawer-content {
      background-color: #0b0c22 !important;
      width: 100%;
      height: 100%;
    }
    .q-toolbar .q-avatar {
        left: 5px;
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

      .active {
        color: #FBFBFB;
        background-image: linear-gradient(to right, #2D5EF5, #44B6F4);
      }
      .q-item__section--side > .q-icon {
        background: -webkit-linear-gradient(left, #2D5EF5 2%, #44B6F4 100%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
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
