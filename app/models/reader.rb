class Reader
  include HTTParty

  base_uri 'https://mercury.postlight.com'

  def initialize
    @header = { headers: { 'x-api-key' => ENV.fetch('MERCURY_API_KEY') } }
  end

  def page(url)
    self.class.get("/parser?url=#{url}", @header)
  end
end
