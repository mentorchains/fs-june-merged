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

        # @param reply_id: Integer  Indicates which reply to get count for 
        # @return count: Integer    Count of specified reply_id
        def get_count(reply_id)
            votes = get_votes().values
            count = 0
            votes.each do |vote|
                if vote[:reply_id] == reply_id
                    count += vote[:upvote] ? 1 : -1
                end
            end
            count
        end

        # @return count: Hash    Counts of all reply_id
        def get_all_count()
            votes = get_votes().values
            votes.each_with_object(Hash.new(0)) { |h1, h2| h2[h1[:reply_id]] += h1[:upvote] ? 1 : -1}
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