require 'test_helper'

class ArticleParserTest < ActiveSupport::TestCase

  test "create a valid article parser with a valid url" do
    url = 'https://www.nytimes.com/2017/04/17/us/politics/tax-code-overhaul-trump.html?rref=collection%2Fsectioncollection%2Fus&action=click&contentCollection=us&region=rank&module=package&version=highlights&contentPlacement=1&pgtype=sectionfront&_r=0'
    stub_successfull_mercury_request(url)
    article_parser = ArticleParser.new(url)

    assert_equal true, article_parser.valid?
  end

  test "don't create an article parser with an empty url" do
    url = ''
    empty_article_parser = ArticleParser.new(url)

    assert_equal true, empty_article_parser.errors.any?
    assert_equal true, empty_article_parser.article.blank?
  end

  test "don't create an article parser with an invalid url" do
    url = '128r3ibdaisb'
    invalid_article_parser = ArticleParser.new(url)

    assert_equal true, invalid_article_parser.errors.any?
    assert_equal true, invalid_article_parser.article.blank?
  end

  test "create an article parser with erros" do
    url = 'http://ww.le'
    stub_null_mercury_request(url)
    article_parser = ArticleParser.new(url)

    assert_equal true, article_parser.errors.any?
    assert_equal true, article_parser.article.blank?
  end

  test "create an article parser with erros for incomplete url" do
    url = 'http://www.footmercato.net/coupe-de-fran'
    stub_null_mercury_request(url)
    article_parser = ArticleParser.new(url)

    assert_equal true, article_parser.errors.any?
    assert_equal true, article_parser.article.blank?
  end

  private

  VALID_MERCUY_RESPONSE = {
    "title": "Trump’s Unreleased Taxes Threaten Yet Another Campaign Promise",
    "content": "<div><article id=\"story\" class=\"story theme-main   \">\n\n    \n\n                        \n    \n\n    \n\n        \n    <div class=\"story-body-supplemental\">\n    <div class=\"story-body story-body-1\">\n        <figure id=\"media-100000005049507\" class=\"media photo lede layout-large-horizontal\">\n    \n    <div class=\"image\">\n            <img src=\"https://static01.nyt.com/images/2017/04/18/us/18TAXES-01/18TAXES-01-master768.jpg\" alt=\"\" class=\"media-viewer-candidate\">\n            <meta>\n            <meta>\n    </div>\n        <figcaption class=\"caption\">\n                <span class=\"caption-text\">Protesters rallied near President Trump&#x2019;s Mar-a-Lago resort in Palm Beach, Fla., on Saturday to demand that he release his tax returns.</span>\n                        <span class=\"credit\">\n            \n            Al Drago/The New York Times        </span>\n            </figcaption>\n    </figure>\n\n<p class=\"story-body-text story-content\">WASHINGTON &#x2014; President Trump&#x2019;s promise to enact a sweeping overhaul of the tax code is in serious jeopardy nearly 100 days into his tenure, and his <a href=\"https://www.nytimes.com/2017/04/07/us/politics/democrats-see-opening-in-tax-overhaul-fight-trumps-own-deductions.html\">refusal to release his own tax returns</a> is emerging as a central hurdle to another faltering campaign promise.</p><p class=\"story-body-text story-content\">As procrastinators rushed to file their tax returns by Tuesday, the White House press secretary, Sean Spicer, emphasized again on Monday that Mr. Trump had no intention of making his public. Democrats have seized on that decision, uniting around a pledge not to cooperate on any rewriting of the tax code unless they know specifically how that revision would benefit the billionaire president and his family.</p><p class=\"story-body-text story-content\">And a growing roster of more than a dozen Republican lawmakers now say Mr. Trump should release them.</p><p class=\"story-body-text story-content\">&#x201C;If he doesn&#x2019;t release his returns, it is going to make it much more difficult to get tax reform done,&#x201D; said Senator Chuck Schumer, the Democratic leader, pointing out that the president has significant conflicts of interest on issues such as taxation of the real estate industry and elimination of the <a href=\"http://topics.nytimes.com/your-money/planning/estate-planning/index.html?inline=nyt-classifier\" class=\"meta-classifier\">estate tax</a>. &#x201C;It&#x2019;s in his own self-interest.&#x201D;</p>        \n    </div>\n    \n</div>\n\n<div class=\"story-body-supplemental\">\n    <div class=\"story-body story-body-2\">\n        <p class=\"story-body-text story-content\" id=\"story-continues-2\">With Republicans sharply divided on a path forward and the administration unable to come up with a plan of its own, the Democratic resistance is only the newest impediment.</p>\n<p class=\"story-body-text story-content\" id=\"story-continues-3\">As a candidate, <a href=\"https://twitter.com/realdonaldtrump/status/782541307168391168?lang=en\">Mr. Trump declared</a> that he understood America&#x2019;s complex tax laws &#x201C;better than anyone who has ever run for president&#x201D; and that he alone could fix them. But it is becoming increasingly unlikely that there will be a simpler system, or even lower tax rates, this time next year. The Trump administration&#x2019;s tax plan, promised in February, has yet to materialize; a House Republican plan has bogged down, taking as much fire from conservatives as liberals; and on Monday, Treasury Secretary Steven Mnuchin <a href=\"https://www.ft.com/content/2e48c5bc-238c-11e7-8691-d5f7e0cd0a16\">told </a><a href=\"https://www.ft.com/content/2e48c5bc-238c-11e7-8691-d5f7e0cd0a16\">The Financial Times</a> that the administration&#x2019;s goal of getting a tax plan signed by August was &#x201C;not realistic at this point.&#x201D;</p><p class=\"story-body-text story-content\">A tax overhaul could be the next expansive Trump campaign promise that falters before it even gathered much steam.</p><p class=\"story-body-text story-content\">&#x201C;If they have no plan, they can&#x2019;t negotiate,&#x201D; said Larry Kudlow, the economist who helped Mr. Trump devise his campaign tax plan. &#x201C;In that case, tax reform is dead.&#x201D;</p>\n<p class=\"story-body-text story-content\" id=\"story-continues-4\">The first pitfall for Mr. Trump was <a href=\"https://www.nytimes.com/2017/03/24/us/politics/health-care-affordable-care-act.html\">the debacle of his health </a><a href=\"https://www.nytimes.com/2017/03/24/us/politics/health-care-affordable-care-act.html\">care plan</a>, which burned political capital and precious days off the legislative calendar. But his administration saw repealing the taxes imposed by the Affordable Care Act as an important step that would allow for deeper tax cuts later. Mr. Trump <a href=\"http://www.foxbusiness.com/politics/2017/04/11/health-care-reform-first-will-pave-way-for-tax-reform-trump-exclusive.html\">even suggested last week</a> that he might return to health care before tax cuts.</p>\n<p class=\"story-body-text story-content\" id=\"story-continues-5\">Republican leaders in Congress also failed to create momentum. Speaker Paul D. Ryan built a tax blueprint around a &#x201C;border adjustment&#x201D; tax that would have imposed a steep levy on imports, hoping to encourage domestic manufacturing while raising revenue that could be used to lower overall tax rates. But it has been assailed by retailers, oil companies and the billionaire Koch brothers. With no palpable support in the Senate, its prospects appear to be nearly dead. Heading into a congressional recess, Mr. Ryan admitted that Republicans in the House, Senate and White House were not on the same page.</p>\n<p class=\"story-body-text story-content\" id=\"story-continues-6\">The president&#x2019;s own vision for a new tax system is muddled at best. In the past few months, he has called for taxing companies that move operations abroad, waffled on the border tax and, last week, called for a &#x201C;reciprocal&#x201D; tax that would match the import taxes other countries impose on the United States.</p><p class=\"story-body-text story-content\">But it is Mr. Trump&#x2019;s own taxes that have provided the crucial leverage for his opponents. More than 100,000 of his critics took to the streets over the weekend in marches around the country, demanding that the president release his returns. Tax legislation, they say, could be a plot by Mr. Trump to get even richer.</p><p class=\"story-body-text story-content\">&#x201C;When they talk about tax reform, are they talking about cutting <a href=\"http://www.nytimes.com/topic/person/donald-trump?inline=nyt-per\" class=\"meta-per\">Donald Trump</a>&#x2019;s taxes by millions of dollars a year?&#x201D; asked Ezra Levin, a member of the Tax March executive committee. &#x201C;We don&#x2019;t know.&#x201D;</p>\n<p class=\"story-body-text story-content\">Beyond the politics of Mr. Trump&#x2019;s returns, lawmakers do not want to pass an overhaul of the tax code that unwittingly enriches the commander in chief and his progeny. Those who are worried about conflicts of interest point to the potential repeal of the estate tax or elimination of the <a href=\"http://topics.nytimes.com/top/reference/timestopics/subjects/a/alternative_minimum_tax/index.html?inline=nyt-classifier\" class=\"meta-classifier\">alternative minimum tax</a> as provisions that would enrich Mr. Trump.</p>\n<p class=\"story-body-text story-content\" id=\"story-continues-7\">Perhaps the most consequential concern relates to a House Republican proposal to get rid of a rule that lets companies write off the interest they pay on loans &#x2014; a move real estate developers and Mr. Trump vehemently oppose. Doing so would raise $1 trillion in revenue and reduce the appeal of one of Mr. Trump&#x2019;s favorite business tools: debt.</p><p class=\"story-body-text story-content\">In the halls of Congress, Democrats are employing procedural maneuvers to drive home their point on the tax returns and possibly compel Republican lawmakers to join their effort to force Mr. Trump to release them. And Democratic aides say more tricks are coming.</p>\n<p class=\"story-body-text story-content\" id=\"story-continues-8\">More than a dozen Republicans &#x2014; from recognizable names like Senator Joni Ernst of Iowa and Representative Mark Sanford of South Carolina to backbenchers like Representatives David Young of Iowa, Matt Gaetz of Florida, Walter B. Jones of North Carolina, Ted Yoho of Florida, Rodney Frelinghuysen of New Jersey and Justin Amash of Michigan &#x2014; have agreed that Mr. Trump should release his returns.</p><p class=\"story-body-text story-content\">That list grows almost daily. On Monday, former Representative Joe Walsh of Illinois, a conservative firebrand and Trump loyalist, said the president should release his tax returns. &#x201C;I do think this issue will come back and bite him on the butt,&#x201D; he said on MSNBC.</p>\n<p class=\"story-body-text story-content\" id=\"story-continues-9\">Republicans argue that Democrats are putting politics ahead of an opportunity to fix a broken tax system. Mr. Trump shot back at his critics on Twitter on Sunday, suggesting that the protesters had been paid and that they were sore losers. On Monday, Mr. Spicer said that Mr. Trump remained under audit and that, breaking with 40 years of presidential tradition, his tax returns would not be made public.</p><p class=\"story-body-text story-content\">&#x201C;I think the president&#x2019;s view on this has been very clear from the campaign, and the American people understood it when they elected him in November,&#x201D; Mr. Spicer said.</p>\n<p class=\"story-body-text story-content\" id=\"story-continues-10\">Polls show that a majority of Americans, including most Republicans, would like Mr. Trump to release his tax returns, according to the Republican pollster Frank Luntz. However, the issue is a low priority for voters.</p>\n<p class=\"story-body-text story-content\" id=\"story-continues-11\">&#x201C;You&#x2019;re not going to change someone&#x2019;s opinion of Trump merely by what&#x2019;s in his tax returns,&#x201D; Mr. Luntz said.</p><p class=\"story-body-text story-content\">It remains unclear what impact the emphasis on Mr. Trump&#x2019;s taxes will have on his aspirations of tackling the tax code.</p>\n<p class=\"story-body-text story-content\" id=\"story-continues-12\">Mr. Schumer said he had had no communication with the president about tax legislation and only minimal outreach from his economic advisers. While Mr. Trump signaled that he would like to reach a bipartisan tax deal, potentially including an infrastructure plan, the focus on his tax returns suggests that any legislation will happen along party lines. That would mean that a more limited bill, requiring a simple majority, would need to pass the Senate through complicated budget rules that create a new set of problems.</p>\n<p class=\"story-body-text story-content\" id=\"story-continues-13\">With little appetite for bipartisanship, many veterans of tax fights and lobbyists in Washington expect that Mr. Trump will ultimately embrace straight tax cuts, with some cleaning up of deductions, and call it a victory. Even that would be difficult, with a narrow Republican majority in the Senate and a widening budget deficit.</p>\n<p class=\"story-body-text story-content\">Former Representative Dave Camp of Michigan &#x2014; a Republican who, as chairman of the Ways and Means Committee, released a tax plan in 2014 &#x2014; said that if they wanted to get something done, lawmakers needed to brace for a more intense series of battles over the details of tax legislation than they faced during the failed health care effort.</p><p class=\"story-body-text story-content\">&#x201C;Obviously, there is a lot at stake here,&#x201D; Mr. Camp said. &#x201C;Health care is 20 percent of the economy, but tax reform is 100 percent of the economy.&#x201D;</p><footer class=\"story-footer story-content\">\n    <div class=\"story-meta\">\n                        \n\n        \n        <p class=\"story-print-citation\">A version of this article appears in print on April 18, 2017, on Page A1 of the <span>New York edition</span> with the headline: Trump&#x2019;s Promise To Fix Tax Code Is Bogging Down. \n</p>\n\n    </div>\n    </footer>\n        \n    </div>\n    \n</div>\n\n    \n    \n\n    \n\n</article></div>",
    "author": "Alan Rappeport",
    "date_published": "2017-04-18T00:34:45.000Z",
    "lead_image_url": "https://static01.nyt.com/images/2017/04/18/us/18TAXES-01/18TAXES-01-facebookJumbo.jpg",
    "dek": nil,
    "next_page_url": nil,
    "url": "https://www.nytimes.com/2017/04/17/us/politics/tax-code-overhaul-trump.html",
    "domain": "www.nytimes.com",
    "excerpt": "Democrats have pledged not to cooperate on an overhaul of the tax code unless they know how that rewrite would benefit the president and his family.",
    "word_count": 1396,
    "direction": "ltr",
    "total_pages": 1,
    "rendered_pages": 1
  }

  INVALID_MERCURY_RESPONSE = {
    "error": true,
    "messages": "The url parameter passed does not look like a valid URL. Please check your data and try again.",
    "failed": true
  }

  def stub_successfull_mercury_request(url)
    stub_request(:get, "https://mercury.postlight.com/parser?url=#{url}")
      .with(headers: {'X-Api-Key'=>'M0VLkUqZD9ur6M8oxegUuOgNmHcAMwkzQZ2wJlEg'})
      .to_return(status: 200, body: "#{VALID_MERCUY_RESPONSE}", headers: {})
  end

  def stub_failed_mercury_request(url)
    stub_request(:get, "https://mercury.postlight.com/parser?url=#{url}")
      .with(headers: {'X-Api-Key'=>'M0VLkUqZD9ur6M8oxegUuOgNmHcAMwkzQZ2wJlEg'})
      .to_return(status: 200, body: "#{INVALID_MERCURY_RESPONSE}", headers: {})
  end

  def stub_null_mercury_request(url)
    stub_request(:get, "https://mercury.postlight.com/parser?url=#{url}")
      .with(headers: {'X-Api-Key'=>'M0VLkUqZD9ur6M8oxegUuOgNmHcAMwkzQZ2wJlEg'})
      .to_return(status: 200, body: '', headers: {})
  end
end
