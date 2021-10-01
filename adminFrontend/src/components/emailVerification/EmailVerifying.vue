<template>
    <q-card
      id="email-verifying-card"
    >
        <q-card-section>
            <div class="text-h6 text-center">Email {{ emailStatus }}</div>
        </q-card-section>
        <q-separator dark inset />
        <q-card-section class="q-pt-none text-justify card-body">
            <div class="text-center">
                <q-spinner-tail v-if="emailStatus === 'Verifying'" class="main-icon" />
                <q-icon name="verified" color="green" class="main-icon" v-else-if="emailStatus === 'Verified'" />
                <q-icon name="sentiment_very_dissatisfied" color="red" class="main-icon" v-else-if="emailStatus === 'Not Found'" />
            </div>
            <p class="text-center" v-if="emailStatus === 'Verifying'">
                Please wait for your to be verified
            </p>
            <p class="text-center" v-if="emailStatus === 'Verified'">
                Your account has been verified
            </p>
            <p class="text-center" v-if="emailStatus === 'Not Found'">
                We can't find your account
            </p>
        </q-card-section>

        <q-card-section class="q-pt-none card-footer">
            <div class="row">
                <div class="col-12 text-center">
                    <a href="#" style="color: #43b3f4; text-decoration: none; cursor: pointer;" @click="changeActiveComponent('login')">Login</a>
                </div>
            </div>
        </q-card-section>
    </q-card>

</template>

<script>
export default {
    name: "EmailVerifying",
    data: () => ({
        emailStatus: 'Verifying'
    }),
    async mounted () {
        this.verifyEmail(this.$route.query.email, this.$route.query.code);
    },
    methods: {
        changeActiveComponent (component) {
            this.$router.push({
                name: 'Index',
                query: {
                    route: component
                }
            })
        },
        async verifyEmail (email, emailVerificationHashCode) {
            const emailVerificationRes = await this.$api({
                method: 'post',
                url: '/admin/verify/email',
                data: {
                    emailVerificationHashCode,
                    email
                }
            });
            console.log(emailVerificationRes)
            if (emailVerificationRes.data.status === 'success') {
                this.$q.notify({
                    type: 'positive',
                    progress: true,
                    html: true,
                    message: `<span style="font-color: white;">Email verified</span>`,
                    position: 'top',
                })

                this.emailStatus = 'Verified';
            }else
            if (emailVerificationRes.data.status === 'fail') {
                emailVerificationRes.data.errors.forEach((val) => {
                    this.$q.notify({
                        type: 'negative',
                        progress: true,
                        html: true,
                        icon: 'warning',
                        message: `<span style="font-color: white;">${val}</span>`,
                        position: 'top',
                    })
                })

                this.emailStatus = 'Not Found';
            }
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