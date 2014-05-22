function ajax(url, verb) {
  'use strict';
  var data = arguments[2] !== (void 0) ? arguments[2] : {};
  var success = arguments[3] !== (void 0) ? arguments[3] : (function(r) {
    return console.log(r);
  });
  var dataType = arguments[4] !== (void 0) ? arguments[4] : 'html';
  $.ajax({
    url: url,
    type: verb,
    dataType: dataType,
    data: data,
    success: success
  });
}
(function() {
  'use strict';
  $(document).ready(init);
  function init() {
    $('#order').on('change', '.menu', getDishes);
    $('#add').click(addMenuItem);
    $('#order').on('click', '#remove-item', removeMenuItem);
    $('#order').on('change', '.qty', changeText);
    $('#order').on('blur', '.qty', changeText);
    $('#order').on('change', '.dish', changeText);
  }
  function changeText() {
    var totalCost = 0;
    var totalCal = 0;
    ($('.dish').children('option:selected')).map((function(i, option) {
      var itemCal = $(option).attr('data-cal') * 1;
      var itemCost = $(option).attr('data-cost') * 1;
      var qty = $(option).parent().prev().prev().val() * 1;
      if (!isNaN(itemCost) && !isNaN(qty) && qty > 0 && !isNaN(itemCal)) {
        totalCost += itemCost * qty;
        totalCal += itemCal * qty;
      }
    }));
    $('#totals').empty().append(("Total Calories " + totalCal + " | Total Cost $" + totalCost.toFixed(2)));
  }
  function removeMenuItem(event) {
    if ($('form#order > .menu-item').length > 1) {
      $(this).parent().remove();
      changeText();
    }
    event.preventDefault();
  }
  function addMenuItem(event) {
    ajax('/orders/addmenu', 'GET', null, (function(html) {
      $('#order').prepend(html);
    }));
    event.preventDefault();
  }
  function getDishes() {
    var $__0 = this;
    var menu = $(this).val();
    ajax(("/dishes/" + menu), 'GET', null, (function(html) {
      $($__0).next().empty().append(html);
      changeText();
    }));
  }
})();

//# sourceMappingURL=orders.map
