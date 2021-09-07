<template>
    <div class="row" id="root">
        <div class="col-12">
            <pvc-table :tbl="transactionTable" v-if="transactionTable.data.length > 0">
                <template v-slot:row="props">
                    <q-td key="date">{{ props.data.date }}</q-td>
                    <q-td key="txid" class="txid"><a href="#" @click.prevent="visitLink">{{ props.data.txid }}</a></q-td>
                    <q-td key="from" class="from"><a href="#" @click.prevent="visitLink">{{ props.data.from }}</a></q-td>
                    <q-td key="to" class="to"><a href="#" @click.prevent="visitLink">{{ props.data.to }}</a></q-td>
                    <q-td key="amount">{{ props.data.amount }}</q-td>
                    <q-td key="value">{{ props.data.value }} {{ props.data.currency }}</q-td>
                    <q-td key="token">{{ props.data.token }}</q-td>
                </template>
            </pvc-table>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import PvcTable from '../global/PvcTable'

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
                    },
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
                    },
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
                    },
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
                    },
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
                },
                {
                    name: 'txid',
                    label: 'txid ',
                    field: 'txid',
                    align: 'left',
                    sortable: false,
                },
                {
                    name: 'from',
                    label: 'from ',
                    field: 'from',
                    align: 'left',
                    sortable: false,
                },
                {
                    name: 'to',
                    label: 'to ',
                    field: 'to',
                    align: 'left',
                    sortable: false,
                },
                {
                    name: 'amount',
                    label: 'amount ',
                    field: 'amount',
                    align: 'left',
                    sortable: false,
                },
                {
                    name: 'value',
                    label: 'value ',
                    field: 'value',
                    align: 'left',
                    sortable: false,
                },
                {
                    name: 'token',
                    label: 'token ',
                    field: 'token',
                    align: 'left',
                    sortable: false,
                }
            ]
        }
    }),
    mounted () {
        // console.log(this.transactionTable);
    },
    methods: {
        visitLink () {
            console.log('test')
        }
    }
}
</script>

<style lang="scss" scoped>
    #root {
        #table {
            :deep tbody td {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: 200px;

                a {
                    color: #000 !important;
                    text-decoration: none;
                }
            }
            :deep tbody td:last-of-type {
                text-transform: uppercase;
            }
        }
        
        :deep .q-field__control-container > .q-field__native,
        :deep .q-field__append > i.q-select__dropdown-icon {
            color: #FBFBFB !important;
        }
    }
</style>