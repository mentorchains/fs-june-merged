import { withPluginApi } from "discourse/lib/plugin-api";
import { apiInitializer } from "discourse/lib/api";
import { iconNode } from "discourse-common/lib/icon-library";
import { h } from 'virtual-dom';

export default apiInitializer("0.11.1", api => {      
    const { iconNode } = require("discourse-common/lib/icon-library");

    api.decorateWidget('post-menu:extra-post-controls', helper => {
        return helper.h('vote-count', '10');
    });

    api.decorateWidget('post-menu:extra-post-controls', helper => {
      return helper.h('', [
          helper.h('vote-button', {
              title: 'Upvote'
          }, iconNode('long-arrow-alt-up')), 
      ]);
    });
  
    api.decorateWidget('post-menu:extra-post-controls', helper => {
    return helper.h('', [
        helper.h('vote-button', {
            title: 'Downvote'
        }, iconNode('long-arrow-alt-down')), 
    ]);
    });
    
});