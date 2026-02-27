import styles from './ingredients-category.module.css';
import { forwardRef } from 'react';
import { useLocation } from 'react-router-dom';
import { TIngredient } from '@utils-types';
import { TIngredientsCategoryUIProps } from './type';
import { BurgerIngredientUI } from '../burger-ingredient'; // ← правильный импорт

export const IngredientsCategoryUI = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryUIProps
>(
  (
    { title, titleRef, ingredients, ingredientsCounters, onAddToConstructor },
    ref
  ) => {
    const location = useLocation();

    return (
      <>
        <h3 className='text text_type_main-medium mt-10 mb-6' ref={titleRef}>
          {title}
        </h3>
        <ul className={styles.items} ref={ref}>
          {ingredients.map((ingredient: TIngredient) => (
            <BurgerIngredientUI
              ingredient={ingredient}
              key={ingredient._id}
              count={ingredientsCounters[ingredient._id]}
              handleAdd={() => {
                if (onAddToConstructor) {
                  onAddToConstructor(ingredient);
                }
              }}
              locationState={{ background: location }}
            />
          ))}
        </ul>
      </>
    );
  }
);
