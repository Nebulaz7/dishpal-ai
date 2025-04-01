import React, { useEffect, useRef } from "react";
import "./RecipeModal.css";

const RecipeModal = ({ recipe, onClose }) => {
  if (!recipe) return null;
  
  const modalRef = useRef(null);
  
  // Close modal when clicking outside or pressing Escape key
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    
    // Add event listeners
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscKey);
    
    // Lock scroll on body
    document.body.style.overflow = "hidden";
    
    // Clean up
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  // Focus trap for accessibility
  useEffect(() => {
    const focusableElements = modalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length) {
      const firstElement = focusableElements[0];
      firstElement.focus();
    }
  }, []);

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-content" ref={modalRef}>
        <button 
          className="close-button" 
          onClick={onClose} 
          aria-label="Close recipe modal"
        >
          ×
        </button>
        
        <div className="recipe-header">
          <h2 className="recipe-title">{recipe.title}</h2>
          <p className="recipe-description">{recipe.description}</p>
        </div>
        
        <div className="recipe-meta">
          <div className="meta-item">
            <span className="meta-icon">⏱️</span>
            <div className="meta-details">
              <span className="meta-label">Prep Time</span>
              <span className="meta-value">{recipe.prepTime}</span>
            </div>
          </div>
          
          <div className="meta-item">
            <span className="meta-icon">🔥</span>
            <div className="meta-details">
              <span className="meta-label">Cook Time</span>
              <span className="meta-value">{recipe.cookTime}</span>
            </div>
          </div>
          
          <div className="meta-item">
            <span className="meta-icon">🍽️</span>
            <div className="meta-details">
              <span className="meta-label">Servings</span>
              <span className="meta-value">{recipe.servings}</span>
            </div>
          </div>
        </div>
        
        <div className="recipe-grid">
          <div className="recipe-section ingredients-section">
            <h3>
              <span className="section-icon">🛒</span>
              Ingredients
            </h3>
            <ul className="ingredients-list">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="ingredient-item">
                  <span className="ingredient-checkbox"></span>
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="recipe-section instructions-section">
            <h3>
              <span className="section-icon">📖</span>
              Instructions
            </h3>
            <ol className="instructions-list">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="instruction-item">
                  <span className="instruction-number">{index + 1}</span>
                  <p>{instruction}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
        
        {recipe.tips && (
          <div className="recipe-tips">
            <h3>
              <span className="section-icon">💡</span>
              Chef's Tips
            </h3>
            <p>{recipe.tips}</p>
          </div>
        )}
        
        <div className="recipe-footer">
          <button 
            className="print-button" 
            onClick={() => window.print()}
            aria-label="Print recipe"
          >
            🖨️ Print Recipe
          </button>
          <button 
            className="save-button" 
            aria-label="Save recipe"
          >
            ❤️ Save Recipe
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;