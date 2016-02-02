class Idea < ActiveRecord::Base
  validates :title, presence: true
end
