<template>
  <div class="row" id="root">
        <div class="col-10 col-md-4">
            <q-card class="users-analytics-card total-users">
                <q-card-section class="header">
                    <label>Total Users</label>
                </q-card-section>
                <q-card-section class="body text-center"><h3>999</h3></q-card-section>
                <q-card-section class="row footer">
                    <div class="col-12">
                        <q-btn type="button" label="view" flat />
                    </div>
                </q-card-section>
            </q-card>
        </div>
        <div class="col-10 col-md-4">
            <q-card class="users-analytics-card not-verified">
                <q-card-section class="header">
                    <label>KYC Basic Info</label>
                </q-card-section>
                <q-card-section class="body text-center"><h3>350</h3></q-card-section>
                <q-card-section class="row footer">
                    <div class="col-12">
                        <q-btn type="button" label="view" flat />
                    </div>
                </q-card-section>
            </q-card>
        </div>
        <div class="col-10 col-md-4">
            <q-card class="users-analytics-card">
                <q-card-section class="header">
                    <label>KYC Identity Info</label>
                </q-card-section>
                <q-card-section class="body text-center"><h3>200</h3></q-card-section>
                <q-card-section class="row footer">
                    <div class="col-12">
                        <q-btn type="button" label="view" flat />
                    </div>
                </q-card-section>
            </q-card>
        </div>
        <!-- <div class="col-10 col-md-3">
            <q-card class="users-analytics-card">
                <q-card-section class="header"></q-card-section>
                <q-card-section class="body text-center"></q-card-section>
                <q-card-section class="row footer">
                    <div class="col-12">
                        <q-btn type="button" label="view" flat />
                    </div>
                </q-card-section>
            </q-card>
        </div> -->
        <div class="col-10 col-md-4 offset-md-2">
            <q-card class="users-analytics-card">
                <q-card-section class="header">
                    <label>KYC Proof of Address</label>
                </q-card-section>
                <q-card-section class="body text-center"><h3>150</h3></q-card-section>
                <q-card-section class="row footer">
                    <div class="col-12">
                        <q-btn type="button" label="view" flat />
                    </div>
                </q-card-section>
            </q-card>
        </div>
        <div class="col-10 col-md-4">
            <q-card class="users-analytics-card">
                <q-card-section class="header">
                    <label>KYC Not Verified</label>
                </q-card-section>
                <q-card-section class="body text-center"><h3>299</h3></q-card-section>
                <q-card-section class="row footer">
                    <div class="col-12">
                        <q-btn type="button" label="view" flat />
                    </div>
                </q-card-section>
            </q-card>
        </div>
  </div>
</template>

<script>
export default {
    name: 'UsersAnalyticsCards',
    async mounted () {
        console.log('test')
    }
}
</script>

<style lang="scss" scoped>
#root {
    .users-analytics-card {
        margin: 0 10px;
        color: #FBFBFB;
        margin-bottom: 20px;

        .header {
            background-color: #0b0c22;
            max-height: 56px;
            text-align: center;

            // .img-icon {
            //     width: 32px;
            //     margin: 0 7px 0 0;
            //     position: relative;
            //     top: -2px;
            // }

            label {
                font-size: 1rem;
                position: relative;
                bottom: 12px;
            }
        }
        .body {
            background-image: linear-gradient(to right, #2D5EF5, #44B6F4);
            height: 130px;
            
            h3 {
                margin-top: 1rem;
            }
        }
        .footer {
            background-color: #00a1ff;
            height: 30px;
            max-height: 30px;
            padding: 0px;

            button {
                padding: 0 !important;
                min-height: 0 !important;
                width: 100%;
                height: 100%;
                margin: 0;
            }
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
}
</style>