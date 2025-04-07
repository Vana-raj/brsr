import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Supplier = {
  key: string;
  supplier: string;
  industry: string;
  service: string[];
  product: string;
  website: string;
  aboutUs: string;
};

interface SupplierState {
  data: Supplier[];
  singleSupplier:Supplier;
}

const initialState: SupplierState = {
  data: [],
  singleSupplier: {
    key: "",
    supplier: "",
    industry: "",
    service: [],
    product: "",
    website: "",
    aboutUs: "",
}
};

const supplierSlice = createSlice({
  name: 'suppliers',
  initialState,
  reducers: {
    setSuppliers(state, action: PayloadAction<Supplier[]>) {
      state.data = action.payload;
    },
    setSelectedRecord: (state, action: PayloadAction<Supplier>) => {
        state.singleSupplier = action.payload;
      },
      
  },
});


export const { setSuppliers,setSelectedRecord } = supplierSlice.actions;
export default supplierSlice.reducer;

