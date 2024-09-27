import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CustomerCartState {
    items: string[];
}

const initialState: CustomerCartState = {
    items: [],
};

const customerCartSlice = createSlice({
    name: 'customerCart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<string>) => {
            state.items.push(action.payload);
        },
        removeItem: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item !== action.payload);
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addItem, removeItem, clearCart } = customerCartSlice.actions;

export default customerCartSlice.reducer;