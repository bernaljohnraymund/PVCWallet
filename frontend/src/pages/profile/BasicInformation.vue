<template>
    <div>
        <basic-information-component />
    </div>
</template>

<script>
import BasicInformation from "../../components/profile/BasicInformation.vue"

export default {
    name: 'BasicInformation',
    components: {
        'basic-information-component': BasicInformation
    }
}
</script>
