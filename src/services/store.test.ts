import { rootReducer } from './store';
import store from './store';

describe('rootReducer', () => {
  it('должен возвращать начальное состояние при вызове с undefined и неизвестным экшеном', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };
    const state = rootReducer(undefined, unknownAction);

    expect(state).toEqual(store.getState());
  });
});
