<template>
  <div>
    <users-analytics-cards />
    <users-component />
  </div>
</template>

<script>
import UsersAnalyticsCards from 'components/users/UsersAnalyticsCards'
import Users from 'components/Users.vue'
export default {
    name: 'Users',
    components: {
        'users-component': Users,
        UsersAnalyticsCards
    }
}
</script>

<style>

</style>