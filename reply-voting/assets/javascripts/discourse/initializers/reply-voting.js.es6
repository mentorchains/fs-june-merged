import { withPluginApi } from "discourse/lib/plugin-api";
import { apiInitializer } from "discourse/lib/api";
import { h } from 'virtual-dom';
import { ajax } from "discourse/lib/ajax";

const voteCountMap = new Map();
var temp = 0;
var curWidgetCount = 0;

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
 //  })
  
}
 
 // *****JQUERY using done() *****
//  return $.get('/votes/count');

 /* ***FETCH API***
    fetch('/votes/count', {
      method: 'POST', 
      body:  JSON.stringify({
        id: reply_id
      }),
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json()
      }
    })
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error))*/

 // return new Promise((resolve, reject) =>  {
    // fetch('/votes/count', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //       id: reply_id
    //     }),
    // })
    // .then(response => response.json())
    // .then(jsonData => {
    //   temp = jsonData
    //   console.log(jsonData)
    // })
    // .catch(err => console.log('ERROR'))

  //   ajax("/votes/count",{type:"GET",data:{id:reply_id}})
  //   .then(result => {
  //     console.log("totalCount " + result.count);
  //     resolve(result.count)
  //   }).catch(reject(console.error));

    
    //***** Ryan's
  // var totalCount = 0;
  // ajax("/votes/count",{type:"GET",data:{id:reply_id}})
  // .then(result => {
  //   totalCount = parseInt(result.count);
  //   voteCountMap.set(reply_id, totalCount);
  //   console.log("totalCount " + totalCount);
  // }).catch(console.error);

  // console.log("totalCount after" + totalCount);
  // return totalCount;

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

    api.attachWidgetAction("post", "upVote", function () {
        const post = this.model;
        const user = api.getCurrentUser();
        upVote(post,user);

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
    });
    
    api.attachWidgetAction("post", "downVote", function () {
      const post = this.model;
      const user = api.getCurrentUser();
      downVote(post,user);
      // this.scheduleRerender();
      // if(curWidgetCount == 0) {
      //   curWidgetCount -= 1;
      // }
      // else if(curWidgetCount > 0) {
      //   curWidgetCount -= 2;
      // }
      // else {
      //   curWidgetCount += 1;
      // }

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
    });

    api.decorateWidget('post-menu:extra-post-controls', helper => {
      const model = helper.getModel();
      if(voteCountMap.get(model.get("id")) == null){
        voteCountMap.set(model.get("id"), 0);
      }
      // getCount().done(function(data) {
      //   console.log('done result',data);
      // });

      // ****JQUERY with then()
      // getCount().then((data) => {
      //   console.log("then()= " + data);
      //   temp = data;
      //   // console.log("temp= " + temp);
      // }).catch((err) => {
      //   console.log("failed in then(): " + err)
      // });

      // if this post is not a topic
      if (model && model.get("post_number") !== 1) {
        console.log("REPLY_ID model: " + model.get("id"));
        console.log("temp()= " + temp);
        console.log("curWidgetCount= " + voteCountMap.get(model.get("id")));
        return helper.h('vote-count', voteCountMap.get(model.get("id")).toString());
      }
    });

});