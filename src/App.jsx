import { useState, useEffect } from 'react'

import './App.css'


import Header from './Components/Header';
import RecipeModal from './Components/RecipeModal';
import LoadingGif from './Components/LoadingGif';



const App = () => {

  const [ingredients, setIngredients] = useState('')
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false);

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


    const apiKey =  "";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
     
    //console.log(VITE_API_KEY_GEMINI);

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
      setShowModal(true); // Show the modal with the generated recipe
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
    <div className='body'>
    <h1>Create Delicious <br /> Recipies in seconds!</h1> 
    <p>Enter your ingredients choose your preferences, and let our <br /> AI create the perfect recipe for you. </p>
     
    <div className="inputField">
  <input
    type="text"
    className="recipeinput"
    placeholder="Enter Ingredients (e.g., tomato, onion, garlic) to generate recipes using AI"
    onChange={(e) => setIngredients(e.target.value)}
    value={ingredients}
  />
  <span> <button onClick={fetchRecipes}>Generate</button> </span> 
</div>
      <div className='output'>
        {loading ? (
          <>
          <LoadingGif />
          <p>Cooking up recipe...</p>
          </>
        ) : (
          <small>
            {recipes.map((recipe, index) => (
              <div key={index}>
               </div>
            ))}
            <p>NOTE: This recipe is AI-generated and DishPal has not verified it for accuracy or safety. It may contain errors.
               Always use your best judgement when making AI-generated dishes</p>
          </small>
          
        )}
      </div>



    </div>
    
  

    {showModal && (
        <RecipeModal 
          recipe={recipes[0]} 
          onClose={() => setShowModal(false)} 
        />
      )}

    </>
  );
};

export default App
