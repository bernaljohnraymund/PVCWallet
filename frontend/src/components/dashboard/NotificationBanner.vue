<template>
    <div class="row" id="root">
        <div class="col-12">
            <div id="notification-banner">
                <p>
                    <q-icon name="campaign" color="#d1d1d1" />
                    Latest announcement will be placed here. Latest announcement will be placed here. Latest announcement will be placed here. Latest announcement will be placed here. Latest announcement will be placed here. Latest announcement will be placed here. Latest announcement will be placed here. Announcement title will be placed here
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "NotificationBanner",
    data: () => ({
        // verification: {
        //     level: "",
        //     nextInfoLevel: "basic information",
        // }
    })
}
</script>

<style lang="scss" scoped>

    #root {
        color: #FBFBFB;

        #notification-banner {
            padding: 2vh 15px;
            background-color: #1c1e47;
            margin-bottom: 25px;
            border-radius: 17px;
            cursor: pointer;

            p {
                margin: 0 !important;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            i {
                color: #d1d1d1;
                margin-right: 1%;
                font-size: 30px;
            }
        }
    }

</style>