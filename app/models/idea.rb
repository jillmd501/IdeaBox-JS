class Idea < ActiveRecord::Base
  validates :title, presence: true
  validates :body, presence: true, uniqueness: true
  enum quality: %w(swill plausible genius)
end
