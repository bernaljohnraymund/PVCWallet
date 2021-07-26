<template>
  <div>
      <q-form id="login-form">
        <div class="text-h4 text-center heading">
            Welcome
        </div>
        <div class="text-subtitle1 text-center sub-heading">Sign in to your account</div>
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
        <q-space class="q-py-md" />
        <q-btn  label="Login" size="lg" dense class="login-btn"/>
        <div class="row q-py-lg" style="font-size: 13px">
            <div class="col-6 text-left">
                <a href="#" style="color: #43b3f4;">Forgot password?</a>
            </div>
            <div class="col-6 text-right">
                <a href="#" style="color: #43b3f4;"> Sign up</a>
            </div>
        </div>
      </q-form>
  </div>
</template>

<script>
export default {
    name: "Login",
    components: {},
    data: () => ({
        form: {
            username: '',
            password: '',
            isPwd: true
        }
    }),
    methods: {
        togglePasswordVisibility () {
            this.form.isPwd = !this.form.isPwd
        }
    }
}
</script>

<style lang="scss" scoped>
    #login-form {
        padding: 0 14px;
        position: relative;
        top: 22vh;
    }
    #login-form > .heading {
        color: #FBFBFB;
    }
    #login-form > .sub-heading {
        color: #FBFBFB;
        margin: 0 0 32px 0;
    }
    #login-form .login-btn {
        display: block;
        margin: auto;
        text-align: center;
        border-radius: 10px;
        width: 60%;
        color: #FBFBFB;
        background-image: linear-gradient(to right, #2D5EF5, #44B6F4);
        
    }
</style>