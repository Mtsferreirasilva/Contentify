class Setting < ApplicationRecord
  belongs_to :user

  def small?
    font_size == 'small'
  end

  def normal?
    font_size == 'normal'
  end

  def large?
    font_size == 'large'
  end

  def light?
    theme == 'light'
  end

  def dark?
    theme == 'dark'
  end
end
