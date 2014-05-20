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
    $('#add').click(addMenu);
  }
  function addMenu() {
    ajax('/orders/addmenu', 'GET', null, (function(html) {
      $('#order').append(html);
    }));
  }
  function getDishes() {
    var $__0 = this;
    var menu = $(this).val();
    ajax(("/dishes/" + menu), 'GET', null, (function(html) {
      $($__0).next().empty().append(html);
    }));
  }
})();

//# sourceMappingURL=orders.map
