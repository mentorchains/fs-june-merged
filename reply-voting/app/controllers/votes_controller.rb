class VotesController < ApplicationController
  def index
    Rails.logger.info 'Called VotesController#index'
    votes = VoteStore.get_votes()

    render json: { votes: votes.values }
  end

  def update
    Rails.logger.info 'Called VotesController#update'

    vote_id = params[:vote_id]
    vote = {
      'id' => vote_id,
      'content' => params[:vote][:content]
    }

    VoteStore.add_vote(vote_id, vote)

    render json: { vote: vote }
  end

  def destroy
    Rails.logger.info 'Called NotesController#destroy'

    VoteStore.remove_vote(params[:vote_id])

    render json: success_json
  end
end
