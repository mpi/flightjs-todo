define(function(require) {
    var Hogan = require('hoganjs');
    var templates = {};
    templates['new-todo-item'] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<li class=\"list-group-item ");if(t.s(t.f("completed",c,p,1),c,p,0,41,50,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("completed");});c.pop();}if(!t.s(t.f("completed",c,p,1),c,p,1,0,0,"")){t.b("pending");};t.b("\">");t.b(t.v(t.f("description",c,p,0)));t.b("</li>");return t.fl(); },partials: {}, subs: {  }});
    return templates;
})