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
    $('#add').click(addMenuItem);
    $('#order').on('click', '#remove-item', removeMenuItem);
    $('#order').on('change', '.qty', changeText);
    $('#order').on('blur', '.qty', changeText);
    $('#order').on('change', '.dish', changeText);
  }

  function changeText(){
    // $('.dish').children('option:selected').attr('data-cost')
    var totalCost = 0;
    var totalCal = 0;
    ($('.dish').children('option:selected')).map((i,option)=>{
      var itemCal = $(option).attr('data-cal') * 1;
      var itemCost = $(option).attr('data-cost') * 1;
      var qty = $(option).parent().prev().prev().val() *1;
      if(!isNaN(itemCost) && !isNaN(qty) && qty > 0 && !isNaN(itemCal)){
        totalCost += itemCost * qty;
        totalCal += itemCal * qty;
      }
    });

    $('#totals').empty().append(`Total Calories ${totalCal} | Total Cost $${totalCost.toFixed(2)}`);
  }

  function removeMenuItem(event){
    if($('form#order > .menu-item').length > 1){
      $(this).parent().remove();
      changeText();
    }
    event.preventDefault();
  }

  function addMenuItem(event){
    ajax('/orders/addmenu', 'GET', null, html=>{
      $('#order').prepend(html);
    });
    event.preventDefault();
  }

  function getDishes(){
    var menu = $(this).val();
    ajax(`/dishes/${menu}`, 'GET', null, html=>{
      $(this).next().empty().append(html);
      changeText();
    });
  }


})();
