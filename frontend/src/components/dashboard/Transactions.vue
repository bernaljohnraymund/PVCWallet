<template>
    <div class="row" id="root">
        <div class="col-12">
            <pvc-table :tbl="transactionTable" v-if="transactionTable">
                <template v-slot:row="props">
                    <q-td key="date">{{ props.data.date }}</q-td>
                    <q-td key="txid" class="txid">{{ props.data.txid }}</q-td>
                    <q-td key="from" class="from">{{ props.data.from }}</q-td>
                    <q-td key="to" class="to">{{ props.data.to }}</q-td>
                    <q-td key="amount">{{ props.data.amount }}</q-td>
                    <q-td key="value">{{ props.data.value }}</q-td>
                    <q-td key="currency">{{ props.data.currency }}</q-td>
                    <q-td key="token">{{ props.data.token }}</q-td>
                </template>
            </pvc-table>
        </div>
    </div>
</template>

<script>
import PvcTable from '../global/PvcTable'
import moment from 'moment'

export default {
    name: 'Transactions',
    components: {
        PvcTable
    },
    data: () => ({
        transactionTable: {
            data: [
                    {
                        date: moment(moment.now()).format('MM/DD/yyyy'),
                        txid: '0xe53a38570CAd259E5F600BFA504fFFA9598fEf83',
                        from: '0xe53a38570CAd259E5F600BFA504fFFA9598fEf83',
                        to: '0xe53a38570CAd259E5F600BFA504fFFA9598fEf83',
                        amount: '500',
                        value: '500',
                        currency: 'USD',
                        token: 'pvc',
                        type: 'out'
                    },
                    {
                        date: moment(moment.now()).format('MM/DD/yyyy'),
                        txid: '0xe53a38570CAd259E5F600BFA504fFFA9598fEf83',
                        from: '0xe53a38570CAd259E5F600BFA504fFFA9598fEf83',
                        to: '0xe53a38570CAd259E5F600BFA504fFFA9598fEf83',
                        amount: '200',
                        value: '200',
                        currency: 'USD',
                        token: 'pvc',
                        type: 'out'
                    }
                ],
            columns: [
                {
                    name: 'date',
                    label: 'date ',
                    field: 'date',
                    align: 'left',
                    sortable: false,
                    style: 'max-width: 50px',
                    headerStyle: 'max-width: 50px'
                },
                {
                    name: 'txid',
                    label: 'txid ',
                    field: 'txid',
                    align: 'left',
                    sortable: false,
                    style: 'max-width: 50px',
                    headerStyle: 'max-width: 50px'
                },
                {
                    name: 'from',
                    label: 'from ',
                    field: 'from',
                    align: 'left',
                    sortable: false,
                    style: 'max-width: 50px',
                    headerStyle: 'max-width: 50px'
                },
                {
                    name: 'to',
                    label: 'to ',
                    field: 'to',
                    align: 'left',
                    sortable: false,
                    style: 'max-width: 50px',
                    headerStyle: 'max-width: 50px'
                },
                {
                    name: 'amount',
                    label: 'amount ',
                    field: 'amount',
                    align: 'left',
                    sortable: false,
                    style: 'max-width: 50px',
                    headerStyle: 'max-width: 50px'
                },
                {
                    name: 'value',
                    label: 'value ',
                    field: 'value',
                    align: 'left',
                    sortable: false,
                    style: 'max-width: 50px',
                    headerStyle: 'max-width: 50px'
                },
                {
                    name: 'currency',
                    label: 'currency ',
                    field: 'currency',
                    align: 'left',
                    sortable: false,
                    style: 'max-width: 50px',
                    headerStyle: 'max-width: 50px'
                },
                {
                    name: 'token',
                    label: 'token ',
                    field: 'token',
                    align: 'left',
                    sortable: false,
                    style: 'max-width: 50px',
                    headerStyle: 'max-width: 50px'
                }
            ]
        }
    }),
    mounted () {
        // console.log(this.transactionTable);
    }
}
</script>

<style lang="scss" scoped>
    #root {
        #table {
            // ::v-deep .q-table thead th {
            //     width: 50px;
            //     white-space: normal;
            // }
            // ::v-deep .q-table tbody td {
            //     width: 50px;
            //     white-space: normal;
            // }
        }
    }
</style>