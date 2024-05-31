// api url and endpoints
const baseURL = 'https://api-recipe.vercel.app/';

const END_POINTS = {
    recipes: 'recipes',
    recipesId: 'recipes/:id',
};

// api specific function
export const fetchRecipes = async () => {
    const url = `${baseURL}${END_POINTS.recipes}`;
    return await fetchData(url);
};

export const fetchRecipesById = async (id) => {
    const url = `${baseURL}${END_POINTS.recipesId}`.replace(':id', id);
    return await fetchData(url);
};

// api helper function
const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response) {
            console.log('response failed');
        }

        return await response.json();
    } catch (err) {
        console.log(err.message);
    }
};
