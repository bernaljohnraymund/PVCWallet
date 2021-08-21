<template>
    <div id="root">
        <div class="row">
            <div class="col-12">
                <q-form id="identity-verification-form">
                    <div class="text-h4 text-center header">
                        <div>
                            <q-icon name="fingerprint" />
                        </div>
                        Identity Verification
                    </div>
                    <div class="body">
                        <div class="row">
                            <div class="col-12 selfie-form">
                                <div class="row">
                                    <div class="col-12">
                                        <h4>Selfie</h4>
                                    </div>
                                    <div class="col-12 col-md-6" v-if="form.selfie === null">
                                        <q-card @click="openCamera">
                                            <q-card-section></q-card-section>
                                            <q-card-section>
                                                <q-icon name="photo_camera" />
                                                <h6>Use camera</h6>
                                            </q-card-section>
                                            <q-card-section></q-card-section>
                                        </q-card>
                                    </div>
                                    <div class="col-12 col-md-6" v-if="form.selfie === null">
                                        <q-card @click="openSelfieUpload">
                                            <q-card-section></q-card-section>
                                            <q-card-section>
                                                <input
                                                    type="file"
                                                    ref="selfieFile"
                                                    @input="showSelfieImage"
                                                    hidden
                                                />
                                                <q-icon name="image" />
                                                <h6>Upload image</h6>
                                            </q-card-section>
                                            <q-card-section></q-card-section>
                                        </q-card>
                                    </div>
                                    <div class="col-6 selfie-image-container" v-if="form.selfie !== null">
                                        <q-card>
                                            <q-card-section></q-card-section>
                                            <q-card-section>
                                                <q-img :src="form.selfieImageData" ref="selfiePreview" />
                                            </q-card-section>
                                        </q-card>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="footer">
                        <div class="row">
                            <div class="col-12">
                                <q-btn label="save" class="save-btn" flat />
                                <span class="btn-margin"></span>
                                <q-btn label="cancel" class="cancel-btn" flat />
                            </div>
                        </div>
                    </div>
                </q-form>
            </div>
        </div>
        <pvc-modal :modal="cameraModal" @close="closeCamera" ref="cameraModal">
            <template v-slot:body>
                <pvc-camera ref="camera"/>
            </template>
        </pvc-modal>
    </div>
</template>

<script>
import PvcModal from '../global/PvcModal.vue'
import PvcCamera from '../global/PvcCamera.vue'
export default {
    name: 'IdentityInformation',
    components: {
        PvcModal,
        PvcCamera
    },
    data: () => ({
        form: {
            selfie: null,
            selfieImageData: null
        },
        cameraModal: {
            isHeaderEnabled: false,
            isFooterEnabled: false
        }
    }),
    async mounted () {
    },
    methods: {
        openSelfieUpload () {
            this.$refs.selfieFile.click();
        },
        async openCamera () {
            await this.$refs.cameraModal.show();
            await this.$refs.camera.open();
        },
        async closeCamera () {
            this.$refs.camera.close();
            // await this.$refs.cameraModal.hide();
        },
        showSelfieImage () {
            const input = this.$refs.selfieFile;
            this.form.selfie = input.files;
            const files = input.files;
            console.log(this.form.selfie)
            console.log(files)
            if (files && files[0]) {
                const reader = new FileReader();
                reader.onload = e => {
                    this.form.selfieImageData = e.target.result;
                };
                reader.readAsDataURL(files[0]);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
html, body, .ion-app, .ion-content {
  background-color: transparent;
}
    #root {
        background: #1c1e47;
        min-height: 25vh;
        border-radius: 10px;

        #identity-verification-form {
            padding: 10px;

            .header .q-icon {
                background: -webkit-linear-gradient(left, #2D5EF5 2%, #44B6F4 100%);
                background-clip: text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }

            .selfie-form {
                background: #10122d;
                text-align: center;
            }
            
            .selfie-form .q-card {
                background: transparent;
                box-shadow: none;
                border: 1px dashed #1c1e47;
                margin: 10px 10px;
                cursor: pointer;
            }

            .selfie-form .q-icon {
                display: block;
                margin: auto;
                background: -webkit-linear-gradient(left, #2D5EF5 2%, #44B6F4 100%);
                background-clip: text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }

            .selfie-form h6 {
                margin: 0;
            }

            .selfie-image-container .q-img {
                height: 50vh;
                
            }
            .selfie-image-container :deep img {
                object-fit: contain !important;
                width: 100%;
            }

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

            #identity-verification-form .body {
                .row > div {
                    padding-bottom: 5px;
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
            #identity-verification-form .body {
                .selfie-form .q-icon {
                    font-size: 7rem
                }

                .selfie-image-container {
                    margin: auto;
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