import { FC, SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { loginUser, selectUserError } from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { LoginUI } from '@ui-pages';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(selectUserError);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log('🔵 Попытка входа:', { email, password });

    dispatch(loginUser({ email, password }))
      .unwrap()
      .then((result) => {
        console.log('✅ Успешный вход:', result);
        navigate('/');
      })
      .catch((err) => {
        console.log('❌ Ошибка входа:', err);
      });
  };

  return (
    <LoginUI
      errorText={error || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
