<template>
    <div class="row" id="root">
        <div class="col-10 col-md-4">
            <q-card class="balance total">
                <q-card-section class="header">
                    <img src="/icons/wallet.png" class="img-icon" />
                    <label>Total Balance</label>
                </q-card-section>
                <q-card-section class="body text-center">
                    <h4>{{ wallets.total.fiatBalance }}</h4>
                </q-card-section>
                <q-card-section class="row footer">
                    <div class="col-md-12">
                        <q-btn type="button" label="view portfolio" flat />
                    </div>
                </q-card-section>
            </q-card>
        </div>
        <div class="col-10 col-md-4">
            <q-card class="balance pvc">
                <q-card-section class="header">
                    <img src="/icons/pvc.png" class="img-icon" />
                    <label>PVC Balance</label>
                </q-card-section>
                <q-card-section class="body text-center">
                    <h4>{{ wallets.pvc.cryptoBalance }} PVC</h4>
                    <h6>{{ wallets.pvc.fiatBalance }}</h6>
                </q-card-section>
                <q-card-section class="row footer">
                    <div class="col-md-6">
                        <q-btn type="button" label="deposit" flat />
                    </div>
                    <div class="col-md-6">
                        <q-btn type="button" label="withdraw" flat />
                    </div>
                </q-card-section>
            </q-card>
        </div>
        <div class="col-10 col-md-4">
            <q-card class="balance btc">
                <q-card-section class="header">
                    <img src="/icons/btc.png" class="img-icon" />
                    <label>BTC Balance</label>
                </q-card-section>
                <q-card-section class="body text-center">
                    <h4>{{ wallets.btc.cryptoBalance }} BTC</h4>
                    <h6>{{ wallets.btc.fiatBalance }}</h6>
                </q-card-section>
                <q-card-section class="row footer">
                    <div class="col-md-6">
                        <q-btn type="button" label="deposit" flat />
                    </div>
                    <div class="col-md-6">
                        <q-btn type="button" label="withdraw" flat />
                    </div>
                </q-card-section>
            </q-card>
        </div>
    </div>
</template>

<script>
import countries from '../../utils/data/countries'
export default {
    name: "WalletBalances",
    data: () => ({
        countries: countries,
        country: {
            language: 'en',
            code: '',
            currency: '',
        },
        wallets: {
            total: {},
            pvc: {},
            btc: {}
        }
    }),
    async mounted () {
        await this.setCountry();
        await this.setWalletBalances();
    },
    methods: {
        async setCountry () {
            const selectedCountry = 'US';

            const country = this.countries[selectedCountry];
            this.country = country;
            this.country.language = country.language || 'en';
        },
        async setWalletBalances () {
            const language = this.country.language;
            const currency = this.country.currencyCode;
            console.log(language, currency)
            // total balance
            this.wallets.total.fiatBalance = new Intl.NumberFormat(language, { style: 'currency', currency: currency}).format(500);

            // pvc balance
            this.wallets.pvc.fiatBalance = this.wallets.total.fiatBalance = new Intl.NumberFormat(language, { style: 'currency', currency: currency}).format(500);

            this.wallets.pvc.cryptoBalance = "500";
            // btc
            this.wallets.btc.fiatBalance = this.wallets.total.fiatBalance = new Intl.NumberFormat(language, { style: 'currency', currency: currency}).format(200);
            this.wallets.btc.cryptoBalance = "0.0043033";
        }
    }
}
</script>

<style lang="scss" scoped>
    #root {
        .balance {
            margin: 0 10px;
            color: #FBFBFB;
            
            .header {
                background-color: #0b0c22;
                max-height: 56px;

                .img-icon {
                    width: 32px;
                    margin: 0 7px 0 0;
                    position: relative;
                    top: -2px;
                }

                label {
                    font-size: 1rem;
                    position: relative;
                    bottom: 12px;
                }
            }
            .body {
                background-image: linear-gradient(to right, #2D5EF5, #44B6F4);
                height: 130px;
            }
            .footer {
                background-color: #00a1ff;
                height: 30px;
                max-height: 30px;
                padding: 0px;

                button {
                    padding: 0 !important;
                    min-height: 0 !important;
                    width: 100%;
                    height: 100%;
                    margin: 0;
                }
            }
        }
        .balance.total {
            h4 {
                margin: 11% 0 0 0;
            }
        }
        .balance.pvc, .balance.btc {
            h4 {
                margin: 7% 0 0 0;
            }
            h6 {
                margin: 2% 0 0 0;
                position: relative;
            }
        }
        // .balance .header 
            
        // .balance .header 
    }
    @media (min-width:320px)  {
            /* smartphones, iPhone, portrait 480x320 phones */
            #root {
                > div {
                    margin: 0 auto 17px;
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
    }
</style>