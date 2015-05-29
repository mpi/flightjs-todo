define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var TodoListUI = require('component/ui/todo-list');
  var TodoListData = require('component/data/todo-list');

  /**
   * Module exports
   */

  return initialize;

  /**
   * Module function
   */

  function initialize() {
    TodoListData.attachTo(document);
    TodoListUI.attachTo('.js-todo-list');
  }

});
