<template>
    <div id="root">
        <div class="row">
            <div class="col-12">
                <q-form id="proof-of-address-form">
                    <div class="text-h4 text-center header">
                        <div>
                            <q-icon name="place" />
                        </div>
                        Proof of Address
                    </div>
                    <div class="body">
                        <div class="row">
                            <div class="col-12 address-form">
                                <div class="row">
                                    <div class="col-12">
                                        <h4>Document</h4>
                                    </div>
                                    <div class="col-12 col-md-6" v-if="form.hasAddressDocument === false">
                                        <q-card @click="openCamera({imageType: 'addressDocument'})">
                                            <q-card-section></q-card-section>
                                            <q-card-section>
                                                <q-icon name="photo_camera" />
                                                <h6>Camera</h6>
                                            </q-card-section>
                                            <q-card-section></q-card-section>
                                        </q-card>
                                    </div>
                                    <div class="col-12 col-md-6" v-if="form.hasAddressDocument === false">
                                        <q-card @click="openSelfieUpload">
                                            <q-card-section></q-card-section>
                                            <q-card-section>
                                                <input
                                                    type="file"
                                                    ref="addressDocumentFile"
                                                    @input="showUploadedImage('addressDocument')"
                                                    hidden
                                                />
                                                <q-icon name="image" />
                                                <h6>Upload</h6>
                                            </q-card-section>
                                            <q-card-section></q-card-section>
                                        </q-card>
                                    </div>
                                    <div class="col-3 address-document-image-container" v-show="form.hasAddressDocument === true">
                                        <q-card>
                                            <!-- <q-card-section></q-card-section> -->
                                            <q-card-section>
                                                <div ref="previewAddressDocument">
                                                </div>
                                            </q-card-section>
                                            <q-card-section>
                                                <div class="row">
                                                    <div class="col-12">
                                                        <q-btn type="button" label="remove" @click="removeUploadedImage('addressDocument')" flat />
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
        <pvc-modal :modal="cameraModal" @close="closeCamera" @takePhoto="takePhoto" ref="cameraModal" class="camera-modal">
            <template v-slot:body>
                <pvc-camera ref="camera" @savePhoto="savePhoto" />
            </template>
            <template v-slot:footer>
                <div class="footer">
                    <q-btn type="button" :icon="$refs.camera && $refs.camera.isPhotoTaken ? 'cameraswitch' : 'photo_camera'" :label="$refs.camera && $refs.camera.isPhotoTaken ? 'take again' : 'take a photo'" flat @click="$refs.camera && $refs.camera.isPhotoTaken ? $refs.camera.isPhotoTaken = false : $refs.camera.takePhoto()" v-if="$refs.camera" class="take-picture-btn" />
                    <q-btn type="button" :icon="'save'" label="save" flat @click="$refs.camera.savePhoto" v-if="$refs.camera && $refs.camera.isPhotoTaken" class="save-picture-btn" />
                    <q-btn type="button" label="close" flat @click="$refs.cameraModal.hide()" class="close-camera-btn" />
                </div>
            </template>
        </pvc-modal>
    </div>
</template>

<script>
import PvcModal from '../global/PvcModal.vue'
import PvcCamera from '../global/PvcCamera.vue'


let addressDocumentImage = new Image();

export default {
    name: 'ProofOfAddress',
    components: {
        PvcModal,
        PvcCamera
    },
    data: () => ({
        form: {
            hasAddressDocument: false,
            idImageData: null,
            addressDocumentImage: new Image(),
            idImage: new Image()
        },
        cameraModal: {
            isHeaderEnabled: true,
            isCloseBtnEnable: false,
            isFooterEnabled: true,
            isPersistent: true
        }
    }),
    async mounted () {
    },
    methods: {
        openSelfieUpload () {
            this.$refs.addressDocumentFile.click();
        },
        openIdUpload () {
            this.$refs.idFile.click();
        },
        removeUploadedImage (imageType) {
            if (imageType === 'addressDocument') {
                this.form.hasAddressDocument = false
                this.form.selfieImageData = null
                this.form.addressDocumentImage.src = null

                this.$q.notify({
                    type: 'negative',
                    progress: true,
                    html: true,
                    message: `<span style="font-color: white;">Selfie removed.</span>`,
                    position: 'top',
                })
            }
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
            console.log(imageType)

            if (imageType === 'addressDocument') {
                input = this.$refs.addressDocumentFile;
                imageRef = 'previewAddressDocument';
                this.form.hasAddressDocument = true;
            }
            
            const files = input.files;
            const reader = new FileReader();
            
            reader.onload = e => {
                if (imageType === 'addressDocument') {
                    this.form.addressDocumentImage.src =  e.target.result;
                    this.form.selfieImageData = e.target.result;
                }
                this.$refs[imageRef].appendChild(this.form.addressDocumentImage)

                this.$q.notify({
                    type: 'positive',
                    progress: true,
                    html: true,
                    message: `<span style="font-color: white;">${imageType === 'addressDocument' ? 'Selfie' : imageType === 'id' ? 'ID' : ''} uploaded.</span>`,
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
            if (val.imageType === 'addressDocument') {
                this.form.hasAddressDocument = true;
                this.form.selfieImageData = val.base64;
                imageRef = 'previewAddressDocument'
            }
            this.form[val.imageType + 'Image'].src =  val.base64;
            this.$refs[imageRef].appendChild(this.form[val.imageType + 'Image'])

            this.$q.notify({
                type: 'positive',
                progress: true,
                html: true,
                message: `<span style="font-color: white;">Address document uploaded.</span>`,
                position: 'top',
            })


            this.$refs.cameraModal.hide();
        }
    }
}
</script>

<style lang="scss" scoped>
    #root {
        background: #1c1e47;
        min-height: 25vh;
        border-radius: 10px;

        #proof-of-address-form {
            padding: 10px;

            .header .q-icon {
                background: -webkit-linear-gradient(left, #2D5EF5 2%, #44B6F4 100%);
                background-clip: text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }

            .address-form {
                background: #10122d;
                text-align: center;
            }
            
            .address-form .q-card {
                background: transparent;
                box-shadow: none;
                border: 1px dashed #1c1e47;
                margin: 10px 10px;
                cursor: pointer;
            }

            .address-form .q-icon {
                display: block;
                margin: auto;
                background: -webkit-linear-gradient(left, #2D5EF5 2%, #44B6F4 100%);
                background-clip: text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }

            .address-form h6 {
                margin: 0;
            }

            .address-document-image-container .q-img {
                height: 50vh;
                
            }
            .address-document-image-container :deep img {
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
    .camera-modal {
        .footer {
            text-align: center !important;
            .q-card__section {
                margin: inherit 0 !important;
            }
            .take-picture-btn, .save-picture-btn, .close-camera-btn {
                // width: 25%;
                color: #FBFBFB;
                background-color: #2D5EF5;
                background-image: linear-gradient(to right, #2D5EF5, #44B6F4);
                height: 7vh;
                margin: 0 2px;
                // width: 30%;
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

            #proof-of-address-form .body {
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
            #proof-of-address-form .body {
                .address-form .q-icon {
                    font-size: 7rem
                }

                .address-document-image-container, .id-image-container {
                    margin: auto;
                }
                .address-document-image-container img, .is-image-container img {
                    width: 200px !important;
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