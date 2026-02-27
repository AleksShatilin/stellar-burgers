import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getUserOrders,
  selectUserOrders
} from '../../services/slices/userSlice';
import { ProfileOrdersUI } from '@ui-pages';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectUserOrders);

  useEffect(() => {
    // dispatch(getUserOrders()); // отключено из-за нестабильности API
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};