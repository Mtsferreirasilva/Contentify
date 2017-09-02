# frozen_string_literal: true
class LoginProvider < ApplicationRecord
  belongs_to :user
end
