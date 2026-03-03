import React, { FC, memo } from 'react';
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button
} from '@zlden/react-developer-burger-ui-components';
import { Modal } from '@components';
import { OrderInfo } from '@components';
import { Preloader } from '@ui';
import { TOrder } from '@utils-types';
import styles from './burger-constructor.module.css';
import { BurgerConstructorUIProps } from './type';

export const BurgerConstructorUI: FC<BurgerConstructorUIProps> = memo(
  ({
    constructorItems,
    orderRequest,
    price,
    orderModalData,
    onOrderClick,
    closeOrderModal,
    onMoveUp,
    onMoveDown,
    onRemove
  }) => {
    const { bun, ingredients } = constructorItems;

    return (
      <>
        <section className={styles.burger_constructor}>
          {bun && (
            <div className={`${styles.element} ml-8`}>
              <ConstructorElement
                type='top'
                isLocked
                text={`${bun.name} (верх)`}
                price={bun.price}
                thumbnail={bun.image}
              />
            </div>
          )}
          <ul className={styles.elements}>
            {ingredients.map((item, index) => (
              <li key={item.id} className={styles.element}>
                <div className={styles.element_container}>
                  <DragIcon type='primary' />
                  <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                    handleClose={() => onRemove(item.id)}
                  />
                  <div className={styles.buttons}>
                    <button
                      className={styles.button}
                      onClick={() => onMoveUp(index)}
                      disabled={index === 0}
                    >
                      ↑
                    </button>
                    <button
                      className={styles.button}
                      onClick={() => onMoveDown(index)}
                      disabled={index === ingredients.length - 1}
                    >
                      ↓
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {bun && (
            <div className={`${styles.element} ml-8`}>
              <ConstructorElement
                type='bottom'
                isLocked
                text={`${bun.name} (низ)`}
                price={bun.price}
                thumbnail={bun.image}
              />
            </div>
          )}
          <div className={styles.total}>
            <p className='text text_type_digits-medium mr-2'>
              {price} <CurrencyIcon type='primary' />
            </p>
            <Button
              htmlType='button'
              type='primary'
              size='large'
              onClick={onOrderClick}
              disabled={!bun || ingredients.length === 0}
            >
              Оформить заказ
            </Button>
          </div>
        </section>
        {orderRequest && <Preloader />}
        {orderModalData && !orderRequest && (
          <Modal onClose={closeOrderModal} title='Детали заказа'>
            <OrderInfo />
          </Modal>
        )}
      </>
    );
  }
);
