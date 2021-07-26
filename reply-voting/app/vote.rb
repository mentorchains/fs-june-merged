class Votetore
    class << self
    # Returns all votes stored in database
      def get_votes
        PluginStore.get('reply_voting', 'votes') || {}
      end

    # Returns all replies with counts
      def get_count
        PluginStore.get('reply_voting', 'vote_count') || {}
      end
  
    # @param vote_id: Integer   Unique id for each vote
    # @param vote: Hash         Contains the vote_id, reply_id, and user_id
      def vote(vote_id, vote)
        votes = get_votes()
        votes[vote_id] = vote
        PluginStore.set('reply_voting', 'votes', votes)
      end

    # @param reply_id: Integer   Indicates which reply's count to update
    # @param count: Hash         Contains the reply_id and updated count
      def update_count(reply_id,count)
        counts = get_count()
        counts[reply_id] = count
        PluginStore.set('reply_voting', 'vote_count', counts)
      end

    # @param vote_id: Integer   Indicates which vote to remove
      def remove_vote(vote_id)
        votes = get_votes()
        votes.delete(vote_id)
        PluginStore.set('reply_voting', 'votes', votes)
      end

    end
end