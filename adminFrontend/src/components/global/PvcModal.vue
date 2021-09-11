<template>
    <q-dialog v-model="isShow" :persistent="$props.modal.isPersistent && true">
      <q-card>
        <q-card-section v-if="$props.modal.isCloseBtnEnable" :style="$props.modal.headerStyle">
          <q-btn icon="close" flat round dense @click="hide" class="close-btn absolute-right" />
        </q-card-section>
        <q-card-section v-if="$props.modal.isHeaderEnabled">
            <slot name="header"></slot>
        </q-card-section>

        <q-card-section :style="$props.modal.bodyStyle">
            <slot name="body"></slot>
        </q-card-section>

        <q-card-section v-if="$props.modal.isFooterEnabled" :style="$props.modal.footerStyle">
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
    .q-card {
        background-color: #0080ff;
        color: #FAFAFA !important;
        min-width: 560px;
    }
    .close-btn {
        font-size: 1.4rem;
        z-index: 99;
        color: #FBFBFB;
    }
</style>