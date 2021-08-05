import { withPluginApi } from "discourse/lib/plugin-api";
import { apiInitializer } from "discourse/lib/api";
import { h } from 'virtual-dom';
import { ajax } from "discourse/lib/ajax";

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
  ajax("/votes/count",{type:"GET",data:{id:reply_id}})
  .then(result => {
    console.log("upcount " + result.upcount);
    console.log("downcount " + result.downcount);
  }).catch(console.error);
}

export default apiInitializer("0.11.1", api => {      

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
        alert("upvote is clicked");
        const post = this.model;
        const user = api.getCurrentUser();
        upVote(post,user);
    });
    
    api.attachWidgetAction("post", "downVote", function () {
      alert("downvote is clicked");
      const post = this.model;
      const user = api.getCurrentUser();
      downVote(post,user);
    });
});