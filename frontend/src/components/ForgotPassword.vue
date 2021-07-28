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
        <q-btn  label="Submit" size="lg" type="submit" dense class="login-btn"/>
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

        .login-btn {
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
</style>