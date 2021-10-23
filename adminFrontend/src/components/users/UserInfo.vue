<template>
  <div class="row" id="root" v-if="user.verificationStatus === 'basic information pending' || user.verificationStatus === 'identity information pending' || user.verificationStatus === 'proof of address pending'">
      <div class="col-12 text-center" id="user-info-col">
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
          <q-card id="img-cards">
            <div class="row">
                <div class="col-4" v-for="(item, index) in user.lightbox.items" :key="index">
                    <q-card class="img-card" @click="openLightBox(index)">
                        <q-img :src="user.lightbox.items[index].src" v-if="user.lightbox.items[0].src !== undefined || user.lightbox.items[index].src !== null">
                            <div class="absolute-bottom text-subtitle2 text-center">
                            {{ user.lightbox.items[index].title }}
                            </div>
                        </q-img>
                    </q-card>
                </div>
            </div>
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

      <vue-easy-lightbox
        scrollDisabled
        :visible="user.lightbox.visible"
        :imgs="user.lightbox.items"
        :index="user.lightbox.index"
        @hide="hideLightBox"
      ></vue-easy-lightbox>
  </div>
</template>

<script>
import moment from 'moment';
import VueEasyLightbox from 'vue-easy-lightbox'
import PvcModal from '../global/PvcModal.vue'
export default {
    name: "UserKycInfo",
    components: {
        PvcModal,
        VueEasyLightbox
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
        user: {
            lightbox: {
                visible: false,
                index: 0,
                items: []
            }
        },
        carousel: {
            slide: 1
        }
    }),
    async beforeMount () {
    },
    async mounted () {
        this.init()
        console.log(VueEasyLightbox)
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
        },
        async openLightBox (index) {
            this.user.lightbox.visible = true
            this.user.lightbox.index = index
        },
        async hideLightBox() {
            this.user.lightbox.visible = false
        },
        async init () {
            // fetch user data
            this.user = await this.getUserInfo(this.$route.params.id)
            this.user.name = this.user.lastName + ', ' + this.user.firstName + ', ' + this.user.middleName
            if (this.user.verificationStatus === 'proof of address pending') {
                this.carousel.slide = 3
            }else {
                this.carousel.slide = 1
            }

            this.user.lightbox = {}
            this.user.lightbox.visible = false
            this.user.lightbox.index = 0
            this.user.lightbox.items = [
                {
                    title: 'Selfie',
                    src: this.user.selfieImage
                },
                {
                    title: 'ID',
                    src: this.user.idImage
                },
                {
                    title: 'Proof of address',
                    src: this.user.addressImage
                }
            ]
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

    #user-info-col {
        margin-bottom: 20px;
    }

    #img-cards {
        background-color: #0b0c22 !important;
        padding: 16px 0;
    }

    .img-card {
        margin: 0 10px !important;
        cursor: pointer !important;
        :deep(.q-img.q-img--menu) {
            height: 40vh;
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