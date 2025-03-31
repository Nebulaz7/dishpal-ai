import React from "react";
import "./RecipeModal.css";

const RecipeModal = ({ recipe, onClose }) => {
  if (!recipe) return null;

  return (
    <div className="recipe-container">
      <button className="close-button" onClick={onClose}> X
      </button>
      <h2 className="recipe-title">{recipe.title}</h2>
      <p className="recipe-description">{recipe.description}</p>
      
      <div className="recipe-meta">
        <span>⏳ Prep Time: {recipe.prepTime}</span>
        <span>🔥 Cook Time: {recipe.cookTime}</span>
        <span>🍽️ Servings: {recipe.servings}</span>
      </div>
      
      <div className="recipe-section">
        <h3>🛒 Ingredients</h3>
        <ul className="ingredients-list">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
      
      <div className="recipe-section">
        <h3>📖 Instructions</h3>
        <ol className="instructions-list">
          {recipe.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </div>

      {recipe.tips && (
        <div className="recipe-tips">
          <h3>💡 Tips</h3>
          <p>{recipe.tips}</p>
        </div>
      )}
    </div>
  );
};

export default RecipeModal;
