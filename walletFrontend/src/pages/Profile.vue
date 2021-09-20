<template>
    <div id="root">
        <component :is="profileComponent" />
    </div>
</template>

<script>
import ProfileInfo from 'components/profile/ProfileInfo.vue'
import Kyc from 'components/profile/Kyc.vue'

export default {
    name: 'Profile',
    data: () => ({
        user: {
            isUserFullyVerified: false
        }
    }),
    computed: {
        profileComponent () {
            return this.user.isUserFullyVerified ? ProfileInfo : Kyc;
        }
    },
    async mounted () {
    }
}
</script>

<style>

</style>