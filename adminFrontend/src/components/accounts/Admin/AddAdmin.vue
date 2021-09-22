<template>
    <div class="row" id="root">
        <div class="col-md-8">
            <q-card id="admin-registration-form">
                <q-card-section class="text-h4 text-center header">
                    Create Account
                </q-card-section>
                <q-card-section class="body">
                </q-card-section>
                <q-card-section class="footer"></q-card-section>
                <h2></h2>
            </q-card>
        </div>
        <div class="col-md-4" id="banner">
            <q-img src="/banners/create-account-banner.jpg" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'AddAdmin',
    components: {
    },
    data: () => ({}),
    async mounted () {
        console.log('hythere')
    },
    methods: {}
}
</script>

<style lang="scss" scoped>
#root {
    max-height: 85vh;
    overflow: hidden;
    position: relative;
    #admin-registration-form {
        background-color: rgba(11, 12, 34, 0.7);
        height: 85vh;
    }

    #banner {
        position: relative;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        height: 85vh;
        
        .q-img {
            height: 100%;
        }
        :deep(img) {
            object-position: 16% 50% !important;
        }

    }
}

</style>