define(["underscore"], function(_) {
  var siteNavigationTemplate = `
    <ul>
      {{#each navItems}}
      <li><a href="/{{ this.path }}">{{ this.label }}</a></li>
      {{/each}}
    </ul>
  `;
  return siteNavigationTemplate;
});

