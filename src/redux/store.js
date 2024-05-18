import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { profileApi } from '../redux/services/Profile';
import authReducer from '../redux/slices/authSlice';
// import userReducer from '../redux/Slices/userSlice';

export const store = configureStore({
    reducer: {
        // Add the generated reducer as a specific top-level slice
        [profileApi.reducerPath]: profileApi.reducer,
        auth: authReducer,
        // user: userReducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(profileApi.middleware),
});

// Optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// See `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
