import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("0.11.1", api => {      
    const { iconNode } = require("discourse-common/lib/icon-library");

    api.decorateWidget('poster-name:after', helper => {
        const model = helper.getModel();

        // if this post is not a topic
        if (model && model.get("post_number") !== 1) {
            return helper.h('vote-count', '10 votes');
        }
    });

    api.addPostMenuButton('up-vote', (attrs) => {
        return {
          action: 'upVote',
          icon: 'long-arrow-alt-up',
          className: 'upVote',
          title: 'Upvote',
        };
      });
    
      api.addPostMenuButton('down-vote', (attrs) => {
        return {
          action: 'downVote',
          icon: 'long-arrow-alt-down',
          className: 'downVote',
          title: 'Downvote',
        };
      });

    api.decorateWidget('post-menu:extra-post-controls', helper => {
        const model = helper.getModel();

        // if this post is not a topic
        if (model && model.get("post_number") !== 1) {
            return helper.h('', [
                helper.h('a.icon.vote-button', {
                  href:'/styleguide/',
                  title: 'Upvote'
                }, iconNode('long-arrow-alt-up')), 
            ]);
        }
    });
  
    api.decorateWidget('post-menu:extra-post-controls', helper => {
        const model = helper.getModel();
        
        // if this post is not a topic
        if (model && model.get("post_number") !== 1) {
            return helper.h('', [
                helper.h('a.icon.vote-button', {
                    href:'/admin/',
                    title: 'Downvote'
                }, iconNode('long-arrow-alt-down')), 
            ]);
        }
    });
    
});