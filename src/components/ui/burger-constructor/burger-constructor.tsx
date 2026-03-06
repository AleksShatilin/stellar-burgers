import React, { FC, memo } from 'react';
import {
  ConstructorElement,
  CurrencyIcon,
  Button
} from '@zlden/react-developer-burger-ui-components';
import { Modal } from '@components';
import { OrderInfo } from '@components';
import { Preloader } from '@ui';
import { TOrder } from '@utils-types';
import styles from './burger-constructor.module.css';
import { BurgerConstructorUIProps } from './type';
import { BurgerConstructorElement } from '../../burger-constructor-element';
import { OrderDetailsUI } from '../order-details'; // ← добавить импорт

export const BurgerConstructorUI: FC<BurgerConstructorUIProps> = memo(
  ({
    constructorItems,
    orderRequest,
    price,
    orderModalData,
    onOrderClick,
    closeOrderModal
  }) => {
    const { bun, ingredients } = constructorItems;

    return (
      <>
        <section className={styles.burger_constructor}>
          {bun ? (
            <div className={`${styles.element} ml-8 mb-4 mt-4`}>
              <ConstructorElement
                type='top'
                isLocked
                text={`${bun.name} (верх)`}
                price={bun.price}
                thumbnail={bun.image}
              />
            </div>
          ) : (
            <div
              className={`${styles.noBuns} ${styles.noBunsTop} ml-8 mb-4 mr-5 text text_type_main-default`}
            >
              Выберите булки
            </div>
          )}

          <ul className={styles.elements}>
            {ingredients.length > 0 ? (
              ingredients.map((item, index) => (
                <BurgerConstructorElement
                  key={item.id}
                  ingredient={item}
                  index={index}
                  totalItems={ingredients.length}
                />
              ))
            ) : (
              <div
                className={`${styles.noBuns} ml-8 mb-4 mr-5 text text_type_main-default`}
              >
                Выберите начинку
              </div>
            )}
          </ul>

          {bun ? (
            <div className={`${styles.element} ml-8 mb-4 mt-4`}>
              <ConstructorElement
                type='bottom'
                isLocked
                text={`${bun.name} (низ)`}
                price={bun.price}
                thumbnail={bun.image}
              />
            </div>
          ) : (
            <div
              className={`${styles.noBuns} ${styles.noBunsBottom} ml-8 mb-4 mr-5 text text_type_main-default`}
            >
              Выберите булки
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

        {orderRequest && (
          <Modal onClose={closeOrderModal} title={'Оформляем заказ...'}>
            <Preloader />
          </Modal>
        )}

        {orderModalData && !orderRequest && (
          <Modal onClose={closeOrderModal} title={''}>
            <OrderDetailsUI orderNumber={orderModalData.number} />
          </Modal>
        )}
      </>
    );
  }
);
