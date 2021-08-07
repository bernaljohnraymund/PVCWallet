import { boot } from 'quasar/wrappers';

export default boot(({ app }) => {
    app.mixin({
        data: () => ({
            $user: undefined
        }),
        mounted () {
            console.log('mixin here')
        }
    })
})