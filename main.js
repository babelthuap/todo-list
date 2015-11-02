$(document).ready(function(){
  'use strict';

  let inputForm = $('#action');
  inputForm.focus();

  var items = localStorage.items ? JSON.parse(localStorage.items) : [];
  items.forEach(function(item) {
    var $item = createItem(item[0], item[1]);
    $('#list').append($item);
  })

  var itemNum = items.length;

  $('#add').click(addItem);
  $('#clear').click(clear);
  $(window).on('keypress', handleKey);

  function addItem() {
    let action = inputForm.val();

    if (action) {
      let duedate = $('#duedate').val();
      duedate = (new Date(duedate)).toUTCString().slice(0,-13);
      
      let $item = createItem(action, duedate);
      items.push([action, duedate, false, itemNum]);
      localStorage.items = JSON.stringify(items);

      $('#list').append($item);
      inputForm.val('').focus();
    }
  }

  function createItem(action, duedate, checked) {
    let $item = $('<tr>').addClass('item').attr('id', itemNum++);
    let $checkbox = $('<input>').attr('type', 'checkbox').click(checkOffItem);
    let $xMark = $('<a>').attr('href', '#').text('X').addClass('delete').click(deleteItem);
    $item.append( $('<td>').text(action) )
         .append( $('<td>').text(duedate) )
         .append( $('<td>').append($checkbox).append($xMark) );
    return $item;
  }

  function deleteItem() {
    $(this).closest('tr').remove();
  }

  function clear() {
    $('#list .item').remove();
    items = [];
    localStorage.removeItem('items');
    inputForm.focus();
  }

  function checkOffItem() {
    $(this).closest('tr').children().not(':last').toggleClass('done');
  }

  function handleKey(e) {
    if (e.charCode === 13) addItem();
  }
})