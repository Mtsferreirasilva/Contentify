# frozen_string_literal: true
module ApplicationHelper
  def title(page_title)
    content_for(:title) { "#{page_title} - Contentify" }
  end

  def meta_tag(tag, text)
    content_for :"meta_#{tag}", text
  end

  def yield_meta_tag(tag, default_text = '')
    content_for?(:"meta_#{tag}") ? content_for(:"meta_#{tag}") : default_text
  end

  def description
    'Transform the articles you find into elegant reading experiences.'
  end
end
