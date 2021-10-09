<template>
  <div class="row" id="root">
      <div class="background-image"></div>
      <div class="background-overlay"></div>
      <div class="col-4 q-mx-auto">
          <q-card id="login">
              <q-card-section class="header">
                  <q-img src="logo/logo banner.png" />
              </q-card-section>
              <q-card-section class="body">
                  <q-form name="login-form">
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
                    <q-btn size="lg" flat type="submit" :disable="form.loading" dense class="login-btn" @click="login">
                        <q-spinner-tail color="#FBFBFB" size="2rem" v-if="form.loading"></q-spinner-tail>
                        <span v-if="form.loading === false">LOGIN</span>
                    </q-btn>
                  </q-form>
              </q-card-section>
              <q-card-section class="footer"></q-card-section>
          </q-card>
      </div>
  </div>
</template>

<script>
export default {
    name: 'Login',
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
        async login () {
            this.form.loading = true;
            let loginRes = await this.$api({
                url: '/admin/login',
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
                    message: `<span style="font-color: white;">Login Successful</span>`,
                    icon: 'lock',
                    position: 'top',
                })

                // set token and redirect
                const user = {
                    token: loginRes.data.token,
                    username: loginRes.data.username,
                    email: loginRes.data.email,
                    firstName: loginRes.data.firstName,
                    middleName: loginRes.data.middleName,
                    lastName: loginRes.data.lastName,
                }
                console.log(user.token)
                console.log(this.$getUser())
                this.$setUser(user)
                console.log(this.$getUser())
                location.reload();
            }
            this.form.loading = false;
        }
    }
}
</script>

<style lang="scss" scoped>
    #root {
        height: 100vh;

        .background-image {
            height: 100vh;
            width: 100vw;
            background-image: url('/backgrounds/login-bg.jpg');
            background-size: cover;
            background-repeat: no-repeat;
            // filter: blur(1px);
            position: fixed;
            z-index: 1;
        }
        .background-overlay {
            height: 100vh;
            width: 100vw;
            background-image: linear-gradient(to right, #2D5EF5, #44B6F4);
            opacity: 0.7;
            position: fixed;
            z-index: 2;
        }

        #login {
            background-color: rgba($color: #0b0c22, $alpha: 0.9);
            margin-top: 20vh;
            padding: 1rem;
            border-radius: 30px;
            z-index: 999;
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
    }
</style>