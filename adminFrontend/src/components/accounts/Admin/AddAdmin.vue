<template>
    <div id="root" class="row">
        <div class="col-12">
            <q-form id="admin-registration-form" @submit="createAdminAccount">
                <div class="text-h4 text-center header">
                    <div>
                        <q-icon name="perm_identity" />
                    </div>
                    Create Account
                </div>
                <div class="body">
                    <div class="row">
                        <div class="col-12">
                            <q-select
                                outlined
                                label="Country of Residence"
                                v-model="form.country"
                                use-input
                                hide-selected
                                fill-input
                                input-debounce="0"
                                :options="form.countryOpts"
                                option-label="name"
                                @filter="filterCountry"
                                clearable
                                class="select"
                            >
                            <template v-slot:prepend>
                                    <q-avatar v-if="form.country && form.country.code">
                                        <q-img :src="'/icons/flags/png/' + form.country.code + '.png'" />
                                    </q-avatar>
                                    <q-avatar icon="flag" v-else />
                                </template>
                                <template v-slot:selected-item="scope">
                                    {{ scope.opt.name }}
                                </template>
                                <template v-slot:option="scope">
                                    <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                                        <q-item-section avatar>
                                            <q-img :src="'/icons/flags/png/' + scope.opt.code + '.png'" />
                                        </q-item-section>
                                        <q-item-section>
                                        <q-item-label v-html="scope.opt.name"></q-item-label>
                                        </q-item-section>
                                    </q-item>
                                </template>
                            </q-select>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-12">
                            <q-select
                                outlined
                                label="Role"
                                v-model="form.role"
                                use-input
                                hide-selected
                                fill-input
                                input-debounce="0"
                                :options="roles"
                                option-label="name"
                                @filter="filterRole"
                                clearable
                                class="select"
                            >
                                <template v-slot:selected-item="scope">
                                    {{ scope.opt.name }}
                                </template>
                                <template v-slot:option="scope">
                                    <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                                        <q-item-section>
                                            <q-item-label v-html="scope.opt"></q-item-label>
                                        </q-item-section>
                                    </q-item>
                                </template>
                            </q-select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-md-6"><q-input type="text" outlined label="Username" v-model="form.username" name="username"/></div>
                        <div class="col-12 col-md-6"><q-input type="text" outlined label="Email" v-model="form.email" name="email"/></div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-md-6">
                            <q-input type="password" outlined label="Password" v-model="form.password" name="password"/>
                        </div>
                        <div class="col-12 col-md-6">
                            <q-input type="password" outlined label="Confirm Password" v-model="form.confirmPassword" name="confirmPassword"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-md-6">
                            <q-input type="text" outlined label="First Name" v-model="form.firstName" name="firstName" />
                        </div>
                        <div class="col-12 col-md-6">
                            <q-input type="text" outlined label="Middle Name" v-model="form.middleName" name="middleName" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-md-6">
                            <q-input type="text" outlined label="Last Name" v-model="form.lastName" name="lastName" />
                        </div>
                        <div class="col-12 col-md-6">
                            <q-input outlined placeholder="YYYY/DD/MM" v-model="form.birthDate.val" label="Birthdate" mask="date" >
                                <template v-slot:append>
                                    <q-icon name="event" class="cursor-pointer">
                                        <q-popup-proxy breakpoint="99999" ref="popupDate">
                                            <q-date @update:model-value="onUpdateBirthDate" ></q-date>
                                        </q-popup-proxy>
                                    </q-icon>
                                </template>
                            </q-input>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-md-6">
                            <q-input type="text" outlined label="House #" v-model="form.houseNumber" name="houseNumber" />
                        </div>
                        <div class="col-12 col-md-6">
                            <q-input type="text" outlined label="Street" v-model="form.street" name="street" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-md-6">
                            <q-input type="text" outlined label="Postal code" v-model="form.postal" name="postal" />
                        </div>
                        <div class="col-12 col-md-6">
                            <q-input type="text" outlined label="City" v-model="form.city" name="city" />
                        </div>
                    </div>
                    
                    
                </div>
                <div class="footer">
                    <div class="row">
                        <div class="col-12">
                            <q-btn type="submit" label="save" class="save-btn" flat />
                            <span class="btn-margin"></span>
                            <q-btn label="cancel" class="cancel-btn" flat @click="cancelAccountForm" />
                        </div>
                    </div>
                </div>
            </q-form>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import countriesJson from '../../../utils/data/json/countries'
import rolesArray from '../../../utils/data/array/roles'

const countries = Object.values(countriesJson)
const roles = rolesArray

export default {
    name: 'AddAdmin',
    data: () => ({
        roles: [],
        form: {
            role: '',
            countryOpts: [],
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            country: '',
            birthDate: {
                val: '',
                details: {}
            },
            firstName: '',
            lastName: '',
            middleName: '',
            street: '',
            houseNumber: '',
            postal: '',
            city: '',
        },
    }),
    async beforeMount () {
        // await this.kycSecurity()
    },
    async mounted () {
        this.form.countryOpts = ref(countries)
        this.roles = ref(roles)
    },
    methods: {
        filterCountry (val, update, abort) {
            let updatedCountryList = []
            if (val === '') {
                update(() => {
                    this.form.countryOpts = countries
                })
                return
            }

            update(() => {
                const needle = val.toLowerCase()
                this.form.countryOpts = countries.filter(v => {
                    if (v.name.toLowerCase().indexOf(needle) > -1) {
                        updatedCountryList.push(v)
                        return updatedCountryList;
                    }
                })
            })
        },
        filterRole (val, update, abort) {
            let updatedRoleList = []
            if (val === '') {
                update(() => {
                    this.roles = roles
                })
                return
            }

            update(() => {
                const needle = val.toLowerCase()
                this.roles = roles.filter(v => {
                    console.log(v)
                    if (v.toLowerCase().indexOf(needle) > -1) {
                        updatedRoleList.push(v)
                        return updatedRoleList;
                    }
                })
            })
        },
        async onUpdateBirthDate (value, reason, details) {
            this.form.birthDate.val = value
            this.form.birthDate.details = details
            this.$refs['popupDate'].hide()
        },
        async createAdminAccount () {
            this.$q.loading.show()
            const submitFormInfoRes = await this.$api({
                method: 'POST',
                url: '/admin/add',
                data: {
                    role: this.form.role,
                    username: this.form.username,
                    email: this.form.email,
                    password: this.form.password,
                    confirmPassword: this.form.confirmPassword,
                    country: this.form.country,
                    birthDate: this.form.birthDate,
                    firstName: this.form.firstName,
                    lastName: this.form.lastName,
                    middleName: this.form.middleName,
                    street: this.form.street,
                    houseNumber: this.form.houseNumber,
                    postal: this.form.postal,
                    city: this.form.city
                }
            })

            if (submitFormInfoRes.data.status === 'fail') {

                submitFormInfoRes.data.errors.forEach((val) => {
                    this.$q.notify({
                        type: 'negative',
                        progress: true,
                        html: true,
                        icon: 'warning',
                        message: `<span style="font-color: white;">${val}</span>`,
                        position: 'top',
                    })
                })
            }else
            if (submitFormInfoRes.data.status === 'success') {
                this.$q.notify({
                    type: 'positive',
                    progress: true,
                    html: true,
                    icon: 'warning',
                    message: `<span style="font-color: white;">${submitFormInfoRes.data.message}</span>`,
                    position: 'top',
                })
                this.$router.push({ name: 'Admin'})
            }
            this.$q.loading.hide()
        },
        // async kycSecurity () {
        //     const kycRes = await this.$api({
        //         url: '/user/kyc',
        //         method: 'GET'
        //     })
            
        //     if (kycRes.data.payload.verificationStatus === 'basic information pending' || kycRes.data.payload.verificationLevel >= 1) {
        //         this.$router.push({ name: 'ProfileRoot'})
        //     }
        // },
        async cancelAccountForm () {
            this.$router.push({ name: 'Admin'})
        }
    },
    beforeDestroy () {
        this.form.role = ''
        this.form.username = ''
        this.form.email = ''
        this.form.password = ''
        this.form.confirmPassword = ''
        this.form.country = ''
        this.form.birthDate = {}
        this.form.firstName = ''
        this.form.lastName = ''
        this.form.middleName = ''
        this.form.houseNumber = ''
        this.form.street = ''
        this.form.postal = ''
        this.form.city = ''
    }
}
</script>


<style lang="scss" scoped>
    #root {
        background: #1c1e47;
        min-height: 25vh;
        border-radius: 10px;

        .header .q-icon {
            background: -webkit-linear-gradient(left, #2D5EF5 2%, #44B6F4 100%);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        #admin-registration-form {
            padding: 10px;

            .footer {
                text-align: center;
            }

            .footer .save-btn, .footer .cancel-btn {
                border-radius: 10px;
                color: #FBFBFB;
                min-height: 0;
                margin: auto;
            }
            .footer .save-btn {
                background-image: linear-gradient(to right, #2D5EF5, #44B6F4);
            }
            .footer .cancel-btn {
                background-image: linear-gradient(to right, #f52d2d, #fa3030);
            }

        }

        :deep(.q-field) {
            background-color: #10122d;
            .q-field__prepend, .q-field__append {
                color: #FBFBFB !important;
            }
        }

        :deep(input), :deep(.q-field__label) {
            color: #FBFBFB;
        }
    }
    @media (min-width:320px)  {
        /* smartphones, iPhone, portrait 480x320 phones */
        #root {
            .header {
                padding-bottom: 15px;
                i.q-icon {
                    font-size: 4rem;
                }
            }

            #admin-registration-form .body {
                .row > div {
                    padding-bottom: 5px;
                }

                .row:nth-of-type(2) > div:nth-of-type(2) label.q-field {
                    padding-bottom: 0;
                }
            }
            .btn-margin {
                display: inline-block;
                width: 10px;
            }
            .footer {
                padding-top: 9px;
            }
            .footer .save-btn, .footer .cancel-btn {
                font-size: 17px;
                width: 36%;
                height: 6vh;
            }
        }
    }
    @media (min-width:481px)  {
        /* portrait e-readers (Nook/Kindle), smaller tablets @ 600 or @ 640 wide. */
    }
    @media (min-width:641px)  {
        /* portrait tablets, portrait iPad, landscape e-readers, landscape 800x480 or 854x480 phones */
    }
    @media (min-width:961px)  {
        /* tablet, landscape iPad, lo-res laptops ands desktops */
    }
    @media (min-width:1025px) {
        /* big landscape tablets, laptops, and desktops */

    }
    @media (min-width:1281px) {
        /* hi-res laptops and desktops */

        #root {
            .header {
                padding-bottom: 4vh;
                i.q-icon {
                    font-size: 7rem;
                }
            }
            #admin-registration-form .body {
                .row > div {
                    padding-bottom: 12px;
                }

                .row:nth-of-type(1) > div:nth-of-type(1), .row:nth-of-type(2) > div:nth-of-type(1), .row:nth-of-type(3) > div:nth-of-type(1), .row:nth-of-type(4) > div:nth-of-type(1), .row:nth-of-type(5) > div:nth-of-type(1), .row:nth-of-type(6) > div:nth-of-type(1), .row:nth-of-type(7) > div:nth-of-type(1), .row:nth-of-type(8) > div:nth-of-type(1) {
                    padding-right: 5px;
                }
                .row:nth-of-type(1) > div:nth-of-type(2), .row:nth-of-type(2) > div:nth-of-type(2), .row:nth-of-type(3) > div:nth-of-type(2), .row:nth-of-type(4) > div:nth-of-type(2), .row:nth-of-type(5) > div:nth-of-type(2), .row:nth-of-type(6) > div:nth-of-type(2), .row:nth-of-type(7) > div:nth-of-type(2), .row:nth-of-type(8) > div:nth-of-type(2) {
                    padding-left: 5px;
                }
            }
            .btn-margin {
                display: inline-block;
                width: 10px;
            }
            .footer {
                padding-top: 15px;
            }
            .footer .save-btn, .footer .cancel-btn {
                font-size: 20px;
                width: 13%;
                height: 7vh;
            }
        }
    }
</style>