<template>
  <div>
      <q-form id="login-form" @submit="login">
        <div class="text-h4 text-center heading">
            Welcome
        </div>
        <div class="text-subtitle1 text-center sub-heading">Sign in to your account</div>
        <q-input v-model="form.username"
            type="text"
            bg-color="white"
            label="Email or username"
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
        <q-btn size="lg" type="submit" dense class="login-btn">
            <q-spinner-tail color="#FBFBFB" size="2rem" v-if="form.loading"></q-spinner-tail>
            <span v-if="form.loading === false">LOGIN</span>
        </q-btn>
        <div class="row account-links">
            <div class="col-6 text-left">
                <a href="#" style="color: #43b3f4; text-decoration: none; cursor: pointer;" @click="changeActiveComponent('forgot-password')">Forgot password?</a>
            </div>
            <div class="col-6 text-right">
                <a href="#" style="color: #43b3f4; text-decoration: none; cursor: pointer;" @click="changeActiveComponent('register')"> Sign up</a>
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
            isPwd: true,
            loading: false
        }
    }),
    methods: {
        togglePasswordVisibility () {
            this.form.isPwd = !this.form.isPwd
        },
        changeActiveComponent (component, data) {
            this.$emit('changeActiveComponent', { component, ...data })
        },
        async login () {
            this.form.loading = true;
            let loginRes = await this.$api({
                url: '/user/login',
                method: 'POST',
                data: {
                    username: this.form.username,
                    password: this.form.password,
                }
            })

            delete loginRes.config;

            if (loginRes.data.status === 'fail') {
                loginRes.data.errors.forEach((val) => {
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
            if (loginRes.data.status === 'success') {
                this.$q.notify({
                        type: 'positive',
                        progress: true,
                        html: true,
                        message: `<span style="font-color: white;">Verification</span>`,
                        icon: 'lock',
                        position: 'top-left',
                    })
                    this.changeActiveComponent('login-one-time-passcode', {
                        key: loginRes.data.message,
                        username: this.form.username
                    });
            }
            this.form.loading = false;
        }
    }
}
</script>

<style lang="scss" scoped>
    
    #login-form {
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

        .login-btn {
            display: block;
            margin: auto;
            text-align: center;
            border-radius: 10px;
            width: 60%;
            color: #FBFBFB;
            background-image: linear-gradient(to right, #2D5EF5, #44B6F4);
            height: 7vh;
        }

        .account-links {
            font-size: 14px;
            margin-top: 40px;
        }
    }
    
    @media (min-width:320px)  {
        /* smartphones, iPhone, portrait 480x320 phones */
        
    }
    @media (min-width:481px)  {
        /* portrait e-readers (Nook/Kindle), smaller tablets @ 600 or @ 640 wide. */
        #login-form {
            padding: 0 10vw;
        }
    }
    @media (min-width:641px)  {
        /* portrait tablets, portrait iPad, landscape e-readers, landscape 800x480 or 854x480 phones */
        #login-form {
            padding: 0 12vw;

            .login-btn {
                max-width: 268px;
            }
        }
    }
    @media (min-width:961px)  {
        /* tablet, landscape iPad, lo-res laptops ands desktops */
        #login-form {
            padding: 0 14px;

            .login-btn {
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