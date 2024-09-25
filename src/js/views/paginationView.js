import Views from './Views';
import icons from 'url:../../img/icons.svg';

class paginationView extends Views {
  _parentEl = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const currPage = this._data.page;
    // console.log(numPages);

    // Page 1 and there are other pages
    if (currPage === 1 && numPages > 1) {
      return this._buttonNext(currPage);
    }
    //last page
    if (currPage === numPages && numPages > 1) {
      return this._buttonPrevious(currPage);
    }
    // other page
    if (currPage < numPages) {
      return this._buttonPrevious(currPage) + this._buttonNext(currPage);
    }
    // page 1 and there are no other pages
    return '';
  }

  _buttonPrevious(currPage) {
    return `
            <button data-goto="${
              currPage - 1
            }" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${currPage - 1}</span>
            </button>
    `;
  }

  _buttonNext(currPage) {
    return `
        <button data-goto="${
          currPage + 1
        }" class="btn--inline pagination__btn--next">
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
            </svg>
            <span>Page ${currPage + 1}</span>
        </button>
        `;
  }
}

export default new paginationView();
