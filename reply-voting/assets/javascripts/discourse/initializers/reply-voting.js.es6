import { withPluginApi } from "discourse/lib/plugin-api";
import { apiInitializer } from "discourse/lib/api";
import { iconNode } from "discourse-common/lib/icon-library";
import { h } from 'virtual-dom';
import { ajax } from "discourse/lib/ajax";

async function upVote(post,user,api){
  const record = {
    vote_id: Date.now(),
    reply_id: post.id,
    user_id: user.id,
    upvote: true
  }

  var upCount = 0;
  
  await ajax("/votes/update",{type:"PUT",data:record})
  .then(() => {
    console.log("Success");
    upCount = getCount(post.id,api);
  }).catch(console.error);

  return upCount;
}

async function downVote(post,user,api){
  const record = {
    vote_id: Date.now(),
    reply_id: post.id,
    user_id: user.id,
    upvote: false
  }
  
  var downCount = 0;

  await ajax("/votes/update",{type:"PUT",data:record})
  .then(() => {
    console.log("Success");
    downCount = getCount(post.id,api);
  }).catch(console.error);

  return downCount;
}

async function getCount(reply_id, api){
  var upCount = 0;

  console.log("reply_id: " + reply_id);

  await ajax("/votes/count",{type:"GET",data:{id:reply_id}})
  .then(result => {
    console.log("upcount " + result.upcount);
    console.log("downcount " + result.downcount);
    
    upCount = parseInt(result.upcount);
    setTimeout(api.decorateWidget('poster-name:after', helper => {
      const model = helper.getModel();
  
      // if this post is not a topic
      if (model && model.get("post_number") !== 1) {
          // console.log("upCounts: " + upCounts);
        console.log("upCounts: " + upCount);
        const voteReport = upCount +' votes';
        console.log("voteReport: " + voteReport);
        return helper.h('vote-count', voteReport);
      }
    }), 5000);
  }).catch(console.error);

  return upCount;
}

export default apiInitializer("0.11.1", api => {      
    const { iconNode } = require("discourse-common/lib/icon-library");

    // api.decorateWidget('post:after', helper => {
    //   const post = this.model;
    //   var upCounts = getCount(post.id);
    //   return helper.h('p', 'upCounts: ' + upCounts);
    // });

    // api.decorateWidget('poster-name:after', helper => {
    //   const model = helper.getModel();

    //   // if this post is not a topic
    //   if (model && model.get("post_number") !== 1) {
    //       // console.log("upCounts: " + upCounts);
    //       getCount(model.get("id")).then(upCounts => {
    //         console.log("upCounts: " + upCounts);
    //         const voteReport = new String("upVotes: " + upCounts);
    //         console.log("voteReport: " + voteReport);
    //         api.decorateWidget('poster-name:after', helper => {
    //           const model = helper.getModel();
        
    //           // if this post is not a topic
    //           if (model && model.get("post_number") !== 1) {
    //             return helper.h('vote-count', voteReport)
    //           }
    //         })            
    //       }).catch(console.error);
    //   }
    // });

    setTimeout(api.decorateWidget('poster-name:after', helper => {
      const model = helper.getModel();
  
      // if this post is not a topic
      if (model && model.get("post_number") !== 1) {
        // console.log("upCounts: " + upCount);
        const upCount = 10;
        const voteReport = upCount +' votes';
        console.log("voteReport: " + voteReport);
        return helper.h('vote-count', voteReport);
      }
    }), 5000);


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
        const post = this.model;
        const user = api.getCurrentUser();
        let upCount = upVote(post,user,api) ;

        // api.addPostMenuButton('vote-count', (attrs) => {
        //   if(!attrs.firstPost){
        //     console.log("upCount: " + parseInt(upCount));
        //     return {
        //       label: "" + upCount + " votes", // dummy for test only
        //       className: 'voteCount',
        //       title: 'VoteCount',
        //       position: 'first'
        //     };
        //   }  
        // });
    });
    
    api.attachWidgetAction("post", "downVote", function () {
      alert("downvote is clicked");
      const post = this.model;
      const user = api.getCurrentUser();
      downVote(post,user,api);
    });
});