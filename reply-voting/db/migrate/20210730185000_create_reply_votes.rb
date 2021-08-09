class CreateReplyVotes < ActiveRecord::Migration[7.0]
    def change
      create_table :votes do |t|
        t.integer :reply_id
        t.string :user_id
  
        t.timestamps
      end
    end
  end
  