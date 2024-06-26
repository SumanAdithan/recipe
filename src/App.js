import React, { useState, useEffect } from 'react';
import { fetchRecipes, fetchRecipesById } from './utils/api';
import Loader from './components/Loader/Loader';
import Header from './components/Header/Header';
import RecipeList from './components/RecipeList/RecipeList';

const App = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchRecipesData = async () => {
            try {
                const data = await fetchRecipes();
                setRecipes(data);
                setLoading(false);
            } catch {
                setLoading(false);
            }
        };
        fetchRecipesData();
    }, []);

    const filteredRecipe = recipes.filter((rec) =>
        rec.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const recipesToDisplay = searchQuery ? filteredRecipe : recipes;

    return (
        <div className='App'>
            <Header title={'Recipe App'} setSearchQuery={setSearchQuery} />
            {loading ? (
                <Loader name={'recipe is loading...!'} />
            ) : (
                <RecipeList recipes={recipesToDisplay} />
            )}
        </div>
    );
};

export default App;
