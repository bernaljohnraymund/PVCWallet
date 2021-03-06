<template>
  <div>
      <q-form id="register-form" @submit="register">
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
        <q-btn size="lg" type="submit" dense class="register-btn"> 
            <q-spinner-tail color="#FBFBFB" size="2rem" v-if="form.loading"></q-spinner-tail>
            <span v-if="form.loading === false">SUBMIT</span>
        </q-btn>
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
            isPwd: true,
            loading: false
        }
    }),
    methods: {
        async register () {
            this.form.loading = true;
            const username = this.form.username;
            const email = this.form.email;
            const password1 = this.form.password;
            const password2 = this.form.confirmPassword;

            const registerRes = await this.$api({
                url: '/register',
                method: 'post',
                data: {
                    username,
                    email,
                    password1,
                    password2
                }
            })

            console.log(registerRes.data)

            if (registerRes.data.status === 'fail') {
                registerRes.data.errors.forEach((val) => {
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
            if (registerRes.data.status === 'success') {
                this.$q.notify({
                        type: 'positive',
                        progress: true,
                        html: true,
                        message: `<span style="font-color: white;">Registration successful</span>`,
                        position: 'top',
                    })
                this.$router.push({
                    name: 'EmailVerification',
                    query: {
                        status: 'on-verifying',
                        email: registerRes.data.obj.email
                    }
                })
            }
            this.form.loading = false;
        },
        togglePasswordVisibility () {
            this.form.isPwd = !this.form.isPwd
        },
        changeActiveComponent (component) {
            this.$emit('changeActiveComponent', { component })
            this.$router.push({
                name: 'Index',
                params: { component }
            })
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
            height: 7vh;
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
        #register-form {
            padding: 0 10vw;
        }
    }
    @media (min-width:641px)  {
        /* portrait tablets, portrait iPad, landscape e-readers, landscape 800x480 or 854x480 phones */
        #register-form {
            padding: 0 12vw;

            .register-btn {
                max-width: 268px;
            }
        }
    }
    @media (min-width:961px)  {
        /* tablet, landscape iPad, lo-res laptops ands desktops */
        #register-form {
            padding: 0 14px;

            .register-btn {
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