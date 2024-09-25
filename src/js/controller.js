import 'core-js/actual';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';

// if (module.hot) {
//   module.hot.accept
// }

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const getRecipe = async function () {
  try {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    recipeView.loadSpinner();

    // Update results view to mark selected search resilt
    resultView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

    // Loading Recipe
    await model.loadRecipe(hash);

    // Render Recipe
    recipeView.render(model.state.recipe);
    // controlServings(8)
  } catch (error) {
    console.error(error);
    recipeView.renderError();
  }
};

// getRecipe();

const controllerSearchResults = async function () {
  try {
    resultView.loadSpinner();

    // Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // Load search results
    await model.loadSearchResults(query);

    // Render Result
    resultView.render(model.getSearchResultsPage());

    // Render Initial Pagination
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};

const controlPagination = function (goToPage) {
  // New Render Result
  resultView.render(model.getSearchResultsPage(goToPage));

  // New Render Initial Pagination
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  model.updateServings(newServings);

  // Render new recipe
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // Add or remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // Update recipe view
  recipeView.update(model.state.recipe);

  // Render Bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Show Spinner
    addRecipeView.loadSpinner();
    // Upload Recipe
    await model.uploadRecipe(newRecipe);

    // Render Recipe
    recipeView.render(model.state.recipe);

    // Success Message
    addRecipeView.renderMessage();

    // Render Bookmark view
    bookmarksView.render(model.state.bookmarks);

    // Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Close from window
    setTimeout(function () {
      addRecipeView.toggleWindows();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (error) {
    addRecipeView.renderError(error.message);
    console.log(error);
  }
};

const init = function () {
  bookmarksView.addRenderHandler(controlBookmarks);
  recipeView.addHandlerRender(getRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controllerSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView._addHandlerUpload(controlAddRecipe);
};

init();

// window.addEventListener('hashchange', getRecipe);
// window.addEventListener('load', getRecipe);
