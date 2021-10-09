<template>
  <div>
    <user-kyc-info-component />
  </div>
</template>

<script>
import UserInfo from 'components/users/UserInfo'
export default {
    name: 'UserInfo',
    components: {
        "user-kyc-info-component": UserInfo,
    }
}
</script>

<style>

</style>