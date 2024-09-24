import Views from './Views';
import icons from 'url:../../img/icons.svg';
import previewView from './previewView';

class resultView extends Views {
  _parentEl = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query. Please try again!';
  _message = '';
  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new resultView();
