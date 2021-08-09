export default Ember.Controller.extend({
  init() {
    this._super();
    this.set('votes', []);
    this.set('userId', 'JiangfengLi_SW_21');
    this.fetchVotes();
  },

  fetchVotes() {
    this.store.findAll('vote')
      .then(result => {
        for (const vote of result.content) {
          this.votes.pushObject(vote);
        }
      })
      .catch(console.error);
  },

  actions: {
    upVote(reply_id) {
      if (!reply_id) {
        return;
      }

      var vote = null;
      this.votes.forEach((element) => {
        if(element.id == reply_id && element.content == this.userId)
          vote = element;
      });

      if(vote) return;

      const voteRecord = this.store.createRecord('vote', {
        id: reply_id,
        content: this.userId
      });

      voteRecord.save()
        .then(result => {
          this.votes.pushObject(result.target);
          // this.count = count + 1;
        })
        .catch(console.error);
    },

    downVote(reply_id) {
      if(this.votes.length > 0){
        var vote = null;

        this.votes.forEach((element) => {
          if(element.id == reply_id && element.content == this.userId)
            vote = element;
        });

        if(vote){
          this.store.destroyRecord('vote', vote)
          .then(() => {
            this.votes.removeObject(vote);
            // this.count = count - 1;
          })
          .catch(console.error);
        }
      }
    }
  }
});