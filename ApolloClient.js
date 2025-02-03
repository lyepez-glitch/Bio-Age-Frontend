import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setContext } from '@apollo/client/link/context';
import Constants from "expo-constants";
// Used to set headers
// import { RENDER_URL } from '@env';
const renderUrl = Constants.expoConfig.extra.RENDER_URL;
console.log('render url', renderUrl);
// Refresh token function (make sure you implement it in your backend)
const refreshToken = async(refreshToken) => {
    try {
        const response = await fetch(`${renderUrl}/refresh-token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken })
        });

        const data = await response.json();
        return data.accessToken; // Assuming the new access token is in `accessToken`
    } catch (error) {
        console.error("Error refreshing token:");
        throw error;
    }
};

// Middleware for Apollo Client that adds the authorization header
const authLink = setContext(async(_, { headers }) => {
    const token = await AsyncStorage.getItem('token');

    return {
        headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : '',
        },
    };
});

// Middleware to handle token refresh on error
const errorLink = new ApolloLink((operation, forward) => {
    return forward(operation).map((response) => {
        // Check if the response indicates an expired token
        if (response.errors && response.errors.some(error => error.message === 'Authentication required')) {
            // Refresh token logic
            AsyncStorage.getItem('refreshToken').then(async(refreshToken) => {

                if (refreshToken) {
                    const newAccessToken = await refreshToken(refreshToken);


                    await AsyncStorage.setItem('token', newAccessToken);

                    // Retry the original request with the new token
                    operation.setContext({
                        headers: {
                            Authorization: `Bearer ${newAccessToken}`,
                        },
                    });

                    // Retry the operation
                    return forward(operation);
                }
            });
        }
        return response;
    });
});

// Apollo Client setup
const createApolloClient = async() => {
    const link = ApolloLink.from([authLink, errorLink, new HttpLink({ uri: `https://${renderUrl}/api/graphql/` })]);

    return new ApolloClient({
        link,
        cache: new InMemoryCache(),
    });
};

export default createApolloClient;