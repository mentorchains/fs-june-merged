# name: reply-voting
# version: 0.1
# authors: fs-june-merged (team 1 + 2)

enabled_site_setting :reply_voting_enabled

after_initialize do
    load File.expand_path('../app/controllers/reply_voting_controller.rb', __FILE__)
  
    Discourse::Application.routes.append do
      # Map the path `/reply_voting` to `ReplyVotingController`’s `index` method
      get '/reply_voting' => 'reply_voting#index'
    end
  end