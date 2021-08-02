# @author: Aryan Ahuja
# @created: 7/26/2021
#
# @project: Reply Voting
#
# @description: ReplyVotingController inherits from ApplicationController and listens
#				requests made from front-end, bot POST and GET, and calls the
#				appropriate method, depending whether it was a upvote or downvote

#the file which contains various methods for update and retrieving methods from the database
require VoteStore

class Counts
	include ActiveModel::Serializers::JSON
  
	attr_accessor :upvotes, :downvotes
  
	def attributes
	  {'upvotes' => nil, 'downvotes' => nil}
	end
end

class ReplyVotingController < ::ApplicationController
	
	# precondition: both incoming reply and user ids are valid
	# postcondition: updates the database, adds a vote to the reply,
	#		 returns nothing
	def addCount
		vote = {
			"reply_id" -> params[:replyid],
			"user_id" -> params[:userid],
			"upvote" -> true
		}
		return VoteStore.vote(params[:voteid], vote)
	end

	# @precondition: incoming reply id is valid
	# @postcondition: updates the database, removing a vote from the reply,
	#		  returns nothing
	def deleteCount
		@vote = VoteStore.find(params[:replyid])
		@vote.destroy		

		return VoteStore.remove_vote(params[:replyid])
	end

	# precondition: coming reply id is valid
	# postcondition: obtain a hash containing the upvotes and downvotes of a specific reply id
	#
	# @return --> a hash with counts for both upvotes and downvotes
	def getVoteCounts
		# totalCounts = {
		# 	"upvotes" -> VoteStore.get_up_count(params[:replyid]).to_i,
		# 	"downvotes" -> VoteStore.get_down_count(params[:replyid]).to_i
		# }
		
		# return totalCounts
		
		totalCounts = Counts.new
		totalCounts.upvotes = VoteStore.get_up_count(params[:replyid]).to_i
		totalCounts.downvotes = VoteStore.get_down_count(params[:replyid]).to_i

		return totalCounts.to_json
	end
end
