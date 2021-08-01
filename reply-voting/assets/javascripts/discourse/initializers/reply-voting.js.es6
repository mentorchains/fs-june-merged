import { withPluginApi } from "discourse/lib/plugin-api";
import { apiInitializer } from "discourse/lib/api";
import { iconNode } from "discourse-common/lib/icon-library";
import { h } from 'virtual-dom';

export default apiInitializer("0.11.1", api => {      
    const { iconNode } = require("discourse-common/lib/icon-library");

    api.decorateWidget('poster-name:after', helper => {
        return helper.h('vote-count', '10 votes');
    });

    api.decorateWidget('post-menu:extra-post-controls', helper => {
      return helper.h('', [
          helper.h('a.icon.vote-button', {
            href:'https://google.com/',
            title: 'Upvote'
          }, iconNode('long-arrow-alt-up')), 
      ]);
    });
  
    api.decorateWidget('post-menu:extra-post-controls', helper => {
    return helper.h('', [
        helper.h('a.icon.vote-button', {
            href:'https://linkedin.com/',
            title: 'Downvote'
        }, iconNode('long-arrow-alt-down')), 
    ]);
    });
    
});