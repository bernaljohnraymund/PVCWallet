<template>
    <div id="root" class="row">
        <div class="col-12">
            <q-form id="basic-information-form">
                <div class="text-h4 text-center heading">
                    <div>
                        <q-icon name="perm_identity" />
                    </div>
                    Basic Information
                    <!-- {{form.countryOpts}} -->
                </div>
                <div class="body">
                    <div class="row">
                        <div class="col-12">
                            <q-select
                                outlined
                                label="Country"
                                v-model="form.country"
                                use-input
                                hide-selected
                                fill-input
                                input-debounce="0"
                                :options="form.countryOpts"
                                option-label="countryName"
                                :loading="countryLoading"
                                @filter="filterCountry"
                                @virtual-scroll="loadCountry"
                                clearable
                                class="select"
                            >
                            <template v-slot:prepend>
                                    <q-avatar v-if="form.country.countryCode">
                                        <q-img :src="'/icons/flags/png/' + form.country.countryCode + '.png'" />
                                    </q-avatar>
                                    <q-avatar icon="flag" v-else />
                                </template>
                                <template v-slot:selected-item="scope">
                                    {{ scope.opt.countryName }}
                                </template>
                                <template v-slot:option="scope">
                                    <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                                        <q-item-section avatar>
                                            <q-img :src="'/icons/flags/png/' + scope.opt.countryCode + '.png'" />
                                        </q-item-section>
                                        <q-item-section>
                                        <q-item-label v-html="scope.opt.countryName"></q-item-label>
                                        </q-item-section>
                                    </q-item>
                                </template>
                            </q-select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-md-6">
                            <q-input type="text" outlined label="First Name" v-model="form.firstName" name="firstName" />
                        </div>
                        <div class="col-12 col-md-6">
                            <q-input type="text" outlined label="Last Name" v-model="form.lastName" name="lastName" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-md-6">
                            <q-input type="text" outlined label="Middle Name" v-model="form.middleName" name="middleName" />
                        </div>
                        <div class="col-12 col-md-6">
                            <q-input outlined v-model="form.birthDate" label="Birthdate" mask="date" >
                                <template v-slot:append>
                                    <q-icon name="event" class="cursor-pointer">
                                        <q-popup-proxy breakpoint="99999">
                                            <q-date v-model="form.birthDate" ></q-date>
                                        </q-popup-proxy>
                                    </q-icon>
                                </template>
                            </q-input>
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

const countries = Object.values(countriesJson);
export default {
    name: 'BasicInformation',
    data: () => ({
        form: {
            countryOpts: [],
            country: '',
            countryLoading: false,
            birthDate: ''
        }
    }),
    async mounted () {
        this.form.countryOpts = ref(countries)
        this.form.lastPage = Math.ceil(this.form.countryOpts.length / this.form.pageSize)
    },
    methods: {
        getC () {
            console.log(this.form.country)
        },
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
                        if (v.countryName.toLowerCase().indexOf(needle) > -1) {
                            updatedCountryList.push(v)
                            return updatedCountryList;
                        }
                    })
                })
        },
    },
}
</script>

<style lang="scss" scoped>
    #root {
        background: #1c1e47;
        min-height: 25vh;
        border-radius: 10px;

        #basic-information-form {
            padding: 10px;

            .heading i.q-icon {
                font-size: 5rem;
            }
        }

        ::v-deep .q-field {
            background-color: #10122d;
            .q-field__prepend, .q-field__append {
                color: #FBFBFB !important;
            }
        }

        ::v-deep input, ::v-deep .q-field__label {
            color: #FBFBFB;
        }
    }
    @media (min-width:320px)  {
        /* smartphones, iPhone, portrait 480x320 phones */
        #root {
            #basic-information-form .body {
                .row > div {
                    padding-bottom: 5px;
                }
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
            #basic-information-form .body {
                .row > div {
                    padding-bottom: 12px;
                }

                .row:nth-of-type(2) > div:nth-of-type(1), .row:nth-of-type(3) > div:nth-of-type(1) {
                    padding-right: 5px;
                }
                .row:nth-of-type(2) > div:nth-of-type(2), .row:nth-of-type(3) > div:nth-of-type(2) {
                    padding-left: 5px;
                }
            }
        }
    }
</style>