//Note: As described from https://next-auth.js.org/tutorials/creating-a-database-adapter
const Adapter = (config, options = {}) => {

    async function getAdapter(appOptions) {

        async function createUser(profile) {
            return null
        }

        async function getUser(id) {
            return null
        }

        async function getUserByEmail(email) {
            return null
        }

        async function getUserByProviderAccountId(providerId, providerAccountId) {
            return null
        }

        async function getUserByCredentials(credentials) {
            return null
        }

        async function updateUser(user) {
            return null
        }

        async function deleteUser(userId) {
            return null
        }

        async function linkAccount(userId, providerId, providerType, providerAccountId, refreshToken, accessToken, accessTokenExpires) {
            return null
        }

        async function unlinkAccount(userId, providerId, providerAccountId) {
            return null
        }

        async function createSession(user) {
            return null
        }

        async function getSession(sessionToken) {
            return null
        }

        async function updateSession(session, force) {
            return null
        }

        async function deleteSession(sessionToken) {
            return null
        }

        async function createVerificationRequest(identifier, url, token, secret, provider) {
            return null
        }

        async function getVerificationRequest(identifier, token, secret, provider) {
            return null
        }

        async function deleteVerificationRequest(identifier, token, secret, provider) {
            return null
        }

        return {
            createUser,
            getUser,
            getUserByEmail,
            getUserByProviderAccountId,
            getUserByCredentials,
            updateUser,
            deleteUser,
            linkAccount,
            unlinkAccount,
            createSession,
            getSession,
            updateSession,
            deleteSession,
            createVerificationRequest,
            getVerificationRequest,
            deleteVerificationRequest
        }
    }

    return {
        getAdapter
    }
}

export default {
    Adapter
}