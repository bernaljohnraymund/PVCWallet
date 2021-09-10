<template>
  <div class="row" id="root">
      {{ user }}
  </div>
</template>

<script>
export default {
    name: "UserKycInfo",

    data: () => ({
        user: {}
    }),
    
    async mounted () {
        this.user = await this.getUserInfo(this.$route.params.id);
    },

    methods: {
        async getUserInfo (id) {
            return await this.$api({
                method: 'GET',
                url: `admin/user/${id}`
            }).then(user => {
                return user.data.payload
            })
        }
    }
}
</script>

<style>

</style>