<template>
  <div class="row" id="root" v-if="user.verificationStatus === 'basic information pending' || user.verificationStatus === 'identity information pending' || user.verificationStatus === 'proof of address pending'">
      <!-- <div class="col-12" v-if="user.verificationStatus === 'basic information pending' || user.verificationStatus === 'identity information pending' || user.verificationStatus === 'proof of address pending'">
            <q-toolbar class="bg-primary text-white shadow-2">
                <q-toolbar-title>Basic Information</q-toolbar-title>
            </q-toolbar>
            <q-list bordered>
                <q-item>
                    <q-item-section>
                        First name
                    </q-item-section>
                    <q-item-section>
                        {{ user.firstName }}
                    </q-item-section>
                </q-item>
                <q-item>
                    <q-item-section>
                        Middle name
                    </q-item-section>
                    <q-item-section>
                        {{ user.middleName }}
                    </q-item-section>
                </q-item>
                <q-item>
                    <q-item-section>
                        Last name
                    </q-item-section>
                    <q-item-section>
                        {{ user.lastName }}
                    </q-item-section>
                </q-item>
                <q-item>
                    <q-item-section>
                        Birthdate
                    </q-item-section>
                    <q-item-section>
                        {{ moment(user.birthDate).format('DD MMM YYYY') }}
                    </q-item-section>
                </q-item>
                <q-item>
                    <q-item-section>
                        Country
                    </q-item-section>
                    <q-item-section>
                        {{ user.countryName }}
                    </q-item-section>
                </q-item>
                <q-item>
                    <q-item-section>
                        House number
                    </q-item-section>
                    <q-item-section>
                        {{ user.houseNumber }}
                    </q-item-section>
                </q-item>
                <q-item>
                    <q-item-section>
                        Postal
                    </q-item-section>
                    <q-item-section>
                        {{ user.houseNumber }}
                    </q-item-section>
                </q-item>
                <q-item>
                    <q-item-section>
                        City
                    </q-item-section>
                    <q-item-section>
                        {{ user.houseNumber }}
                    </q-item-section>
                </q-item>
            </q-list>
      </div> -->
      <!-- <div class="col-12" v-if="user.verificationStatus === 'identity information pending' || user.verificationStatus === 'proof of address pending'">
            <q-toolbar class="bg-primary text-white shadow-2">
                <q-toolbar-title>Identity Information</q-toolbar-title>
            </q-toolbar>
            <q-list>
                <q-item>
                    <q-item-section>
                        Selfie image
                    </q-item-section>
                    <q-item-section>
                        <q-img :src="user.selfieImage" />
                    </q-item-section>
                </q-item>
                <q-item>
                    <q-item-section>
                        ID image
                    </q-item-section>
                    <q-item-section>
                        <q-img :src="user.idImage" />
                    </q-item-section>
                </q-item>
            </q-list>
      </div> -->
      <!-- <div class="col-12" v-if="user.verificationStatus === 'proof of address pending'">
            <q-toolbar class="bg-primary text-white shadow-2">
                <q-toolbar-title>Proof of Address</q-toolbar-title>
            </q-toolbar>
            <q-list>
                <q-item>
                    <q-item-section>
                        Address image
                    </q-item-section>
                    <q-item-section>
                        <q-img :src="user.addressImage" />
                    </q-item-section>
                </q-item>
            </q-list>
      </div> -->
      <div class="col-12 text-center">
          <q-card id="user-info-card">
              <q-card-section class="body">
                  <div class="row">
                      <div class="col-12 col-md-6">
                          <q-input type="text" label="Name" v-model="user.name" name="name" readonly />
                      </div>
                      <div class="col-12 col-md-6">
                          <q-input type="text" label="Birthdate" v-model="user.birthDate" name="birthDate" readonly />
                      </div>
                  </div>
                  <div class="row">
                      <div class="col-12 col-md-6">
                          <q-input type="text" label="House number" v-model="user.houseNumber" name="countryName" readonly />
                      </div>
                      <div class="col-12 col-md-6">
                          <q-input type="text" label="Street" v-model="user.street" name="street" readonly />
                      </div>
                  </div>
                  <div class="row">
                      <div class="col-12 col-md-6">
                          <q-input type="text" label="Postal code" v-model="user.houseNumber" name="postalCode" readonly />
                      </div>
                      <div class="col-12 col-md-6">
                          <q-input type="text" label="City" v-model="user.city" name="birthDate" readonly />
                      </div>
                  </div><div class="row">
                      <div class="col-12">
                          <q-input type="text" label="Country of Residence" v-model="user.countryName" name="country" readonly />
                      </div>
                  </div>
              </q-card-section>
          </q-card>
      </div>
      <div class="col-12" id="carousel-col" v-if="user.verificationStatus === 'identity information pending' || user.verificationStatus === 'proof of address pending'">
          <q-card>
              <q-card-section class="body">
                <q-carousel
                    swipeable
                    animated
                    v-model="carousel.slide"
                    thumbnails
                    infinite
                    id="carousel"
                >
                    <q-carousel-slide :name="1" v-if="user.idImage && (user.verificationStatus === 'identity information pending' || user.verificationStatus === 'proof of address pending')" :img-src="user.idImage"/>
                    <q-carousel-slide :name="2" v-if="user.selfieImage && (user.verificationStatus === 'identity information pending' || user.verificationStatus === 'proof of address pending')" :img-src="user.selfieImage"/>
                    <q-carousel-slide :name="3" v-if="user.addressImage && user.verificationStatus === 'proof of address pending'" :img-src="user.addressImage" />
                </q-carousel>
              </q-card-section>
          </q-card>
      </div>
      <div class="col-12 text-center">
          <q-btn label="approve" id="approveBtn" @click="callUserInfoModal('approve')" flat />
          <span class="btn-margin"></span>
          <q-btn label="reject" id="rejectBtn" @click="callUserInfoModal('reject')" flat />
      </div>
      <pvc-modal :modal="userInfoConfirmationModal" id="userInfoConfirmationModal" ref="userInfoConfirmationModal">
            <template v-slot:body>
                <h6 class="text-center q-my-none">Are you sure?</h6>
                <p class="text-caption text-center">(this action can not be undone)</p>
            </template>
            <template v-slot:footer>
                <div class="text-center">
                    <q-btn label="confirm" id="confirmBtn" @click="confirmUserInfoAction('confirm')" flat  />
                    <span class="btn-margin"></span>
                    <q-btn label="cancel" id="cancelBtn" @click="confirmUserInfoAction('cancel')" flat />
                </div>
            </template>
      </pvc-modal>
  </div>
</template>

<script>
import moment from 'moment';
import PvcModal from '../global/PvcModal.vue'
export default {
    name: "UserKycInfo",
    components: {
        PvcModal,
    },
    data: () => ({
        moment,
        userInfoConfirmationModal: {
            isPersistent: true,
            // isHeaderEnabled: true,
            isFooterEnabled: true,
            action: '',
            headerStyle: '',
            bodyStyle: '',
            footerStyle: 'padding-top: 0'
        },
        user: {},
        carousel: {
            slide: 1
        }
    }),
    async beforeMount () {
    },
    async mounted () {
        this.user = await this.getUserInfo(this.$route.params.id)
        this.user.name = this.user.lastName + ', ' + this.user.firstName + ', ' + this.user.middleName
        if (this.user.verificationStatus === 'proof of address pending') {
            this.carousel.slide = 3
        }else {
            this.carousel.slide = 1
        }
    },

    methods: {
        async getUserInfo (id) {
            const userInfoRes = await this.$api({
                method: 'GET',
                url: `admin/user/${id}`
            })

            return { ...userInfoRes.data.payload }
        },
        async callUserInfoModal (action) {
            this.userInfoConfirmationModal.action = action
            this.$refs['userInfoConfirmationModal'].show()
        },
        async confirmUserInfoAction (action) {
            this.$q.loading.show()
            if (action === 'cancel') {
                this.$refs['userInfoConfirmationModal'].hide()
            }else
            if (action === 'confirm') {
                let newVerificationStatus;
                if (this.userInfoConfirmationModal.action === 'approve') {
                    if (this.user.verificationStatus === 'basic information pending') {
                        newVerificationStatus = 'basic information success'
                    }else
                    if (this.user.verificationStatus === 'identity information pending') {
                        newVerificationStatus = 'identity information success'
                    }else
                    if (this.user.verificationStatus === 'proof of address pending') {
                        newVerificationStatus = 'proof of address success'
                    }
                }else
                if (this.userInfoConfirmationModal.action === 'reject') {
                    if (this.user.verificationStatus === 'basic information pending') {
                        newVerificationStatus = 'basic information failed'
                    }else
                    if (this.user.verificationStatus === 'identity information pending') {
                        newVerificationStatus = 'identity information failed'
                    }else
                    if (this.user.verificationStatus === 'proof of address pending') {
                        newVerificationStatus = 'proof of address failed'
                    }
                }
                const updateUserVerificationRes = await this.$api({
                    method: 'PUT',
                    url: `admin/user/${this.$route.params.id}`,
                    data: {
                        updateType: 'userKycVerification',
                        verificationStatus: newVerificationStatus
                    }
                })

                if (updateUserVerificationRes.data.status === 'fail') {
                    updateUserVerificationRes.data.errors.forEach(error => {
                        this.$q.notify({
                            type: 'negative',
                            progress: true,
                            html: true,
                            message: `<span style="font-color: white;">${error}</span>`,
                            position: 'top',
                        })
                    })
                }else
                if (updateUserVerificationRes.data.status === 'success') {
                    this.$q.notify({
                        type: updateUserVerificationRes.data.message === 'user has been rejected' ? 'negative' : 'positive',
                        progress: true,
                        html: true,
                        message: `<span style="font-color: white;">${updateUserVerificationRes.data.message}</span>`,
                        position: 'top',
                    })
                }
                this.$router.push({ name: 'Users' })
            }
            this.$q.loading.hide()
        }
    }
}
</script>

<style lang="scss" scoped>
#confirmBtn {
    background-image: linear-gradient(to right, #2D5EF5, #44B6F4) !important;
}
#cancelBtn {
    background-image: linear-gradient(to right, #f52d2d, #fa3030) !important;
}

.btn-margin {
    display: inline-block;
    width: 10px;
}
#root {
    #user-info-card {
        background-color: #0b0c22 !important;
    }
    #approveBtn, #rejectBtn {
        margin-top: 20px;
    }
    #approveBtn {
        background-image: linear-gradient(to right, #2D5EF5, #44B6F4) !important;
    }
    #rejectBtn {
        background-image: linear-gradient(to right, #f52d2d, #fa3030) !important;
    }

    #carousel-col {
        margin-top: 20px;
        .q-card {
            background-color:#0b0c22;
        }
        .body {
            background-color:#0b0c22;
        }
    }

    #carousel {
        background-color:#0b0c22;
        :deep(.q-carousel__slide) {
            background-size: contain;
            background-repeat: no-repeat;
        }
    }

    :deep(.q-field) {
        background-color: #10122d;
        .q-field__prepend, .q-field__append {
            color: #FBFBFB !important;
        }
    }

    :deep(input), :deep(.q-field__label) {
        color: #FBFBFB;
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
    #user-info-card {
        :deep(.q-field) {
            padding: 0 5px;
        }
        .row:nth-of-type(1) > div:nth-of-type(1), .row:nth-of-type(2) > div:nth-of-type(1), .row:nth-of-type(3) > div:nth-of-type(1) {
            padding-right: 5px;
        }
        .row:nth-of-type(1) > div:nth-of-type(2), .row:nth-of-type(2) > div:nth-of-type(2), .row:nth-of-type(3) > div:nth-of-type(2) {
            padding-left: 5px;
        }
        > .body > .row div {
            margin-bottom: 12px;
        }
    }
}
</style>