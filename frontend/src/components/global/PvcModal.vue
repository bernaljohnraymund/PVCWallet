<template>
    <q-dialog v-model="isShow">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <!-- <div class="text-h6">Close icon</div> -->
          <q-btn icon="close" flat round dense @click="hide" class="close-btn absolute-right" />
        </q-card-section>
        <q-card-section v-if="$props.modal.isHeaderEnabled || true">
            <slot name="header"></slot>
        </q-card-section>

        <q-card-section class="q-pt-none">
            <slot name="body"></slot>
        </q-card-section>

        <q-card-section v-if="$props.modal.isFooterEnabled || true">
            <slot name="footer"></slot>
        </q-card-section>
      </q-card>
    </q-dialog>
</template>

<script>
export default {
    name: 'PvcModal',
    props: {
        modal: {}
    },
    data: () => ({
        isShow: false
    }),
    methods: {
        async show () {
            this.isShow = true;
            await this.$emit('show', {});
        },
        async hide () {
            this.isShow = false;
            await this.$emit('close', {});
        },
        closeCamera () {

        }
    }
}
</script>

<style lang="scss" scoped>
    .close-btn {
        font-size: 2rem;
    }
</style>