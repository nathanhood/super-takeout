/* jshint unused:false */

function ajax(url, verb, data={}, success=r=>console.log(r), dataType='html'){//defaulting to html
    'use strict';
  $.ajax({url:url, type:verb, dataType:dataType, data:data, success:success});
}

(function(){
  'use strict';

  $(document).ready(init);

  function init(){
    $('#order').on('change', '.menu', getDishes);
    $('#add').click(addMenu);
  }

  function addMenu(){
    ajax('/orders/addmenu', 'GET', null, html=>{
      $('#order').append(html);
    });
  }

  function getDishes(){
    var menu = $(this).val();
    ajax(`/dishes/${menu}`, 'GET', null, html=>{
      $(this).next().empty().append(html);
    });
  }


})();
