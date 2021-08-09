# name: reply-voting
# version: 0.1
# authors: fs-june-merged (team 1 + 2)

enabled_site_setting :reply_voting_enabled

register_asset 'stylesheets/common/reply-voting.scss'

register_svg_icon "long-arrow-alt-up"
register_svg_icon "long-arrow-alt-down"
register_svg_icon "arrow-up"
register_svg_icon "arrow-down"

load File.expand_path('../app/vote.rb', __FILE__)

after_initialize do
    load File.expand_path('../app/controllers/reply_voting_controller.rb', __FILE__)
  
    Discourse::Application.routes.append do
      put '/votes/update' => 'reply_voting#update'
      get '/votes/count' => 'reply_voting#getcount'
      delete '/votes/destroy' => 'reply_voting#destroy'
    end
end

