<template>
  <div>
    <user-kyc-info-component />
  </div>
</template>

<script>
import UserKycInfo from 'components/users/UserKycInfo'
export default {
    name: 'UserKycInfo',
    components: {
        "user-kyc-info-component": UserKycInfo,
    }
}
</script>

<style>

</style>