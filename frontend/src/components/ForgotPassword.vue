<template>
  <div>
      <q-form id="forgot-password-form">
        <div class="text-h4 text-center heading">
            Reset Password
        </div>
        <div class="text-subtitle1 text-center sub-heading">We will send a link to your {{ tab }}</div>
        <q-tabs
          v-model="tab"
          dense
          style="color: #FBFBFB;"
          active-color="light-blue-6"
          indicator-color="light-blue-6"
          align="justify"
          narrow-indicator
        >
          <q-tab name="email" label="Email"/>
          <q-tab name="phone" label="Phone"/>
        </q-tabs>
        <div class="tab-inputs">
            <q-input v-model="form.email"
                type="email"
                bg-color="white"
                label="Email"
                outlined
                rounded
                v-if="tab === 'email'"
            >
                <template v-slot:prepend>
                    <span style="color: #0b0c22">
                        <q-icon
                            name="contact_mail"
                        />
                    </span>
                </template>
            </q-input>
            <q-input v-model="form.contactNumber"
                type="text"
                bg-color="white"
                label="Phone Number"
                outlined
                rounded
                pattern="[0-9]+"
                title="field accepts number only"
                v-if="tab === 'phone'"
            >
                <template v-slot:prepend>
                    <span style="color: #0b0c22">
                        <q-icon
                            name="smartphone"
                        />
                    </span>
                </template>
            </q-input>
        </div>
        <q-space class="q-py-md" />
        <q-btn  label="Submit" size="lg" type="submit" dense class="submit-btn"/>
        <div class="row account-links">
            <div class="col-6 text-left">
                <a href="#" style="color: #43b3f4; text-decoration: none; cursor: pointer;" @click="changeActiveComponent('login')">Login</a>
            </div>
            <div class="col-6 text-right">
                <a href="#" style="color: #43b3f4; text-decoration: none; cursor: pointer;" @click="changeActiveComponent('register')">Sign up</a>
            </div>
        </div>
      </q-form>
  </div>
</template>

<script>
export default {
    name: "ForgotPassword",
    components: {},
    data: () => ({
        form: {
            email: '',
            contactNumber: null
        },
        tab: 'email'
    }),
    methods: {
        togglePasswordVisibility () {
            this.form.isPwd = !this.form.isPwd
        },
        changeActiveComponent (component) {
            console.log(component)
            this.$emit('changeActiveComponent', { component })
        }
    }
}
</script>

<style lang="scss" scoped>
    #forgot-password-form {
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

        .tab-inputs {
            margin-top: 14px;
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
        #forgot-password-form {
            padding: 0 10vw;
        }
    }
    @media (min-width:641px)  {
        /* portrait tablets, portrait iPad, landscape e-readers, landscape 800x480 or 854x480 phones */
        #forgot-password-form {
            padding: 0 12vw;

            .submit-btn {
                max-width: 268px;
            }
        }
    }
    @media (min-width:961px)  {
        /* tablet, landscape iPad, lo-res laptops ands desktops */
        #forgot-password-form {
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