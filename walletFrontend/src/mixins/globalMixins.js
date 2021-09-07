import store from '../store';

const STORE = store()
export default {
    async mounted () {
        // console.log($store)
    },
    methods: {
        $getUser () {
            return STORE.getters.getUser
        },
        $setUser (user) {
            STORE.dispatch('setUser', user)
        }
    }
}