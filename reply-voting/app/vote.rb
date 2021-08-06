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

        # @param reply_id: Integer  Indicates which reply to get upvote count for 
        # @return count: Integer    Count of specified reply_id
        def get_up_count(reply_id)
            votes = get_votes().values
            votes.count{|h| h[:reply_id] == reply_id && h[:upvote] == "true"}
        end

        # @param reply_id: Integer  Indicates which reply to get downvote count for 
        # @return count: Integer    Count of specified reply_id
        def get_down_count(reply_id)
            votes = get_votes().values
            votes.count{|h| h[:reply_id] == reply_id && h[:upvote] == "false"}
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