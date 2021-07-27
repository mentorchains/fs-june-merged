class VoteStore
    class << self
    # Returns all votes stored in database
      def get_votes
        PluginStore.get('reply_voting', 'votes') || {}
      end
  
    # @param vote_id: Integer   Unique id for each vote
    # @param vote: Hash         Contains the reply_id, user_id, upvote/downvote
      def vote(vote_id, vote)
        votes = get_votes()
        votes[vote_id] = vote
        PluginStore.set('reply_voting', 'votes', votes)
      end

    # @param vote_id: Integer   Indicates which vote to remove
      def remove_vote(vote_id)
        votes = get_votes()
        votes.delete(vote_id)
        PluginStore.set('reply_voting', 'votes', votes)
      end

    end
end

# == Schema Information
#
# Table name: votes
#
#  user_id    :integer          not null
#  reply_id   :integer          not null
#  upvote     :boolean          not null
#