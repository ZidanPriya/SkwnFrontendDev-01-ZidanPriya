$(function () {

  const $lis = $('.category-list li');
  const $imgs = $('.recommendation-images img');

  function update(idx) {
    $lis.removeClass('active')
        .find('.cat-desc').slideUp(150);
    $lis.eq(idx).addClass('active')
        .find('.cat-desc').slideDown(150);

    $imgs.removeClass('expanded collapsed')
         .each((i, el) => {
           $(el)
             .toggleClass('expanded', i === idx)
             .toggleClass('collapsed', i !== idx);
         });
  }

  const initIdx = $lis.filter('.active').data('index') || 0;
  update(initIdx);

  $lis.on('click', function () {
    update($(this).data('index'));
  });

  $imgs.on('click', function () {
    update($(this).index());
  });
});

$(function () {

  const $cards = $('.best-seller-section .product-card');
  const $prevBtn = $('.best-seller-section .nav-btn.prev');
  const $nextBtn = $('.best-seller-section .nav-btn.next');
  let currentIdx = 0;

  function activate(idx) {
    $cards.removeClass('active');
    $cards.eq(idx).addClass('active');
  }

  activate(currentIdx);

  $cards.on('click', function () {
    currentIdx = $(this).index();
    activate(currentIdx);
  });

  $prevBtn.on('click', function () {
    if (currentIdx > 0) {
      currentIdx--;
      activate(currentIdx);
    }
  });

  $nextBtn.on('click', function () {
    if (currentIdx < $cards.length - 1) {
      currentIdx++;
      activate(currentIdx);
    }
  });
});

$(document).ready(function() {
  $.getJSON('data.json', function(products) {
    let html = '';
    products.forEach(function(item) {
      html += `
        <div class="product-card">
          <img src="${item.image}" alt="${item.name}">
          <div class="price-tag">${item.price}</div>
          <div class="product-name">${item.name}</div>
        </div>
      `;
    });
    $('.carousel-track').html(html);
  });
});

$(document).ready(function() {
  $.getJSON('recommendations.json', function(data) {
    let imageHtml = '';
    let listHtml = '';

    data.forEach((item, index) => {
      imageHtml += `<img src="${item.image}" alt="${item.category}" data-index="${index}" ${index === 1 ? 'class="expanded"' : ''}>`;

      listHtml += `
        <li data-index="${index}" ${index === 1 ? 'class="active"' : ''}>
          ${item.category}
          <p class="cat-desc">${item.description}</p>
        </li>
      `;
    });

    $('#recommendation-images').html(imageHtml);
    $('#category-list').html(listHtml);

    function update(idx) {
      const $lis = $('.category-list li');
      const $imgs = $('.recommendation-images img');

      $lis.removeClass('active').find('.cat-desc').slideUp(150);
      $lis.eq(idx).addClass('active').find('.cat-desc').slideDown(150);

      $imgs.removeClass('expanded collapsed').each((i, el) => {
        $(el)
          .toggleClass('expanded', i === idx)
          .toggleClass('collapsed', i !== idx);
      });
    }

    update(1);

    $('.category-list li').on('click', function() {
      update($(this).data('index'));
    });

    $('.recommendation-images img').on('click', function() {
      update($(this).data('index'));
    });
  });
});
