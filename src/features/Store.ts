import { configureStore } from '@reduxjs/toolkit';
import supplierReducer from './slices/SupplierSlice';

const store = configureStore({
    reducer: {
        suppliers: supplierReducer,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
