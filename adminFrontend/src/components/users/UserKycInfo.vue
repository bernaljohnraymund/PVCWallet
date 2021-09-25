<template>
  <div class="row" id="root" v-if="user.verificationStatus === 'basic information pending' || user.verificationStatus === 'identity information pending' || user.verificationStatus === 'proof of address pending'">
      <div class="col-12" v-if="user.verificationStatus === 'basic information pending' || user.verificationStatus === 'identity information pending' || user.verificationStatus === 'proof of address pending'">
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
      </div>
      <div class="col-12" v-if="user.verificationStatus === 'identity information pending' || user.verificationStatus === 'proof of address pending'">
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
      </div>
      <div class="col-12" v-if="user.verificationStatus === 'proof of address pending'">
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
                    <q-btn label="confirm" id="confirmBtn" @click="confirmUserInfoAction('confirm')" flat />
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
        PvcModal
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
        user: {}
    }),
    async beforeMount () {
    },
    async mounted () {
        this.user = await this.getUserInfo(this.$route.params.id)
    },

    methods: {
        async getUserInfo (id) {
            const userInfoRes = await this.$api({
                method: 'GET',
                url: `admin/user/${id}`
            })

            return userInfoRes.data.payload
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
#approveBtn, #confirmBtn {
    background-image: linear-gradient(to right, #2D5EF5, #44B6F4);
}
#rejectBtn, #cancelBtn {
    background-image: linear-gradient(to right, #f52d2d, #fa3030);
}
.btn-margin {
    display: inline-block;
    width: 10px;
}
</style>