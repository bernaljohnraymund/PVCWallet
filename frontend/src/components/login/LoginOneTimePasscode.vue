<template>
  <div>
      <q-form id="otp-form" @submit="submitLoginOtp">
        <div class="text-h4 text-center heading">
            One Time Passcode
        </div>
        <div class="text-subtitle1 text-center sub-heading">We will send you a passcode</div>
        <q-space class="q-py-xs" />
        <q-input v-model="form.emailPasscode"
            type="text"
            bg-color="white"
            outlined
            rounded
            input-class="text-center"
            class="otp-input"
            maxlength="6"
            label="Email code"
        >
            <template v-slot:prepend>
                <span style="color: #0b0c22">
                    <q-icon
                        name="email"
                    />
                </span>
            </template>
            <template v-slot:append>
                <q-btn size="md" flat class="otp-send-btn" type="button" @click="setOtp('email')" :disable="form.emailBtnLoading" >
                    <q-spinner-tail color="#FBFBFB" v-if="form.emailBtnLoading"></q-spinner-tail>
                    <span v-if="form.emailBtnLoading === false">SEND</span>
                </q-btn>
            </template>
        </q-input>
        <!-- <q-space class="q-py-xs" />
        <q-input v-model="form.phonePasscode"
            type="text"
            bg-color="white"
            outlined
            rounded
            input-class="text-center"
            class="otp-input"
            maxlength="6"
            label="Phone verification code"
        >
            <template v-slot:prepend>
                <span style="color: #0b0c22">
                    <q-icon
                        name="smartphone"
                    />
                </span>
            </template>
            <template v-slot:append>
                <q-btn label="send" size="md" class="otp-send-btn" />
            </template>
        </q-input>
        <q-space class="q-py-xs" />
        <q-input v-model="form.googlePasscode"
            type="text"
            bg-color="white"
            outlined
            rounded
            input-class="text-center"
            class="otp-input"
            maxlength="6"
            label="Google verification code"
        >
            <template v-slot:prepend>
                <span style="color: #0b0c22">
                    <q-icon
                        name="lock"
                    />
                </span>
            </template>
            <template v-slot:append>
                <q-btn label="send" size="md" class="otp-send-btn" />
            </template>
        </q-input> -->
        <q-space class="q-py-md" />
        <q-btn size="lg" flat type="submit" dense class="submit-btn" :disable="form.submitBtnLoading">
            <q-spinner-tail color="#FBFBFB" v-if="form.submitBtnLoading"></q-spinner-tail>
            <span v-if="form.submitBtnLoading === false">SUBMIT</span>
        </q-btn>
        <div class="row account-links">
            <div class="col-12 text-center">
                <span style="color: #FBFBFB; cursor: pointer;">Wrong account? </span> <a href="#" style="color: #43b3f4; text-decoration: none;" @click="changeActiveComponent('login')">Log in</a>
            </div>
        </div>
      </q-form>
  </div>
</template>

<script>
export default {
    name: "LoginOneTimePasscode",
    components: {},
    data: () => ({
        form: {
            emailPasscode: '',
            phonePasscode: '',
            googlePasscode: '',
            username: '',
            emailBtnLoading: false,
            phoneBtnLoading: false,
            googleAuthBtnLoading: false,
            submitBtnLoading: false
        },
        key: null
    }),
    async mounted () {
        // create a function that will get user's auth security (phone, google auth)
    },
    methods: {
        togglePasswordVisibility () {
            this.form.isPwd = !this.form.isPwd
        },
        changeActiveComponent (component) {
            this.$emit('changeActiveComponent', { component })
        },
        async setOtp (to) {
            if (to === 'email') {
                this.form.emailBtnLoading = true;
            }

            const otp = await this.$api({
                url: '/user/generateotp',
                method: 'POST',
                data: { to, username: this.form.username, operation: 'login' }
            })

            if (otp.data.status === 'fail') {
                otp.data.errors.forEach((val) => {
                    this.$q.notify({
                        type: 'negative',
                        progress: true,
                        html: true,
                        icon: 'warning',
                        message: `<span style="font-color: white;">${val}</span>`,
                        position: 'top-left',
                    })
                })
            }else
            if (otp.data.status === 'success') {
                this.$q.notify({
                    type: 'positive',
                    progress: true,
                    html: true,
                    icon: 'warning',
                    message: `<span style="font-color: white;">${otp.data.message}</span>`,
                    position: 'top',
                })
            }

            if (to === 'email') {
                this.form.emailBtnLoading = false;
            }
        },
        async submitLoginOtp () {
            this.form.submitBtnLoading = true;

            let loginOtpAuthRes = await this.$api({
                url: '/user/verifyotp',
                method: 'POST',
                data: {
                    username: this.form.username,
                    operation: 'login',
                    phoneCode: this.form.phonePasscode,
                    emailCode: this.form.emailPasscode,
                    googleCode: this.form.googlePasscode
                }
            })

            if (loginOtpAuthRes.data.status === 'fail') {
                loginOtpAuthRes.data.errors.forEach((val) => {
                    this.$q.notify({
                        type: 'negative',
                        progress: true,
                        html: true,
                        icon: 'warning',
                        message: `<span style="font-color: white;">${val}</span>`,
                        position: 'top-left',
                    })
                })
            }else
            if (loginOtpAuthRes.data.status === 'success') {
                this.$q.notify({
                    type: 'positive',
                    progress: true,
                    html: true,
                    icon: 'warning',
                    message: `<span style="font-color: white;">${loginOtpAuthRes.data.message}</span>`,
                    position: 'top',
                })
                // sessionStorage.setItem('pvccrypto_token', loginOtpAuthRes.data.token);
                // sessionStorage.setItem('username', loginOtpAuthRes.data.token);
                const user = {
                    token: loginOtpAuthRes.data.token,
                    username: loginOtpAuthRes.data.username,
                    email: loginOtpAuthRes.data.email,
                    firstName: loginOtpAuthRes.data.firstName,
                    middleName: loginOtpAuthRes.data.middleName,
                    lastName: loginOtpAuthRes.data.lastName,
                }

                console.log(this.$getUser())
                this.$setUser(user)
                console.log(this.$getUser())
                this.$router.push({ name: 'Dashboard' })
                // location.reload();
            }

            this.form.submitBtnLoading = false;
        },
        getKey () {
            // this.key = key;
            console.log(this.key)
        }
    }
}
</script>

<style lang="scss" scoped>
    #otp-form {
        padding: 0 14px;
        position: relative;
        top: 22vh;
        
        .heading {
            color: #FBFBFB;
        }

        .sub-heading {
            color: #FBFBFB;
            margin: 0 0 32px 0;
        }
        
        .otp-send-btn {
            background-image: linear-gradient(to right, #2D5EF5, #44B6F4);
            color: #FBFBFB;
        }

        .submit-btn {
            display: block;
            margin: auto;
            text-align: center;
            border-radius: 10px;
            width: 60%;
            color: #FBFBFB;
            background-image: linear-gradient(to right, #2D5EF5, #44B6F4);
        }

        .account-links {
            font-size: 14px;
            margin-top: 40px !important;
        }
    }
    @media (min-width:320px)  {
        /* smartphones, iPhone, portrait 480x320 phones */
        
    }
    @media (min-width:481px)  {
        /* portrait e-readers (Nook/Kindle), smaller tablets @ 600 or @ 640 wide. */
        #otp-form {
            padding: 0 10vw;
        }
    }
    @media (min-width:641px)  {
        /* portrait tablets, portrait iPad, landscape e-readers, landscape 800x480 or 854x480 phones */
        #otp-form {
            padding: 0 12vw;

            .submit-btn {
                max-width: 268px;
            }
        }
    }
    @media (min-width:961px)  {
        /* tablet, landscape iPad, lo-res laptops ands desktops */
        #otp-form {
            padding: 0 14px;

            .submit-btn {
                max-width: none;
            }
        }
    }
    @media (min-width:1025px) {
        /* big landscape tablets, laptops, and desktops */

    }
    @media (min-width:1281px) {
        /* hi-res laptops and desktops */
    }
</style>