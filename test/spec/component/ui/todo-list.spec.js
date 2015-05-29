'use strict';

describeComponent('component/ui/todo-list', function () {

  var trigger, $node;
  var thr = function(msg){
    throw new Error(msg);
  };
  var events = {};
  var event = function(id) { return events[id] || thr('spy for event ' + id + ' has not been registered'); };

  // Initialize the component and attach it to the DOM
  beforeEach(function () {
    this.setupComponent(
        '<div class="js-todo-list">'
        + '<ul>'
          + '<input type="text"/>'
          + '<a class="js-add-todo-item">Add</a>'
        + '</ul>' 
      + '</div>');

    events['ui-new-todo-item'] = spyOnEvent(document, 'ui-new-todo-item');
    trigger = this.component.trigger.bind(this.component);
    $node = this.component.$node;
  });

  it('should be defined', function () {
    expect(this.component).toBeDefined();
  });

  it('should list todo items', function(){
    
    // when:
    trigger('data-todo-items', { items: [
      {description: 'Buy some milk', completed: false},
      {description: 'Walk the dog', completed: true}
    ]});
    
    // then:
    var items = $node.find('li');
    expect(items[0]).toHaveText('Buy some milk');
    expect(items[0]).not.toHaveClass('completed');
    expect(items[1]).toHaveText('Walk the dog');
    expect(items[1]).toHaveClass('completed');
  });

  it('should update todo items after add', function(){
    
    // when:
    trigger('data-todo-item-added',
      {description: 'Buy some milk', completed: false}
    );
    
    // then:
    var items = $node.find('li');
    expect(items[0]).toHaveText('Buy some milk');
    expect(items[0]).not.toHaveClass('completed');
  });

  it('should emit add todo item event', function(){
    
    // when:
    $node.find('input').val('Buy some milk');
    $node.find('a.js-add-todo-item').click();
    
    // then:
    expect(event('ui-new-todo-item'))
      .toHaveBeenTriggeredOnAndWith(document, {description: 'Buy some milk'});
  });
  
});
