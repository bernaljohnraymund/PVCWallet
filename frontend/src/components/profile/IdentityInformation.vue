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
                                    <div class="col-12 col-md-6" v-if="form.hasSelfie === false">
                                        <q-card @click="openCamera({imageType: 'selfie'})">
                                            <q-card-section></q-card-section>
                                            <q-card-section>
                                                <q-icon name="photo_camera" />
                                                <h6>Use camera</h6>
                                            </q-card-section>
                                            <q-card-section></q-card-section>
                                        </q-card>
                                    </div>
                                    <div class="col-12 col-md-6" v-if="form.hasSelfie === false">
                                        <q-card @click="openSelfieUpload">
                                            <q-card-section></q-card-section>
                                            <q-card-section>
                                                <input
                                                    type="file"
                                                    ref="selfieFile"
                                                    @input="showUploadedImage('selfie')"
                                                    hidden
                                                />
                                                <q-icon name="image" />
                                                <h6>Upload image</h6>
                                            </q-card-section>
                                            <q-card-section></q-card-section>
                                        </q-card>
                                    </div>
                                    <div class="col-6 selfie-image-container" v-show="form.hasSelfie === true">
                                        <q-card>
                                            <!-- <q-card-section></q-card-section> -->
                                            <q-card-section>
                                                <div ref="previewSelfie">
                                                </div>
                                            </q-card-section>
                                            <q-card-section>
                                                <div class="row">
                                                    <div class="col-12">
                                                        <q-btn type="button" label="remove" @click="removeUploadedImage('selfie')" flat />
                                                    </div>
                                                </div>
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
                                <!-- <q-btn label="save" class="save-btn" flat />
                                <span class="btn-margin"></span>
                                <q-btn label="cancel" class="cancel-btn" flat /> -->
                            </div>
                        </div>
                    </div>
                </q-form>
            </div>
        </div>
        <pvc-modal :modal="cameraModal" @close="closeCamera" @takePhoto="takePhoto" ref="cameraModal">
            <template v-slot:body>
                <pvc-camera ref="camera" @savePhoto="savePhoto" />
            </template>
            <template v-slot:footer>
                <q-btn type="button" label="close" flat @click="$refs.cameraModal.hide()" />
                <q-btn type="button" :label="$refs.camera && $refs.camera.isPhotoTaken ? 'take again' : 'take a picture'" flat @click="$refs.camera && $refs.camera.isPhotoTaken ? $refs.camera.isPhotoTaken = false : $refs.camera.takePhoto()" v-if="$refs.camera" />
                <q-btn type="button" label="save" flat @click="$refs.camera.savePhoto" v-if="$refs.camera && $refs.camera.isPhotoTaken" />
            </template>
        </pvc-modal>
    </div>
</template>

<script>
import PvcModal from '../global/PvcModal.vue'
import PvcCamera from '../global/PvcCamera.vue'


let image = new Image();

export default {
    name: 'IdentityInformation',
    components: {
        PvcModal,
        PvcCamera
    },
    data: () => ({
        form: {
            hasSelfie: false,
            selfieImageData: null,
        },
        cameraModal: {
            isHeaderEnabled: false,
            isCloseBtnEnable: false,
            isFooterEnabled: true,
            isPersistent: true
        }
    }),
    async mounted () {
    },
    methods: {
        openSelfieUpload () {
            this.$refs.selfieFile.click();
        },
        removeUploadedImage (imageType) {
            if (imageType === 'selfie') {
                this.form.hasSelfie = false
                this.form.selfieImageData = null

                this.$q.notify({
                    type: 'negative',
                    progress: true,
                    html: true,
                    message: `<span style="font-color: white;">Selfie removed.</span>`,
                    position: 'top',
                })
            }

            image.src = null
        },
        async openCamera (val = {}) {
            await this.$refs.cameraModal.show();
            await this.$refs.camera.open(val);
        },
        async closeCamera () {
            this.$refs.camera.close();
            // await this.$refs.cameraModal.hide();
        },
        showUploadedImage (imageType) {
            let input;
            let imageRef;

            if (imageType === 'selfie') {
                input = this.$refs.selfieFile;
                imageRef = 'previewSelfie';
                this.form.hasSelfie = true;
            }
            
            const files = input.files;
            // if (files && files[0]) {
            const reader = new FileReader();
                
            reader.onload = e => {
                image.src =  e.target.result
                this.form.selfieImageData = e.target.result;
                this.$refs[imageRef].appendChild(image)

                this.$q.notify({
                    type: 'positive',
                    progress: true,
                    html: true,
                    message: `<span style="font-color: white;">${imageType === 'selfie' ? 'Selfie' : imageType === 'id' ? 'ID' : ''} uploaded.</span>`,
                    position: 'top',
                })
            }
            reader.readAsDataURL(files[0])
        },
        async takePhoto (val) {
            console.log(val)
        },
        async savePhoto (val) {
            let imageRef;
            if (val.imageType === 'selfie') {
                this.form.hasSelfie = true;
                this.form.selfieImageData = val.base64;
                imageRef = 'previewSelfie'
            }
            image.src =  val.base64;
            this.$refs[imageRef].appendChild(image)

            this.$q.notify({
                type: 'positive',
                progress: true,
                html: true,
                message: `<span style="font-color: white;">${val.imageType === 'selfie' ? 'Selfie' : imageType === 'id' ? 'ID' : ''} uploaded.</span>`,
                position: 'top',
            })


            this.$refs.cameraModal.hide();
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