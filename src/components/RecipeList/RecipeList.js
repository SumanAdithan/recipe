import React from 'react';
import styles from './RecipeList.module.scss';
import { Link } from 'react-router-dom';
import cx from 'classnames';

const RecipeList = ({ recipes = [] }) => {
    const checkForRecipes = () => {
        if (recipes.length === 0) {
            return <div>No recipes Found, search for different item</div>;
        } else {
            return renderList();
        }
    };

    const renderList = () => {
        return (
            <div className={styles.list}>
                {recipes.map((recipe, i) => (
                    <Link
                        key={recipe.id}
                        className={styles.linkItem}
                        to={`/recipe/${recipe.id}`}
                    >
                        <div className={styles.cardContainer}>
                            <div className={styles.cardHeading}>
                                {recipe.title}
                            </div>
                            <div className={styles.recipeInfo}>
                                <span className={cx(styles.tag, styles.level)}>
                                    {recipe.level}
                                </span>
                                <span className={cx(styles.tag, styles.time)}>
                                    {recipe.time}
                                </span>
                                <span className={cx(styles.tag, styles.level)}>
                                    {recipe.isVeg ? 'Veg' : 'Non-Veg'}
                                </span>
                            </div>
                            <img
                                className={styles.image}
                                src={recipe.image}
                                alt={recipe.title}
                            />
                        </div>
                    </Link>
                ))}
            </div>
        );
    };

    return (
        <div className={styles.recipeList}>
            <h3 className={styles.title}>Check out these recipes</h3>
            {checkForRecipes()}
        </div>
    );
};

export default RecipeList;
