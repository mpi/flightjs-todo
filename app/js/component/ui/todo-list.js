define(function (require) {

  'use strict';
  
  /**
   * Module dependencies
   */

  var defineComponent = require('flight/lib/component');
  var templates = require('templates');
  /**
   * Module exports
   */

  return defineComponent(todoList);

  /**
   * Module function
   */

  function todoList() {

     this.defaultAttrs({
       'listContainer': 'ul',
       'todoInput': 'input'
     });
    
    var newItem = function(item){
      return templates['new-todo-item'].render(item);
    };
    
    this.onTodoItems = function(e, data){
      
      var ul = this.select('listContainer');
      $.each(data.items, function(i, item){
        ul.append(newItem(item));
      });
    };

    this.onTodoItemAdded = function(e, data){
      console.log('adding todo item', data);
      var ul = this.select('listContainer');
      ul.prepend(newItem(data));
    };

    this.onAddTodoItem = function(){      
      var description = this.select('todoInput').val();
      console.log('add-todo-item', description);
      this.trigger('ui-new-todo-item', {description: description});
    };
    
    this.after('initialize', function () {
      
      this.on(document, 'data-todo-items', this.onTodoItems);      
      this.on(document, 'data-todo-item-added', this.onTodoItemAdded);      
      this.on('.js-add-todo-item', 'click', this.onAddTodoItem);
      
      this.trigger('ui-needs-todo-items');
    });
  }

});
