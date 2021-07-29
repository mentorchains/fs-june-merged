class VoteStore
  class << self
    def get_votes
      PluginStore.get('replyvoting', 'votes') || {}
    end

    def add_vote(vote_id, vote)
      votes = get_votes()
      votes[vote_id] = vote
      PluginStore.set('replyvoting', 'votes', votes)

      vote
    end

    def remove_vote(vote_id)
      votes = get_votes()
      votes.delete(vote_id)
      PluginStore.set('replyvoting', 'votes', votes)
    end
  end
end
