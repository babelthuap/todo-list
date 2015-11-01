$(document).ready(function(){
  'use strict';

  let inputForm = $('#action');
  inputForm.focus();

  $('#add').click(addItem);
  $('#clear').click(clear);
  $(window).on('keypress', handleKey);

  function addItem() {
    let action = inputForm.val();
    let duedate = $('#duedate').val();
    duedate = (new Date(duedate)).toUTCString().slice(0,-13);
    
    let $item = $('<tr>').addClass('item');
    let $checkbox = $('<input>').attr('type', 'checkbox').click(checkOffItem);
    let $xMark = $('<a>').attr('href', '#').text('X').addClass('delete').click(deleteItem);
    $item.append( $('<td>').text(action) )
         .append( $('<td>').text(duedate) )
         .append( $('<td>').append($checkbox).append($xMark) );

    $('#list').append($item);
    inputForm.val('').focus();
  }

  function deleteItem() {
    $(this).closest('tr').remove();
  }

  function clear() {
    $('#list .item').remove();
    inputForm.focus();
  }

  function checkOffItem() {
    $(this).closest('tr').children().first().toggleClass('done');
  }

  function handleKey(e) {
    if (e.charCode === 13 && inputForm.val() !== '') addItem();
  }
})