# @author: Aryan Ahuja
# @created: 7/26/2021
# 
# @project: Reply Voting
#
# @description: defines routes, both POST and GET, and leads
#				them to a specific action in ReplyVotingController

Rails.application.routes.draw do
	
	#WARNING: EVERY vote_id passed in through the url will need to be UNIQUE

	#this route, with /true, represents an upvote, adding a vote to the database
	post '/reply/:replyid/:userid/:voteid/true' => 'replyvoting#addCount'

	#this route, with /false, represents a downvote, removing a vote from the database
	post '/reply/:relpyid/:userid/:voteid/false' => 'replyvoting#deleteCount'

	#used when the total vote count is required on a specific reply
	get '/reply/:replyid/vote-count' => 'replyvoting#getVoteCount'

end