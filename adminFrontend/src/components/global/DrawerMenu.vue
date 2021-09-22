<template>
    <div id="drawer-content">
        <!-- <div id="profile" class="absolute-top text-center">
            <img src="/temporary/couple-img.jpg" />
            <h6 class="name">{{ profile.email }}</h6>
            <q-badge
                color="negative"
                class="profile-badge"
                @click="$router.push({ name: 'ProfileRoot' })"
            >
                <q-icon name="warning" />
                <label>Not Verified</label>
            </q-badge>
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
        </div> -->
    </div>
</template>

<script>
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
    name: 'DrawerMenu',
    data: () => ({
        menuItems,
        profile: {
            firstName: "John Raymund",
            middleName: "",
            lastName: "Bernal",
            email: "bernaljohnraymund777@gmail.com"
        },
        menu: {
            item: 'dashboard'
        },
    }),
    methods: {
        async activeItem (menuItem) {
        console.log(menuItem)
        this.menu.item = menuItem;
        }
    }
}
</script>

<style lang="scss" scoped>
    #drawer-content {
      background-color: #0b0c22 !important;
      // background-image: linear-gradient(to right, #2D5EF5, #44B6F4);
      width: 100%;
      height: 100%;
      overflow-y: hidden !important;
    }
    .q-toolbar .q-avatar {
        left: 5px;
    }
    #profile {
        width: 100%;
        height: auto;
        padding-top: 7vh;
        display: block;
        position: relative;

      img {
        width: 50%;
        border-radius: 50%;
      }

      .name {
        word-wrap: break-word;
        margin: 10px 12px 7px 12px;
      }

      .profile-badge {
          cursor: pointer;
          text-align: center;
          padding: 4px 10px;
          font-family: Roboto;
          
          i {
            margin-right: 7px;
            cursor: pointer;
          }
          label {
            cursor: pointer;
            font-weight: bold;
          }
      }
    }
    .menu {
      position: relative;
      margin-top: 3vh;

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
</style>