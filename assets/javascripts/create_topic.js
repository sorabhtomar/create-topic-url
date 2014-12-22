(function () {
  Discourse.Route.buildRoutes(function() {
    this.route('createTopic', {path: 'c/:parentSlug/:slug/create'});
    this.route('createTopTopic', {path: 'c/:slug/create'});
  });

  Discourse.CreateTopicRoute = Discourse.Route.extend({
    model: function(modelParams) {
      return Discourse.Category.findBySlug(modelParams.slug, modelParams.parentSlug);
    },

    afterModel: function(model, transition) {
      model.parentSlug = model.parentCategory.slug; // hacky -- need to fix this (why doesn't it work?)
      this.transitionTo('discovery.category', model).then(function(e) {
        Ember.run.next(function() {
          e.send('createTopic');
        });
      });
    }
  })

  Discourse.CreateTopTopicRoute = Discourse.Route.extend({
    model: function(modelParams) {
      return Discourse.Category.findBySlug(modelParams.slug);
    },

    afterModel: function(model, transition) {
      this.transitionTo('discovery.parentCategory', model).then(function(e) {
        Ember.run.next(function() {
          e.send('createTopic');
        });
      });
    }
  })
})();


