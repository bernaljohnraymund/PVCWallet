<template>
    <div>
        <identity-information-component />
    </div>
</template>

<script>
import IdentityInformation from '../../../components/profile/IdentityInformation.vue'
export default {
    name: 'IdentityInformation',
    components: {
        'identity-information-component': IdentityInformation
    },
}
</script>

<style lang="scss" scoped>
</style>