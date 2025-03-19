import { useState } from 'react'

import './App.css'

const App = () => {

  const [ingredients, setIngredients] = useState('')
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchRecipes = async () => {
    setLoading(true);

    const avoidTxt = "Avoid using any other text especially ``` json ``` before you start, only include the ingredients separated by commas.";

    const prompt = `Create a detailed recipe for: ${ingredients}, and include only one recipe, don't include any other text just strictly the .
    
    ${avoidTxt} Please format your response with the following structure:
    {
      title: "Recipe title",
      description: "Brief description of the dish",
      prepTime: "Preparation time",
      cookTime: "Cooking time",
      servings: "Number of servings",
      ingredients: ["ingredient 1", "ingredient 2", ...],
      instructions: ["step 1", "step 2", ...],
      tips: "Optional cooking tips"
    }`;


    const apiKey = "";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          "contents": [{
            "parts":[{"text": prompt }]
            }] 
          })
      });

      const data = await response.json();
      const aiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't process your request.";
      const recipeObject = aiResponse;
      setRecipes([recipeObject]);
     // setRecipes([aiResponse]); // Set the aiResponse string directly to the recipes state
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Welcome to DishPal</h1>

    <div>
      <input 
      type="text" 
      placeholder='Enter Ingredients (eg. tomato, onion, garlic) to generate recipes using ai'
      onChange={(e) => setIngredients(e.target.value)}
      value={ingredients}
      />

      <button
      onClick={fetchRecipes}
      >
        Generate Recipes
      </button>

      <div className='output'>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <small>
            {recipes.map((recipe, index) => (
              <p key={index}>{recipe.title}</p>
            ))}
          </small>
        )}
      </div>



    </div>
    
    </div>

   
  );
};

export default App
