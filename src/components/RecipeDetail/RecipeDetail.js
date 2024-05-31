import React, { useEffect, useState } from 'react';
import { fetchRecipesById } from '../../utils/api';
import { Link, useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import styles from './RecipeDetail.module.scss';
import cx from 'classnames';

const RecipeDetail = () => {
    const [recipe, setRecipe] = useState({});
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        const fetchRecipeData = async () => {
            try {
                const data = await fetchRecipesById(id);
                setRecipe(data);
                setLoading(false);
            } catch {
                setLoading(false);
            }
        };
        fetchRecipeData();
    }, [id]);

    useEffect(() => {
        const fav = JSON.parse(localStorage.getItem('fav')) || [];
        const isRecipeFav = fav.some((rec) => rec.id === recipe.id);
        setIsFavorite(true);
    }, [recipe]);

    const handleToggleFav = () => {
        setIsFavorite((prevVal) => !prevVal);
        const fav = JSON.parse(localStorage.getItem('fav')) || [];
        const updateFav = isFavorite
            ? fav.filter((rec) => rec.id !== recipe.id)
            : [...fav, recipe];
        localStorage.setItem('fav', JSON.stringify(updateFav));
    };

    return (
        <div>
            {loading ? (
                <Loader />
            ) : (
                <div className={styles.details}>
                    <Link to={'/'}>Go back</Link>
                    <div className={styles.header}>
                        <h2>{recipe.title}</h2>
                        <button
                            className={styles.favBtn}
                            onClick={handleToggleFav}
                        >
                            {isFavorite
                                ? '- remove from favorites'
                                : '+ Add to favourites'}
                        </button>
                    </div>
                    <div className={styles.content}>
                        <img
                            className={styles.image}
                            src={recipe.image}
                            alt={recipe.title}
                        />
                        <div className={styles.recipeInfo}>
                            <span className={cx(styles.tag, styles.level)}>
                                {recipe.level}
                            </span>
                            <span className={cx(styles.tag, styles.time)}>
                                {recipe.time}
                            </span>
                            <span className={cx(styles.tag, styles.veg)}>
                                {recipe.isVeg ? 'Veg' : 'Non-Veg'}
                            </span>
                        </div>
                        <div className={styles.tags}>
                            {recipe.ingredients.map((ingredient, i) => (
                                <span className={styles.ingredient} key={i}>
                                    {ingredient}
                                </span>
                            ))}
                        </div>
                        <h3>Instructions</h3>
                        <ol className={styles.instruction}>
                            {recipe.instructions.map((instruction, i) => (
                                <li key={i}>{instruction}</li>
                            ))}
                        </ol>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecipeDetail;
