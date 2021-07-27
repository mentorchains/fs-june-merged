# name: reply-voting
# version: 0.1
# authors: fs-june-merged (team 1 + 2)

enabled_site_setting :reply_voting_enabled

after_initialize do
    User.register_custom_field_type 'reply_voting_enabler', :boolean
    register_editable_user_custom_field :reply_voting_enabler
    DiscoursePluginRegistry.serialized_current_user_fields << 'reply_voting_enabler'
end