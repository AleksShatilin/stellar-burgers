import {
  ingredientsReducer as reducer,
  fetchIngredients,
  initialState
} from './ingredientsSlice';
import { TIngredient } from '@utils-types';

describe('ingredients slice', () => {
  const mockIngredients: TIngredient[] = [
    {
      _id: '1',
      name: 'Биокотлета',
      type: 'main',
      proteins: 42,
      fat: 42,
      carbohydrates: 42,
      calories: 42,
      price: 100,
      image: '',
      image_mobile: '',
      image_large: ''
    }
  ];

  it('должен устанавливать isLoading=true при pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('должен сохранять ингредиенты и isLoading=false при fulfilled', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toEqual(mockIngredients);
    expect(state.error).toBe(null);
  });

  it('должен сохранять ошибку и isLoading=false при rejected', () => {
    const error = { message: 'Ошибка загрузки' };
    const action = { type: fetchIngredients.rejected.type, error };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки');
  });
});
