<template>
    <div class="row" id="root">
        <div class="col-12">
            <pvc-table :tbl="userTable">
                <template v-slot:row="props" >
                        <q-td key="date">{{ moment(props.data.updatedAt).format('DD MMM YYYY') }}</q-td>
                        <q-td key="firstName" style="text-transform: uppercase;">{{ props.data.firstName }}</q-td>
                        <q-td key="lastName" style="text-transform: uppercase;">{{ props.data.lastName }}</q-td>
                        <q-td key="type" style="text-transform: uppercase;">{{ props.data.verificationStatus === 'basic information pending' ? 'basic information' : props.data.verificationStatus === 'identity information pending' ? 'identity information pending' : props.data.verificationStatus === 'proof of address pending' ? 'proof of address' : ''}}</q-td>
                        <q-td align="center" key="view" style="text-transform: uppercase;"><q-avatar icon="visibility" color="green" text-color="white" style="cursor: pointer;" @click="viewUserKyc(props.data._id)" /></q-td>
                </template>
            </pvc-table>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import PvcTable from '../global/PvcTable.vue'
export default {
    name: 'KycRoot',
    components: {
        PvcTable
    },
    data: () => ({
        moment,
        userTable: {
            title: 'KYC',
            data: [],
            columns: [
                {
                    name: 'updatedAt',
                    label: 'date ',
                    field: 'updatedAt',
                    align: 'left',
                    sortable: false,
                    required: true
                },
                {
                    name: 'firstName',
                    label: 'first name ',
                    field: 'firstName',
                    align: 'left',
                    sortable: false,
                    required: true
                },
                {
                    name: 'lastName',
                    label: 'last name',
                    field: 'lastName',
                    align: 'left',
                    sortable: false,
                    required: true
                },
                {
                    name: 'type',
                    label: 'type',
                    field: 'verificationStatus',
                    align: 'left',
                    sortable: false,
                    required: true
                },
                {
                    name: 'view',
                    label: 'view',
                    align: 'center',
                    required: true
                }
            ]
        }
    }),
    async mounted () {
        await this.getAllUserInfo()
    },
    methods: {
        async getAllUserInfo () {
            const kycRes = await this.$api({
                method: "GET",
                url: "admin/user/all",
            })

            this.userTable.data = kycRes.data.payload
        },
        async viewUserKyc (id) {
            this.$router.push({
                name: 'UserKycInfo',
                params: {
                    id
                }
            })
        }
    }


}
</script>

<style>

</style>