
export async function setUser (state, payload) {
    state.$user = await payload;
}

