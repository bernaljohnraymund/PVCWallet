<template>
    <div class="row" id="root">
        <div class="col-md-4">
            <q-card class="balance">
                <q-card-section class="header">
                    <img src="/icons/wallet.png" class="img-icon" />
                    <label>Total Balance</label>
                </q-card-section>
                <q-card-section class="body"></q-card-section>
                <q-card-section class="footer"></q-card-section>
            </q-card>
        </div>
        <div class="col-md-4">
            <q-card class="balance">
                <q-card-section class="header">
                    <img src="/icons/pvc.png" class="img-icon" />
                    <label>PVC Balance</label>
                </q-card-section>
                <q-card-section class="body"></q-card-section>
                <q-card-section class="footer"></q-card-section>
            </q-card>
        </div>
        <div class="col-md-4">
            <q-card class="balance">
                <q-card-section class="header">
                    <img src="/icons/btc.png" class="img-icon" />
                    <label>BTC Balance</label>
                </q-card-section>
                <q-card-section class="body"></q-card-section>
                <q-card-section class="footer"></q-card-section>
            </q-card>
        </div>
    </div>
</template>

<script>
export default {
    name: "WalletBalances",
    data: () => ({}),
    async mounted () {},
    methods: {}
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
            }
            .body {
                background-image: linear-gradient(to right, #2D5EF5, #44B6F4);
            }
            .footer {
                background-color: #00a1ff;
            }
        }
        .balance .header .img-icon {
            width: 32px;
            margin: 0 7px 0 0;
            position: relative;
            top: -2px;
        }
            
        .balance .header label {
            font-size: 1rem;
            position: relative;
            bottom: 12px;
        }
    }
    @media (min-width:320px)  {
            /* smartphones, iPhone, portrait 480x320 phones */

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