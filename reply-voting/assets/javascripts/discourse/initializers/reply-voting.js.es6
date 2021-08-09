import { withPluginApi } from "discourse/lib/plugin-api";
import { apiInitializer } from "discourse/lib/api";
import { h } from 'virtual-dom';
import { ajax } from "discourse/lib/ajax";

const voteCountMap = new Map();
var temp = 0;
var curWidgetCount = 0;
let isUpvote = true;
let isUpvoteLoaded = false;

function upVote(post,user){
  const record = {
    vote_id: Date.now(),
    reply_id: post.id,
    user_id: user.id,
    upvote: true
  }
  
  ajax("/votes/update",{type:"PUT",data:record})
  .then(() => {
    console.log("---Success upvote---");
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
    console.log("---Success downvote---");
    getCount(post.id);
  }).catch(console.error);
}

function getCount(reply_id){
  // var totalCount = 0;

  // ajax("/votes/count",{type:"GET",data:{id:reply_id}})
  // .then(result => {
  //   totalCount = parseInt(result.count);
  //   voteCountMap.set(reply_id, totalCount);
  //   console.log("totalCount " + totalCount);
  // }).catch(console.error);

  // *****JQUERY with then()*****
  // return new Promise((resolve, reject) =>  {
   $.ajax({
      url: '/votes/count',
      async : false,
      data: {id: reply_id},
      success: function(data) {
     //   resolve(data.count) // Resolve promise and go to then()
        console.log("data", data.count)
        temp = data.count
        voteCountMap.set(reply_id, data.count);
      },
      error: function(err) {
   //     reject(err) // Reject the promise and go to catch()
        console.log(err)
      }
    });
}

function hasUpvote(reply_id, user_id){
  if(!isUpvoteLoaded){
    $.ajax({
      url: '/votes/checkuserupvote',
      async : false,
      data: {reply_id: reply_id, user_id: user_id},
      success: function(data) {
        console.log("data", data);
        isUpvoteLoaded = true;
        isUpvote = data.isUpvote;
      },
      error: function(err) {
        console.log(err)
      }
    });
  }
  return isUpvote;
}

export default apiInitializer("0.11.1", api => {      

    // api.decorateWidget('post-menu:extra-post-controls', helper => {
    //   const model = helper.getModel();
    //   var count = "";
    //   if(voteCountMap.get(model.get("id")) == null){
    //       count = "0";
    //   }
    //   else if (voteCountMap.get(model.get("id")) > 0){
    //     count = "+" + voteCountMap.get(model.get("id")).toString();
    //   }
    //   else{
    //     count = voteCountMap.get(model.get("id")).toString();
    //   }

    //   // if this post is not a topic
    //   if (model && model.get("post_number") !== 1) {
    //     console.log("REPLY_ID model: " + model.get("id"));
    //     return helper.h('vote-count', count);
    //   }
    // });

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

    api.attachWidgetAction("post", "upVote", function () {
        const post = this.model;
        const user = api.getCurrentUser();
  
        if(!hasUpvote(post.get("id"), user.id)){
          var childNum = post.get('post_number')-2;
          const upvote = document.querySelectorAll(".d-icon-arrow-up")[childNum]; 
          const downvote = document.querySelectorAll(".d-icon-arrow-down")[childNum];
          upvote.classList.toggle("voted");
          downvote.classList.remove("voted");        
  
          upVote(post,user);
        //  this.scheduleRerender();
    
          if(voteCountMap.get(post.get("id")) == 0) {
            curWidgetCount = parseInt(voteCountMap.get(post.get("id"))) + 1;
            voteCountMap.set(post.get("id"), curWidgetCount);
          }
          else if(voteCountMap.get(post.get("id")) < 0) {
            curWidgetCount = parseInt(voteCountMap.get(post.get("id"))) + 2;
            voteCountMap.set(post.get("id"), curWidgetCount);
          }
          else {
            curWidgetCount = parseInt(voteCountMap.get(post.get("id"))) - 1;
            voteCountMap.set(post.get("id"), curWidgetCount);
          }

          isUpvote = !isUpvote;
        }
    });

    api.attachWidgetAction("post", "downVote", function () {
      const post = this.model;
      const user = api.getCurrentUser();

      if(hasUpvote(post.get("id"), user.id)){
        var childNum = post.get('post_number')-2;
        const upvote = document.querySelectorAll(".d-icon-arrow-up")[childNum]; 
        const downvote = document.querySelectorAll(".d-icon-arrow-down")[childNum]; 
        downvote.classList.toggle("voted");
        upvote.classList.remove("voted");

        downVote(post,user);
      //  this.scheduleRerender();

        if(voteCountMap.get(post.get("id")) == 0) {
          curWidgetCount = parseInt(voteCountMap.get(post.get("id"))) - 1;
          voteCountMap.set(post.get("id"), curWidgetCount);
        }
        else if(voteCountMap.get(post.get("id")) > 0) {
          curWidgetCount = parseInt(voteCountMap.get(post.get("id"))) - 2;
          voteCountMap.set(post.get("id"), curWidgetCount);
        }
        else {
          curWidgetCount = parseInt(voteCountMap.get(post.get("id"))) + 1;
          voteCountMap.set(post.get("id"), curWidgetCount);
        }

        isUpvote = !isUpvote;
      }
    }); 

    api.decorateWidget('post-menu:extra-post-controls', helper => {
      const model = helper.getModel();
      const post_id = model.get("id");

      if(voteCountMap.get(post_id) == null){
        voteCountMap.set(post_id, 0);
      }

      // if this post is not a topic
      if (model && model.get("post_number") !== 1) {
        console.log("REPLY_ID model: " + post_id);
        console.log("temp()= " + temp);
        console.log("curWidgetCount= " + voteCountMap.get(post_id));
        return helper.h('vote-count', voteCountMap.get(post_id).toString());
      }
    });

});