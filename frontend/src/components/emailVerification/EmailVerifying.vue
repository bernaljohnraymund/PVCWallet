<template>
    <q-card
      id="email-verifying-card"
    >
        <q-card-section>
            <div class="text-h6 text-center">Email Verification</div>
        </q-card-section>
        <q-separator dark inset />
        <q-card-section class="q-pt-none text-justify card-body">
            <div class="text-center">
                <q-icon name="attach_email" class="main-icon" />
            </div>
            We sent you a verification link to activate {{ $route.query.email }}. <a href="#" @click.prevent="resendEmailVerificationLink" style="color: #43b3f4; text-decoration: none; cursor: pointer;">Resend link</a>
            <div class="text-caption text-italic">(Note: You will not be able to login without verifying your email)</div>
        </q-card-section>
        
        <q-card-section class="q-pt-none card-footer">
            <div class="row">
                <div class="col-6 text-left">
                    <a href="#" style="color: #43b3f4; text-decoration: none; cursor: pointer;" @click="changeActiveComponent('login')">Login</a>
                </div>
                <div class="col-6 text-right">
                    <a href="#" style="color: #43b3f4; text-decoration: none; cursor: pointer;" @click="changeActiveComponent('register')">Sign up</a>
                </div>
            </div>
        </q-card-section>
    </q-card>

</template>

<script>
export default {
    name: "EmailVerifying",
    methods: {
        changeActiveComponent (component) {
            this.$router.push({
                name: 'Index',
                query: {
                    route: component
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    // colors
    $main     : #0b0c22;
    $secondary: #10122d;
    #email-verifying-card {
        background-color: $secondary;
        width: 25vw;
        margin: auto;
        position: relative;
        top: 20vh;

        
        .card-body {
            .main-icon {
                font-size: 3rem;
                margin: 4% 0;
            }     
        }
        .card-footer {
            padding-top: 7%;
        }
    }
</style>