import DiscourseRoute from 'discourse/routes/discourse';

/**
 * Route for the path `/reply_voting` as defined in `../reply-voting-route-map.js.es6`.
 */
 export default DiscourseRoute.extend({
    renderTemplate() {
      // Renders the template `../templates/replyvoting.hbs`
      this.render('replyvoting');
    }
  });