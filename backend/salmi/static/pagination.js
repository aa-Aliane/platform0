var table = document.querySelector('table');
var rows = table.rows;
var totalPages = Math.ceil(rows.length / 20);
var currentPage = 1;

function showPage(pageNumber) {
  currentPage = pageNumber;
  for (var i = 1; i <= totalPages; i++) {
    var page = document.querySelector('.page-' + i);
    if (i === pageNumber) {
      page.style.display = 'table-row-group';
    } else {
      page.style.display = 'none';
    }
  }
}

function showPrevPage() {
  if (currentPage > 1) {
    showPage(currentPage - 1);
  }
}

function showNextPage() {
  if (currentPage < totalPages) {
    showPage(currentPage + 1);
  }
}

showPage(currentPage);