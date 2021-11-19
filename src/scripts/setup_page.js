define(["jquery", "handlebars", "backbone", "templates/page-container", "templates/site-navigation"],
  function($, Handlebars, Backbone, pageContainerTemplate, SiteNavigationTemplate) {
    const PageContainerView = Backbone.View.extend({
      template: Handlebars.compile(pageContainerTemplate),
      initialize: function () {
        this.render();
      },
      render: function() {
        this.$el.prepend(this.template());
      }
    });
    const navItems = [
      { label: "Home", path: "" },
    ];
    const NavigationModel = Backbone.Model.extend({
      defaults: { navItems },
    });
    const NavigationView = Backbone.View.extend({
      template: Handlebars.compile(SiteNavigationTemplate),
      initialize: function() {
        this.render();
      },
      render: function() {
        this.$el.html(this.template(this.model.attributes));
      },
    });
    return function setupPage() {
      return new Promise((resolve, _reject) => {
        $(document).ready(function() {
          const navigationModel = new NavigationModel();
          const pageContainerView = new PageContainerView({ el: $("body") });
          const navigationView = new NavigationView({ el: $(".content-panel-header-navigation"), model: navigationModel });

          resolve({ pageContainerView, navigationView });
        });
      });
    }
  });
