import { withPluginApi } from "discourse/lib/plugin-api";
import { apiInitializer } from "discourse/lib/api";
import { iconNode } from "discourse-common/lib/icon-library";
import { h } from 'virtual-dom';

export default apiInitializer("0.11.1", api => {      
    const { iconNode } = require("discourse-common/lib/icon-library");
    
    api.addPostMenuButton('up-vote', (attrs) => {
      if(!attrs.firstPost){
        return {
          action: 'upVote',
          icon: 'long-arrow-alt-up',
          className: 'upVote',
          title: 'Upvote',
        };
      }  
    });

    api.addPostMenuButton('down-vote', (attrs) => {
      if(!attrs.firstPost){
        return {
          action: 'downVote',
          icon: 'long-arrow-alt-down',
          className: 'downVote',
          title: 'Downvote',
        };
      }
    });
    
    api.attachWidgetAction("post", "upVote", function () {
        alert("upvote is clicked");
    });
    
    api.attachWidgetAction("post", "downVote", function () {
      alert("downvote is clicked");
    });
});