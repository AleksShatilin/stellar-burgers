import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser, TOrder } from '@utils-types';
import {
  loginUserApi,
  registerUserApi,
  logoutApi,
  getUserApi,
  updateUserApi,
  getOrdersApi,
  TLoginData,
  TRegisterData
} from '@api';
import { RootState } from '../store'; // ← добавить импорт

type UserState = {
  user: TUser | null;
  orders: TOrder[];
  isAuthChecked: boolean;
  isLoading: boolean;
  error: string | null;
};

const initialState: UserState = {
  user: null,
  orders: [
    {
      _id: '1',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Космический бургер',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      number: 12345
    },
    {
      _id: '2',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa0944'
      ],
      status: 'pending',
      name: 'Люминесцентный бургер',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 86400000).toISOString(),
      number: 12346
    }
  ],
  isAuthChecked: false,
  isLoading: false,
  error: null
};

// Регистрация
export const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);
    return response.user;
  }
);

// Вход
export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => {
    const response = await loginUserApi(data);
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
);

// Выход
export const logoutUser = createAsyncThunk('user/logout', async () => {
  await logoutApi();
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
});

// Получение пользователя
export const getUser = createAsyncThunk('user/getUser', async () => {
  const response = await getUserApi();
  return response.user;
});

// Обновление пользователя
export const updateUser = createAsyncThunk(
  'user/update',
  async (data: Partial<TRegisterData>) => {
    const response = await updateUserApi(data);
    return response.user;
  }
);

// Получение истории заказов пользователя
export const getUserOrders = createAsyncThunk('user/getOrders', async () => {
  const response = await getOrdersApi();
  return response;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder
      // Регистрация
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка регистрации';
        state.isAuthChecked = true;
      })

      // Вход
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка входа';
        state.isAuthChecked = true;
      })

      // Выход
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.orders = [];
      })

      // Получение пользователя
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(getUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthChecked = true;
      })

      // Обновление пользователя
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка обновления';
      })

      // История заказов
      .addCase(getUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(getUserOrders.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export const { authChecked } = userSlice.actions;
export const userReducer = userSlice.reducer;

// Селекторы (исправлено)
export const selectUser = (state: RootState) => state.user.user;
export const selectUserOrders = (state: RootState) => state.user.orders;
export const selectIsAuthChecked = (state: RootState) =>
  state.user.isAuthChecked;
export const selectIsLoading = (state: RootState) => state.user.isLoading;
export const selectUserError = (state: RootState) => state.user.error;
