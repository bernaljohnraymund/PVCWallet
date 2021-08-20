<template>
  <div id="root" class="row">
      <div class="col-10 col-md-6">
          <q-card :class="`kyc-card ${user.kycLevel > 1 ? 'verified' : 'unverified'} basic`">
                <q-card-section class="header">
                    <label for="">Personal Information</label>
                </q-card-section>
                <q-card-section class="body text-center">
                    <q-icon name="perm_identity" :color="user.kycLevel > 1 ? 'green' : 'white'" />
                    <q-icon name="verified" color="green" v-if="user.kycLevel > 1" />
                </q-card-section>
                <q-card-section class="row footer">
                    <div class="col-12">
                        <q-btn type="button" :label="user.kycLevel > 1 ? 'verified' : 'verify'" flat @click="user.kycLevel <= 1 ? $router.push({ name: 'BasicInformation' }) : ''" />
                    </div>
                </q-card-section>
            </q-card>
      </div>
      <div class="col-10 col-md-6">
          <q-card :class="`kyc-card ${user.kycLevel > 2 ? 'verified' : 'unverified'} intermidiate`">
                <q-card-section class="header">
                    <!-- <img src="/icons/wallet.png" class="img-icon" /> -->
                    <label>Identity Verification</label>
                </q-card-section>
                <q-card-section class="body text-center">
                    <q-icon name="fingerprint" :color="user.kycLevel > 2 ? 'green' : 'white'" />
                    <q-icon name="verified" color="green" v-if="user.kycLevel > 2" />
                </q-card-section>
                <q-card-section class="row footer">
                    <div class="col-12">
                        <q-btn type="button" :disabled="user.kycLevel < 2" :label="user.kycLevel > 2 ? 'verified' : 'verify'" flat />
                    </div>
                </q-card-section>
            </q-card>
      </div>
      <!-- <div class="col-10 col-md-6">
          <q-card :class="`kyc-card ${user.kycLevel > 3 ? 'verified' : 'unverified'} advance`">
                <q-card-section class="header">
                    <label>Address Information</label>
                </q-card-section>
                <q-card-section class="body text-center">
                    <q-icon name="place" :color="user.kycLevel > 3 ? 'green' : 'white'" />
                    <q-icon name="verified" color="green" v-if="user.kycLevel > 3" />
                </q-card-section>
                <q-card-section class="row footer">
                    <div class="col-12">
                        <q-btn type="button" :disabled="user.kycLevel < 3" :label="user.kycLevel > 3 ? 'verified' : 'verify'" flat />
                    </div>
                </q-card-section>
            </q-card>
      </div> -->
  </div>
  
</template>

<script>
export default {
    name: 'Kyc',
    data: () => ({
        user: {
            kycLevel: 1
        }
    })
}
</script>

<style lang="scss" scoped>
    #root {
        .kyc-card {
            background-color: #1c1e47;

            .footer button {
                width: 100%;
            }
        }
        .kyc-card.unverified {
            .footer button {
                background-image: linear-gradient(to right, #2D5EF5, #44B6F4);
            }
        }
        .kyc-card.verified {
            .footer button {
                background-color: #00e676;
            }
        }
    }
     @media (min-width:320px)  {
            /* smartphones, iPhone, portrait 480x320 phones */
            #root {
                > div {
                    margin: 0 auto 17px;
                }
                .header {
                    font-size: 1.4rem;
                    text-align: center;
                }
                .body {
                    font-size: 5rem;
                }
            }
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
        #root {
            color: #FBFBFB;
            > div {
                margin: 0 0 17px 0 !important;
            }
            .kyc-card {
                margin: 0 10px !important;
                
                .header > label {
                    font-family: Roboto;
                    font-size: 24px;
                }
                .body {
                    padding: 0;
                    min-height: 27vh;
                    font-size: 7rem;
                }

            }
        }
    }
</style>