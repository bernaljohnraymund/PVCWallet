<template>
    <div>
        <add-admin-component />
    </div>
</template>

<script>
import AddAdmin from 'components/accounts/admin/AddAdmin.vue'
export default {
    name: 'AddAdmin',
    components: {
        'add-admin-component': AddAdmin
    },
    data: () => ({}),
    mounted () {
    },
    methods: {}
}
</script>

<style lang="scss" scoped>
</style>