import { h } from "virtual-dom";
import { withPluginApi } from "discourse/lib/plugin-api";

function initPlugin(api) {
  api.reopenWidget("post-stream", {
    buildKey: () => "post-stream",

    defaultState(attrs, state) {
      let defaultState = this._super(attrs, state);
      defaultState["showComments"] = [];
      return defaultState;
    },

    showComments(answerId) {
      let showComments = this.state.showComments;
      if (showComments.indexOf(answerId) === -1) {
        showComments.push(answerId);
        this.state.showComments = showComments;
        this.appEvents.trigger("post-stream:refresh", { force: true });
      }
    },

    html(attrs, state) {
        let posts = attrs.post || [];
        let postsArray = posts.toArray();
    }
  });
}

export default {
  name: "reply-voting",
  initialize(container) {
    const siteSettings = container.lookup("site-settings:main");

    if (!siteSettings.reply_voting_enabled) return;

    withPluginApi("0.8.12", initPlugin);
  }
};
