module ApplicationHelper
  def title(page_title)
    content_for(:title) { "Contentify - #{page_title}" }
  end
end
