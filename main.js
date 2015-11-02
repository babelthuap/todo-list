$(document).ready(() => {
  'use strict';

  let inputForm = $('#action');
  inputForm.focus();

  // each item is of the form [action, duedate, isChecked (boolean), ID]
  let items = localStorage.items ? JSON.parse(localStorage.items) : [];

  let init = true;
  items.forEach((item) => {
    let $item = createItem(item[0], item[1], item[2], item[3]);
    $('#list').append($item);
  })
  init = false;

  let itemNum = items.length > 0 ? +items[items.length - 1][3] + 1 : 0;

  $('#add').click(addItem);
  $('#clear').click(clear);
  $(window).on('keypress', handleKey);

  function addItem() {
    let action = inputForm.val();

    if (action) {
      let duedate = $('#duedate').val();
      duedate = (new Date(duedate)).toUTCString().slice(0,-13);
      
      let $item = createItem(action, duedate, false, itemNum);
      $('#list').append($item);
      items.push([action, duedate, false, itemNum]);
      itemNum += 1;
      localStorage.items = JSON.stringify(items);
      inputForm.val('').focus();
    }
  }

  function createItem(action, duedate, checked, id) {
    let $item = $('<tr>').addClass('item').attr('id', id);
    let $checkbox = $('<input>').attr('type', 'checkbox').attr('checked', checked).click(checkOffItem);
    let $xMark = $('<a>').attr('href', '#').text('X').addClass('delete').click(deleteItem);
    $item.append( $('<td>').text(action) )
         .append( $('<td>').text(duedate) )
         .append( $('<td>').append($checkbox).append($xMark) );
    if (checked) {
      checkOffItem.call($item);
    }
    return $item;
  }

  function deleteItem() {
    let $item = $(this).closest('tr');
    let id = $item.attr('id');

    items.splice(findInItemsByID(id), 1);
    localStorage.items = JSON.stringify(items);
    $item.remove();
  }

  function clear() {
    $('#list .item').remove();
    items = [];
    localStorage.removeItem('items');
    inputForm.focus();
  }

  function checkOffItem() {
    let id = $(this).closest('tr').attr('id');
    let indexInItems = findInItemsByID(id);

    if (!init) {
      items[indexInItems][2] = !items[indexInItems][2];
      localStorage.items = JSON.stringify(items);
    }

    $(this).closest('tr').children().not(':last').toggleClass('done');
  }

  // returns the index of the item with the specified ID, or -1 if not found
  function findInItemsByID(id) {
    for (let i = 0; i < items.length; i++) {
      if (items[i][3] == id) return i;
    }
    return -1;
  }

  function handleKey(e) {
    if (e.charCode === 13) addItem();
  }
})