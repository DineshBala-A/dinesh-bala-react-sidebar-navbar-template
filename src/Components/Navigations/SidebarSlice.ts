import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

// Define a type for the slice state
export interface SidebarState {
  value: boolean
}

const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
// Define the initial state using that type
const initialState: SidebarState = {
  value: !isMobile // collapsed if on mobile
};

export const SidebarSlice = createSlice({
  name: 'sidebar',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    open:(state)=>{
        state.value = true
    },
    close : (state)=>{
        state.value = false
    }, 
    toggle : (state) =>{
      state.value = !state.value
    }
  }
})

export const { open, close, toggle} = SidebarSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const sidebar_state = (state: RootState) => state.sidebar.value

export default SidebarSlice.reducer