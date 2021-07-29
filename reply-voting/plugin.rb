# name: reply-voting
# version: 0.1
# authors: fs-june-merged (team 1 + 2)

enabled_site_setting :replyvoting_enabled

register_asset 'stylesheets/notebook.css'

load File.expand_path('../app/vote_store.rb', __FILE__)

after_initialize do
    load File.expand_path('../app/controllers/replyvoting_controller.rb', __FILE__)
    load File.expand_path('../app/controllers/votes_controller.rb', __FILE__)
   
    Discourse::Application.routes.append do
      # Map the path `/replyvoting` to `ReplyvotingController`’s `index` method
      get '/replyvoting' => 'replyvoting#index'

      get '/votes' => 'votes#index'
      put '/votes/:vote_id' => 'votes#update'
      delete '/votes/:vote_id' => 'votes#destroy'      
    end
  end