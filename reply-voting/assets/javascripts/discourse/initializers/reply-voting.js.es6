import { withPluginApi } from "discourse/lib/plugin-api";
import { apiInitializer } from "discourse/lib/api";
import { h } from 'virtual-dom';
import { ajax } from "discourse/lib/ajax";

const voteCountMap = new Map();

function upVote(post,user){
  const record = {
    vote_id: Date.now(),
    reply_id: post.id,
    user_id: user.id,
    upvote: true
  }
  
  ajax("/votes/update",{type:"PUT",data:record})
  .then(() => {
    console.log("Success");
    getCount(post.id);
  }).catch(console.error);
}

function downVote(post,user){
  const record = {
    vote_id: Date.now(),
    reply_id: post.id,
    user_id: user.id,
    upvote: false
  }
  
  ajax("/votes/update",{type:"PUT",data:record})
  .then(() => {
    console.log("Success");
    getCount(post.id);
  }).catch(console.error);
}

function getCount(reply_id){
  var totalCount = 0;

  ajax("/votes/count",{type:"GET",data:{id:reply_id}})
  .then(result => {
    totalCount = parseInt(result.count);
    voteCountMap.set(reply_id, totalCount);
    console.log("totalCount " + totalCount);
  }).catch(console.error);

}

export default apiInitializer("0.11.1", api => {      

    api.decorateWidget('post-menu:extra-post-controls', helper => {
      const model = helper.getModel();
      var count = "";
      if(voteCountMap.get(model.get("id")) == null){
          count = "0";
      }
      else if (voteCountMap.get(model.get("id")) > 0){
        count = "+" + voteCountMap.get(model.get("id")).toString();
      }
      else{
        count = voteCountMap.get(model.get("id")).toString();
      }

      // if this post is not a topic
      if (model && model.get("post_number") !== 1) {
        console.log("REPLY_ID model: " + model.get("id"));
        return helper.h('vote-count', count);
      }
    });

    api.addPostMenuButton('up-vote', (attrs) => {
      if(!attrs.firstPost){
        return {
          action: 'upVote',
          icon: 'long-arrow-alt-up',
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
          icon: 'long-arrow-alt-down',
          className: 'downVote',
          title: 'Downvote',
          position: 'second'
        };
      }
    });

    api.attachWidgetAction("post", "upVote", function () {
        alert("upvote is clicked");
        const post = this.model;
        const user = api.getCurrentUser();
        upVote(post,user);
       this.scheduleRerender();
    });
    
    api.attachWidgetAction("post", "downVote", function () {
      alert("downvote is clicked");
      const post = this.model;
      const user = api.getCurrentUser();
      downVote(post,user);
     this.scheduleRerender();

    });
});