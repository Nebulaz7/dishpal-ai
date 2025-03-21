import { useState } from 'react'

import './App.css'
import Header from './Components/Header';

const App = () => {

  const [ingredients, setIngredients] = useState('')
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)

  

  const fetchRecipes = async () => {
    setLoading(true);

    const avoidTxt = "Avoid using any other text especially ``` json ``` before you start, only include the ingredients separated by commas. please";

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


    const apiKey = 4 ;
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
      let aiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't process your request.";

       // Remove markdown formatting and trim
  aiResponse = aiResponse.replace(/```json|```/g, "").trim();

  // Convert the invalid JSON-like string to valid JSON
  aiResponse = aiResponse.replace(/(\w+):/g, '"$1":'); // Wrap property names in double quotes

  console.log("AI Response:", aiResponse); // Debugging step

  // Parse the corrected JSON
  const recipeObject = JSON.parse(aiResponse);
  console.log("Parsed Recipe Object:", recipeObject);

  
      
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
    <>
     <Header />
    <div>
   
      <h1>Welcome to DishPal</h1>

    <div>
      <p>
      <input 
      type="text" 
      className='recipeinput'
      placeholder='Enter Ingredients (eg. tomato, onion, garlic) to generate recipes using ai'
      onChange={(e) => setIngredients(e.target.value)}
      value={ingredients}
      />
      </p>
      
      <button
      onClick={fetchRecipes}
      >
        Generate Recipe
      </button>

      <div className='output'>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <small>
            {recipes.map((recipe, index) => (
              <div key={index}>
                <p>{recipe.title}</p>
                <p>{recipe.description}</p>
                <p>{recipe.prepTime}</p>
                <p>{recipe.cookTime}</p>
                <p>{recipe.servings}</p>
                <p>{recipe.ingredients}</p>
                <p>{recipe.instructions}</p>
                <p>{recipe.tips}</p>
              </div>
            ))}
            <p>NOTE: This recipe is AI-generated and DishGen has not verified it for accuracy or safety. It may contain errors. Always use your best judgement when making AI-generated dishes</p>
          </small>
          
        )}
      </div>



    </div>
    
    </div>

    </>
  );
};

export default App
