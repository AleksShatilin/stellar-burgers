import {
  constructorReducer,
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  initialState
} from './constructorSlice';
import { TIngredient } from '@utils-types';

describe('burgerConstructor slice', () => {
  const mockIngredient: TIngredient = {
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
  };

  const mockBun: TIngredient = {
    ...mockIngredient,
    _id: '2',
    name: 'Булка',
    type: 'bun',
    price: 200
  };

  it('должен добавлять начинку', () => {
    const newState = constructorReducer(
      initialState,
      addIngredient(mockIngredient)
    );
    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients[0].name).toBe('Биокотлета');
  });

  it('должен добавлять булку (заменять предыдущую)', () => {
    let state = constructorReducer(initialState, addIngredient(mockBun));
    expect(state.bun?.name).toBe('Булка');

    const newBun = { ...mockBun, _id: '3', name: 'Новая булка' };
    state = constructorReducer(state, addIngredient(newBun));
    expect(state.bun?.name).toBe('Новая булка');
    expect(state.ingredients).toHaveLength(0);
  });

  it('должен удалять ингредиент', () => {
    let state = constructorReducer(initialState, addIngredient(mockIngredient));
    expect(state.ingredients).toHaveLength(1);

    state = constructorReducer(
      state,
      removeIngredient(state.ingredients[0].id)
    );
    expect(state.ingredients).toHaveLength(0);
  });

  it('должен перемещать ингредиент вверх', () => {
    let state = constructorReducer(initialState, addIngredient(mockIngredient));
    state = constructorReducer(
      state,
      addIngredient({ ...mockIngredient, _id: '2', name: 'Второй' })
    );

    expect(state.ingredients[0].name).toBe('Биокотлета');
    expect(state.ingredients[1].name).toBe('Второй');

    state = constructorReducer(state, moveIngredientUp(1));

    expect(state.ingredients[0].name).toBe('Второй');
    expect(state.ingredients[1].name).toBe('Биокотлета');
  });

  it('должен перемещать ингредиент вниз', () => {
    let state = constructorReducer(initialState, addIngredient(mockIngredient));
    state = constructorReducer(
      state,
      addIngredient({ ...mockIngredient, _id: '2', name: 'Второй' })
    );

    expect(state.ingredients[0].name).toBe('Биокотлета');
    expect(state.ingredients[1].name).toBe('Второй');

    state = constructorReducer(state, moveIngredientDown(0));

    expect(state.ingredients[0].name).toBe('Второй');
    expect(state.ingredients[1].name).toBe('Биокотлета');
  });
});
