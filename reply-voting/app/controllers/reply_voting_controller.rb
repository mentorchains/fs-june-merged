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

class ReplyVotingController < ::ApplicationController
	
	# precondition: coming reply id is valid
	# postcondition: obtain a single integer representing the vote count on a specific reply
	#
	# @return --> vote count
	def getVoteCount

		VoteStore.get_vote(params[:replyid])

	end

	# precondition: both incoming reply and user ids are valid
	# postcondition: updates the database, adds a vote to the reply,
	#				 returns nothing
	def addCount
		
		vote = {
			"replyId" -> params[:replyid],
			"userId" -> params[:userid],
			"upvote" -> true
		}

		VoteStore.vote(params[:voteid], vote)

	end

	# @precondition: incoming reply id is valid
	# @postcondition: updates the database, removing a vote from the reply,
	#				  returns nothing
	def deleteCount

		VoteStore.remove_vote(params[:replyid])
		
	end

end