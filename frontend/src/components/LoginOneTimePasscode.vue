<template>
  <div>
      <q-form id="otp-form">
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
            maxlength="7"
        >
            <template v-slot:prepend>
                <span style="color: #0b0c22">
                    <q-icon
                        name="email"
                    />
                </span>
            </template>
            <template v-slot:append>
                <q-btn label="send" size="md" class="otp-send-btn" />
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
            maxlength="7"
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
            maxlength="7"
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
        <q-btn  label="Submit" size="lg" type="submit" dense class="submit-btn"/>
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
            googlePasscode: ''
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
</style>