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
        >
          <q-icon slot="prepend" style="color:black" name="search" />
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
      ::v-deep .q-table__top, ::v-deep thead, ::v-deep .q-table__bottom {
        background-color: #0b0c22;
      }
      ::v-deep thead {
        text-transform: uppercase !important;
        color: #FBFBFB;
      }
      ::v-deep tbody {
        background-color: #43b2f4
      }
      ::v-deep .q-table__bottom, ::v-deep .q-table__control {
        color: #FBFBFB !important;
      }
    }
</style>
