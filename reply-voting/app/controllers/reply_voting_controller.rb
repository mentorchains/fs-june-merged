# @author: Aryan Ahuja and Ryan Kwong
# @created: 7/26/2021
#
# @project: Reply Voting
#
# @description: ReplyVotingController inherits from ApplicationController and listens
#				requests made from front-end, bot POST and GET, and calls the
#				appropriate method, depending whether it was a upvote or downvote

#the file which contains various methods for update and retrieving methods from the database


class Counts
	include ActiveModel::Serializers::JSON
  
	attr_accessor :upvotes, :downvotes
  
	def attributes
	  {'upvotes' => nil, 'downvotes' => nil}
	end
end

class ReplyVotingController < ::ApplicationController
	
	# # precondition: both incoming reply and user ids are valid
	# # postcondition: updates the database, adds a vote to the reply,
	# #		 returns nothing
    def update
		Rails.logger.info 'Called VotesController#update'
		vote_id = params[:vote_id]
		
		vote = {
		  'vote_id' => vote_id,
		  'reply_id' => params[:reply_id],
		  'user_id' => params[:user_id],
		  'upvote' => params[:upvote]
		}
		VoteStore.vote(vote_id, vote)
		Rails.logger.info "#{VoteStore.get_votes()}"
		render json: { vote: vote }
	end

	# precondition: coming reply id is valid
	# postcondition: obtain a hash containing the upvotes and downvotes of a specific reply id
	#
	# @return --> a hash with counts for both upvotes and downvotes
	def getVoteCounts
		totalCounts = {
			"upvotes" => VoteStore.get_up_count(params[:replyid]).to_i,
			"downvotes" => VoteStore.get_down_count(params[:replyid]).to_i
		}
		return totalCounts
	end

		# totalCounts = Counts.new
		# totalCounts.upvotes = VoteStore.get_up_count(params[:replyid]).to_i
		# totalCounts.downvotes = VoteStore.get_down_count(params[:replyid]).to_i

		# return totalCounts.to_json
	# # @precondition: incoming reply id is valid
	# # @postcondition: updates the database, removing a vote from the reply,
	# #		  returns nothing
    def destroy
        Rails.logger.info 'Called VotesController#destroy'
  		# @vote = VoteStore.find(params[:replyid])
		# @vote.destroy	
		  
        Rails.logger.info "#{params}"
        VoteStore.remove_vote(params[:vote_id])
    
        render json: success_json
    end

	# # precondition: coming reply id is valid
	# # postcondition: obtain a hash containing the upvotes and downvotes of a specific reply id
	# #
	# # @return --> a hash with counts for both upvotes and downvotes
    def getcount
		Rails.logger.info 'Called VotesController#getcount'
		upcount = VoteStore.get_up_count(params[:id])
		downcount = VoteStore.get_down_count(params[:id])
		Rails.logger.info "Up: #{upcount}"
		Rails.logger.info "Down: #{downcount}"
		render json: {upcount:upcount,downcount:downcount}
	end
end
