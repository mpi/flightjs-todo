'use strict';

describeComponent('component/data/todo-list', function () {

  var thr = function(msg){
    throw 'spy for event ' + id + 'has not been registered';
  };
  var events = {};
  var event = function(id) { return events[id] || thr('spy for event ' + id + 'has not been registered'); };
  var trigger;
  
  // Initialize the component and attach it to the DOM
  beforeEach(function () {
    this.setupComponent();
    
    events['data-todo-items'] = spyOnEvent(document, 'data-todo-items');
    events['data-todo-item-added'] = spyOnEvent(document, 'data-todo-item-added');
    trigger = function(event, data){
      this.component.$node.trigger(event, data);
    }.bind(this);
    
  });

  it('should be defined', function () {
    expect(this.component).toBeDefined();
  });

  it('should be empty', function(){
      
      // when:
      trigger('ui-needs-todo-items');
      
      // then:
      expect(event('data-todo-items'))
        .toHaveBeenTriggeredOnAndWith(document, { items: [] });
  });
  
  it('should add todo item', function(){
      
      // when:
      trigger('ui-new-todo-item', { description: 'Buy some milk'});
      trigger('ui-needs-todo-items');
      
      // then:
      expect(event('data-todo-items'))
        .toHaveBeenTriggeredOnAndWith(document, { items: [{description: 'Buy some milk', completed: false}] });
  });

  it('should emit todo item added event', function(){
      
      // when:
      trigger('ui-new-todo-item', { description: 'Buy some milk'});      
      
      // then:
      expect(event('data-todo-item-added'))
        .toHaveBeenTriggeredOnAndWith(document, {description: 'Buy some milk', completed: false});
  });

  
});
