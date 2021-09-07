import { boot } from 'quasar/wrappers';
import globalMixins from '../mixins/globalMixins'

export default boot(({ app }) => {
    app.mixin(globalMixins)
    return app;
})