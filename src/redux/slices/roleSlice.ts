import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Role = 'lead' | 'member';

interface RoleState {
  currentRole: Role;
  currentUserId: string | null; // store ID instead of name
}

const initialState: RoleState = {
  currentRole: 'lead',
  currentUserId: null, // no user selected initially
};

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    switchRole: (state, action: PayloadAction<Role>) => {
      state.currentRole = action.payload;
    },
    setUser: (state, action: PayloadAction<string>) => {
      state.currentUserId = action.payload; // save member.id globally
    },
  },
});

export const { switchRole, setUser } = roleSlice.actions;
export default roleSlice.reducer;
