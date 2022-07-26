import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      if (btn === document.querySelector('.pagination__btn--middle')) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1 && numPages > 1) {
      return (
        this._generatePageBtnMarkup('middle', curPage, numPages) +
        this._generatePageBtnMarkup('right', curPage)
      );
    }

    // Last page
    if (curPage === numPages && numPages > 1)
      return (
        this._generatePageBtnMarkup('left', curPage) +
        this._generatePageBtnMarkup('middle', curPage, numPages)
      );

    // Other page
    if (curPage < numPages)
      return (
        this._generatePageBtnMarkup('left', curPage) +
        this._generatePageBtnMarkup('middle', curPage, numPages) +
        this._generatePageBtnMarkup('right', curPage)
      );

    // Page 1, and there are NO other pages
    if (numPages === 1)
      return this._generatePageBtnMarkup('middle', curPage, numPages);
  }

  _generatePageBtnMarkup(type, curPage, numPages) {
    return `
    <button data-goto="${
      type === 'right'
        ? curPage + 1
        : type === 'left'
        ? curPage - 1
        : type === 'middle'
        ? curPage
        : ''
    }" class="btn--inline pagination__btn--${
      type === 'right'
        ? 'next'
        : type === 'left'
        ? 'prev'
        : type === 'middle'
        ? 'middle'
        : ''
    }">
    ${
      type == 'left'
        ? `<svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>`
        : ''
    }
    <span>${
      type === 'right'
        ? `Page ${curPage + 1}`
        : type === 'left'
        ? `Page ${curPage - 1}`
        : type === 'middle'
        ? `${curPage} of ${numPages}`
        : ''
    }</span>
      ${
        type == 'right'
          ? `<svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>`
          : ''
      }
    </button>`;
  }
}

export default new PaginationView();
