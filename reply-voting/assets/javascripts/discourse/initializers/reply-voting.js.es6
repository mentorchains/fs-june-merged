import { withPluginApi } from "discourse/lib/plugin-api";
import { apiInitializer } from "discourse/lib/api";
import { h } from 'virtual-dom';

export default apiInitializer("0.11.1", api => {      

    api.addPostMenuButton('up-vote', (attrs) => {
      if(!attrs.firstPost){
        return {
          action: 'upVote',
          //icon: 'long-arrow-alt-up',
          icon: 'arrow-up',
          className: 'upVote',
          title: 'Upvote',
          position: 'first'
        };
      }  
    });

    api.addPostMenuButton('down-vote', (attrs) => {
      if(!attrs.firstPost){
        return {
          action: 'downVote',
          //icon: 'long-arrow-alt-down',
          icon: 'arrow-down',
          className: 'downVote',
          title: 'Downvote',
          position: 'second'
        };
      }
    });

    api.addPostMenuButton('vote-count', (attrs) => {
      if(!attrs.firstPost){
        return {
          label: "5", // dummy for test only
          className: 'voteCount',
          title: 'VoteCount',
          position: 'first'
        };
      }  
    });

    api.attachWidgetAction("post", "upVote", function () {
      //const upvote = document.querySelector(".widget-button.btn-flat.upVote.no-text.btn-icon"); 
      const upvote = document.querySelector(".d-icon-arrow-up"); 
      upvote.classList.toggle("voted");

      /*let div = document.querySelector("up-vote");
      div.classList.toggle("voted");

      alert("upvote is clicked");*/
    });
    
    api.attachWidgetAction("post", "downVote", function () {
      const downvote = document.querySelector(".d-icon-arrow-down"); 
      downvote.classList.toggle("voted");
    });
});