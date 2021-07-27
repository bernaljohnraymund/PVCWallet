<template>
  <div>
      <q-form id="register-form">
        <div class="text-h4 text-center heading">
            Sign up
        </div>
        <div class="text-subtitle1 text-center sub-heading">Sign up your account</div>
        <q-input v-model="form.username"
            type="text"
            bg-color="white"
            label="Username"
            outlined
            rounded
        >
            <template v-slot:prepend>
                <span style="color: #0b0c22">
                    <q-icon
                        name="account_circle"
                    />
                </span>
            </template>
        </q-input>
        <q-space class="q-py-xs" />
        <q-input v-model="form.email"
            type="email"
            bg-color="white"
            label="Email"
            outlined
            rounded
        >
            <template v-slot:prepend>
                <span style="color: #0b0c22">
                    <q-icon
                        name="contact_mail"
                    />
                </span>
            </template>
        </q-input>
        <q-space class="q-py-xs" />
        <q-input v-model="form.password"
            :type="form.isPwd ? 'password' : 'text'"
            bg-color="white"
            label="Password"
            outlined
            rounded
        >
            <template v-slot:prepend>
                <span style="color: #0b0c22">
                    <q-icon
                        name="vpn_key"
                    />
                </span>
            </template>
            <template v-slot:append>
                <span style="color: #0b0c22">
                    <q-icon
                        :name="form.isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="togglePasswordVisibility()"
                    />
                </span>
            </template>
        </q-input>
        <q-space class="q-py-xs" />
        <q-input v-model="form.confirmPassword"
            :type="form.isPwd ? 'password' : 'text'"
            bg-color="white"
            label="Confirm password"
            outlined
            rounded
        >
            <template v-slot:prepend>
                <span style="color: #63bb20">
                    <q-icon
                        name="vpn_key"
                    />
                </span>
            </template>
            <template v-slot:append>
                <span style="color: #0b0c22">
                    <q-icon
                        :name="form.isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="togglePasswordVisibility()"
                    />
                </span>
            </template>
        </q-input>
        <q-space class="q-py-md" />
        <q-btn  label="Sign up" size="lg" dense class="register-btn"/>
        <div class="row account-links">
            <div class="col-12 text-center">
                <span style="color: #FBFBFB; cursor: pointer;">Already registered? </span> <a href="#" style="color: #43b3f4; text-decoration: none;" @click="changeActiveComponent('login')">Log in</a>
            </div>
        </div>
      </q-form>
  </div>
</template>

<script>
export default {
    name: "Register",
    data: () => ({
        form: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            isPwd: true
        }
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
    #register-form {
        padding: 0 14px;
        position: relative;
        top: 14vh;
        
        .heading {
            color: #FBFBFB;
        }

        .sub-heading {
            color: #FBFBFB;
            margin: 0 0 32px 0;
        }

        .register-btn {
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