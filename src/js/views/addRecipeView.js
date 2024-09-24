import Views from './Views';
import icons from 'url:../../img/icons.svg';

class AddRecipeView extends Views {
  _parentEl = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  _message = "Recipe was successfully uploaded!"

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
    // this._addHandlerUpload();
  }


  toggleWindows(){
      this._overlay.classList.toggle('hidden');
      this._window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindows.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindows.bind(this));
    this._overlay.addEventListener('click', this.toggleWindows.bind(this));
  }

  _addHandlerUpload(handler){
    this._parentEl.addEventListener('submit', function(e){
        e.preventDefault();
        const dataArr = new FormData(this)
        // Take array of entries and convert it to objects
        const data = Object.fromEntries(dataArr)
        handler(data)
    })
  }

}

export default new AddRecipeView();
