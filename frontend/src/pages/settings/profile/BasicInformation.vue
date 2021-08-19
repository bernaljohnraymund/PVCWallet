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
                    <q-select
                        outlined
                        v-model="form.country"
                        use-input
                        hide-selected
                        fill-input
                        input-debounce="0"
                        :options="form.countryOpts"
                        option-label="countryName"
                        @filter="filterCountry"
                        clearable
                    >
                       <template v-slot:prepend>
                            <q-avatar>
                                <q-img :src="'/icons/flags/png/' + form.country.countryCode + '.png'" />
                            </q-avatar>
                        </template>
                         <template v-slot:selected-item="scope">
                            <label style="color: white;">{{ scope.opt.countryName }}</label>
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
                    <q-btn label="click" @click="getC"></q-btn>
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
            country: countries[0]
        }
    }),
    methods: {
    },
    // setup () {
    //     let countryOpts = ref(countries);

    //     return {
    //         countries,
    //         country: ref(null),
    //         countryOpts,
    //         filterCountry (val, update, abort) {
    //             let updatedCountryList = []
    //             if (val === '') {
    //                 update(() => {
    //                     countryOpts = countries
    //                     // console.log(countryOpts.value[0].countryName)
    //                 })
    //                 return
    //             }

    //             update(() => {
    //                 const needle = val.toLowerCase()
    //                 countryOpts = countries.filter(v => {
    //                     if (v.countryName.toLowerCase().indexOf(needle) > -1) {
    //                         updatedCountryList.push(v)
    //                         // console.log(updatedCountryList)
    //                         return updatedCountryList;
    //                     }
    //                 })
    //                 console.log(countryOpts)
    //             })
    //         }
    //     }

    // },
    async mounted () {
    },
    methods: {
        getC () {
            console.log(this.form.country)
        },
        filterCountry (val, update, abort) {
                this.form.countryOpts = ref(countries)
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
                    console.log(this.form.countryOpts)
                })
            }
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

            i.q-icon {
                font-size: 5rem;
            }
        }
    }
</style>