class ReplyVotingController < ApplicationController
    skip_before_action :check_xhr

    def index
        Rails.logger.info '🚂 Called the `ReplyVotingController#index` method.'
    end
end