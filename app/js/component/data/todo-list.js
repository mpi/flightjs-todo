define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var defineComponent = require('flight/lib/component');

  /**
   * Module exports
   */

  return defineComponent(todoList);

  /**
   * Module function
   */

  function todoList() {

    var storage = { items: [] };
    
    var onNeedsTodoItems = function(){
      this.trigger('data-todo-items', storage);
    };

    var onNewTodoItem = function(event, data){
      var newItem = {description: data.description, completed: false};
      storage.items.push(newItem);
      this.trigger('data-todo-item-added', newItem);
    };
    

    this.after('initialize', function () {
      this.on('ui-needs-todo-items', onNeedsTodoItems);
      this.on('ui-new-todo-item', onNewTodoItem);
    });
  }

});
