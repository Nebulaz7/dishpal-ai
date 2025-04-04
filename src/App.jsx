import { useState } from 'react';
import {  Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Components
import Header from './Components/Header';
import RecipeModal from './Components/RecipeModal';
// import LoadingGif from './Components/LoadingGif';
import ImageCard from './Components/ImageCard';
import Footer from './Components/Footer';
import ComingSoon from './Components/ComingSoon';
//  import ContactUs from "./Components/ContactUs";

// Assets
import logo from './assets/dishpal-logo-favico.png';
import waffles from './assets/waffles.jpg';
import tacos from './assets/tacos.jpg';
import spag from './assets/spag.jpg';
import jollof from './assets/jollof.jpg';

// HomePage component that contains main content
const HomePage = ({ 
  ingredients, 
  setIngredients, 
  recipes, 
  loading, 
  fetchRecipes, 
  error, 
  handleInputChange 
}) => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();

  return (
    <>
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
                {/* <LoadingGif /> */}
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
        <h2 className="section-title">Recently Generated Recipes.</h2>
        <div className="recipe-cards" id='Recipes'>
          <ImageCard 
            source={waffles}
            title={"Waffles"}
            about={"A very delicious recipe"}
            timestamp={` ${hours}:09, ${day}/${month}/${year}`}
          />
          <ImageCard 
            source={spag}
            title={"Spaghetti"}
            about={"A very delicious recipe"}
            timestamp={` ${hours - 1}:23, ${day}/${month}/${year}`}
          />
          <ImageCard 
            source={jollof}
            title={"Jollof Rice"}
            about={"A very delicious recipe"}
            timestamp={` ${hours - 4}:34, ${day}/${month}/${year}`}
          />
          <ImageCard 
            source={tacos}
            title={"Tacos"}
            about={"A very delicious recipe"}
            timestamp={` ${hours - 5}:17, ${day}/${month}/${year}`}
          />
        </div>
      </section>
    </>
  );
};

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
    const APIKEY = import.meta.env.VITE_API_KEY_GEMINI;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${APIKEY}`;
    
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
      setError(`Failed to generate recipe. Please try again.
        Make sure you separate ingredients with a comma.`);
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
        
        <Routes>
          <Route path="/" element={
            <HomePage 
              ingredients={ingredients}
              setIngredients={setIngredients}
              recipes={recipes}
              loading={loading}
              fetchRecipes={fetchRecipes}
              error={error}
              handleInputChange={handleInputChange}
            />
          } />
          <Route path="/coming-soon" element={<ComingSoon />} />
          <Route path="/about" element={<Navigate to="/coming-soon" />} />
          <Route path="/contact" element={<Navigate to="/coming-soon" />} />
          <Route path="/blog" element={<Navigate to="/coming-soon" />} />
          
          {/* Catch-all route for non-existent pages */}
          <Route path="*" element={<Navigate to="/coming-soon" />} />
        </Routes>
        
        <Footer />

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