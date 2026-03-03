import { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { selectFeedOrders } from '../../services/slices/feedSlice';
import { selectUserOrders } from '../../services/slices/userSlice';
import { selectIngredients } from '../../services/slices/ingredientsSlice';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const feedOrders = useSelector(selectFeedOrders);
  const userOrders = useSelector(selectUserOrders);
  const ingredients = useSelector(selectIngredients);

  // Ищем заказ по номеру (сначала в ленте, потом в истории)
  const orderData = [...feedOrders, ...userOrders].find(
    (order) => order.number === Number(number)
  );

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: (typeof ingredients)[0] & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }
        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
