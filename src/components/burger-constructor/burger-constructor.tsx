import { FC, useMemo } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectBun,
  selectIngredients,
  clearConstructor,
  moveIngredientUp,
  moveIngredientDown
} from '../../services/slices/constructorSlice';
import {
  createOrder,
  clearOrder,
  selectOrderRequest,
  selectOrderModalData
} from '../../services/slices/orderSlice';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../services/slices/userSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const bun = useSelector(selectBun);
  const ingredients = useSelector(selectIngredients);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderModalData);

  const constructorItems = {
    bun: bun,
    ingredients: ingredients
  };

  const handleMoveUp = (index: number) => {
    dispatch(moveIngredientUp(index));
  };

  const handleMoveDown = (index: number) => {
    dispatch(moveIngredientDown(index));
  };

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!constructorItems.bun || orderRequest) return;

    const ingredientsIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map(
        (item: TConstructorIngredient) => item._id
      ),
      constructorItems.bun._id
    ];

    dispatch(createOrder(ingredientsIds)).then(() => {
      dispatch(clearConstructor());
    });
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
      onMoveUp={handleMoveUp}
      onMoveDown={handleMoveDown}
    />
  );
};
