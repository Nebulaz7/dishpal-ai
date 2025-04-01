import { useState } from 'react';
import './App.css';

// Components
import Header from './Components/Header';
import RecipeModal from './Components/RecipeModal';
import LoadingGif from './Components/LoadingGif';
import ImageCard from './Components/ImageCard';

// Assets
import logo from '../public/dishpal-logo-favico.png';
import waffles from './assets/waffles.jpg';

const App = () => {
  // State management
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');

  const fetchRecipes = async () => {
    // Validate input
    if (!ingredients.trim()) {
      setError('Please enter at least one ingredient');
      return;
    }

    setLoading(true);
    setError('');

    // API request configuration
    const apiKey = "";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    
    const prompt = buildRecipePrompt(ingredients);

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

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      const data = await response.json();
      const recipeObject = processApiResponse(data);
      
      setRecipes([recipeObject]);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setError('Failed to generate recipe. Please try again.');
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to build the prompt
  const buildRecipePrompt = (ingredientsList) => {
    return `Create a detailed recipe for: ${ingredientsList}, and include only one recipe, don't include any other text just strictly the.
    
    Avoid using any other text especially \`\`\` json \`\`\` before you start, only include the ingredients separated by commas. please Please format your response with the following structure:
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
  };

  // Helper function to process API response
  const processApiResponse = (data) => {
    let aiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't process your request.";

    // Clean and format the response
    aiResponse = aiResponse.replace(/```json|```/g, "").trim();
    aiResponse = aiResponse.replace(/(\w+):/g, '"$1":'); // Wrap property names in double quotes

    // Parse the corrected JSON
    return JSON.parse(aiResponse);
  };

  // Handle input change
  const handleInputChange = (e) => {
    setIngredients(e.target.value);
    if (error) setError('');
  };

  return (
    <div className="app-container">
      <Header sourceImg={logo} />
      
      <main className="hero-section">
        <div className="hero-content">
          <h1>Create Delicious <br /> Recipes in seconds!</h1>
          <p className="subtitle">
            Enter your ingredients, choose your preferences, and let our <br /> 
            AI create the perfect recipe for you.
          </p>
          
          <div className="search-container">
            <input
              type="text"
              className="recipe-input"
              placeholder="Enter ingredients (e.g., tomato, onion, garlic)"
              onChange={handleInputChange}
              value={ingredients}
              aria-label="Recipe ingredients"
            />
            <button 
              onClick={fetchRecipes} 
              className="generate-btn"
              disabled={loading}
            >
              {loading ? 'Generating...' : 'Generate Recipe'}
            </button>
          </div>
          
          {error && <p className="error-message">{error}</p>}
          
          <div className="recipe-output">
            {loading ? (
              <div className="loading-container">
                <LoadingGif />
                <p className="loading-text">Cooking up recipe...</p>
              </div>
            ) : (
              <p className="disclaimer">
                NOTE: This recipe is AI-generated and DishPal has not verified it for accuracy or safety. 
                It may contain errors. Always use your best judgment when making AI-generated dishes.
              </p>
            )}
          </div>
        </div>
      </main>

      <section className="featured-recipes">
        <h2 className="section-title">Featured Recipes</h2>
        <div className="recipe-cards">
          <ImageCard 
            source={waffles}
            title={"Waffles"}
            about={"A very delicious recipe"}
          />
          {/* More recipe cards can be added here */}
        </div>
      </section>

      {showModal && (
        <RecipeModal 
          recipe={recipes[0]} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </div>
  );
};

export default App;