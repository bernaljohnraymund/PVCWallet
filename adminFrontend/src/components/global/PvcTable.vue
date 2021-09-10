<template>
    <q-table
      class="font-monseratt text-weight-bold"
      :title="$props.tbl.title"
      row-key="name"
      :columns="$props.tbl.columns"
      :rows="$props.tbl.data"
      :filter="filter"
      :fullscreen="false"
      :auto-width="false"
      id="table"
    >
      <template v-slot:top-left>
        <h5>{{ $props.tbl.title }}</h5>
      </template>
      <template v-slot:top-right>
        <q-input
          class="search-bar"
          rounded
          standout
          bg-color="white"
          color="white"
          label-color="black"
          input-class="text-black"
          dense
          debounce="300"
          placeholder="Search"
          v-model="filter"
          id="search"
        >
          <template v-slot:append>
            <q-icon style="color:black" name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body="props">
        <q-tr>
            <slot :data="props.row" name="row"></slot>
        </q-tr>
      </template>
    </q-table>
</template>

<script>
export default {
    name: 'PvcTable',
    props: {
        tbl: {
            default: () => ({})
        }
    },
    data: () => ({
      filter: '',
      tbldata: []
    }),
    mounted () {
    }
}
</script>

<style lang="scss" scoped>
    #table {
      :deep(.q-table__top), :deep(thead), :deep(.q-table__bottom) {
        background-color: #0b0c22;
      }
      :deep(h5) {
        margin: 0;
        color: #FBFBFB;
      }
      :deep(.q-table__top > div:nth-of-type(3) > label > div > div) {
        background: #e6f3fb !important;
      }
      :deep(thead) {
        text-transform: uppercase !important;
        color: #FBFBFB;
      }
      :deep(tbody) {
        background-color: #43b2f4
      }
      :deep(.q-table__bottom), :deep(.q-table__control) {
        color: #FBFBFB !important;
        span {
          color: #FBFBFB !important;
        }
        .q-field__append {
          color: #FBFBFB !important;
        }
      }
    }
</style>
