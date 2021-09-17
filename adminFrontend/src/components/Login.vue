<template>
  <div class="row" id="root">
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
                    <q-btn size="lg" flat type="submit" :disable="form.loading" dense class="login-btn">
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
    }
}
</script>

<style lang="scss" scoped>
    #root {
        #login {
            background-color: #0b0c22;
            margin-top: 20vh;
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