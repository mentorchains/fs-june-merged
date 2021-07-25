/**
 * Route for the path `/reply_voting` as defined in `../reply-voting-route-map.js.es6`.
 */
 export default Discourse.Route.extend({
    renderTemplate() {
      // Renders the template `../templates/reply_voting.hbs`
      this.render('reply_voting');
    }
  });