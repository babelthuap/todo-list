$(document).ready(function(){
  'use strict';

  let inputForm = $('#action');
  inputForm.focus();
  $('#add').click(addItem);

  function addItem() {
    let action = inputForm.val();
    let duedate = $('#duedate').val();
    duedate = (new Date(duedate)).toUTCString().slice(0,-13);
    
    let $item = $('<tr>');
    let $checkbox = $('<input>').attr('type', 'checkbox');
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
})