# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

  Article.create!(
    user_id: 860585676,
    content: {
      "title"=>"Après le premier tour, Macron peaufine sa stratégie, Le Pen part à l’assaut",
      "author"=>nil,
      "date_published"=>"2017-04-25T00:00:00.000Z",
      "dek"=>nil,
      "lead_image_url"=>"http://s1.lemde.fr/image/2017/04/25/644x322/5116875_3_2e86_marine-le-pen-sur-le-plateau-de-france-2-le_94b78d7866570bb69db86aca55c938d9.jpg",
      "content"=> "<div><p class=\"txt3 description-article\">La candidate d&#x2019;extr&#xEA;me droite a choisi de se mettre en cong&#xE9; de la pr&#xE9;sidence du FN, un geste symbolique. Chez le pr&#xE9;tendant d&#x2019;En marche&#xA0;!, on h&#xE9;site sur le plan de bataille.</p><div id=\"articleBody\" class=\"contenu_article js_article_body\"> <figure class=\"illustration_haut\">\n" +
    "<img width=\"534\" class=\"illu lazy-retina\" src=\"http://s1.lemde.fr/image/2017/04/25/534x0/5116875_7_57d6_marine-le-pen-sur-le-plateau-de-france-2-le_b87d96f8a178f4eef23e9443befd6e0c.jpg\" alt=\"Marine Le Pen, sur le plateau de France 2, le 24 avril.\"> <figcaption class=\"legende\"><span class=\"source_image\"></span> </figcaption> </figure> <p>L&#x2019;une a un retard cons&#xE9;quent &#xE0; combler, l&#x2019;autre une avance confortable &#xE0; g&#xE9;rer. Pour Marine Le Pen et Emmanuel Macron, ce sont deux campagnes tr&#xE8;s diff&#xE9;rentes qui se sont engag&#xE9;es dans cet entre-deux-tours de l&#x2019;&#xE9;lection pr&#xE9;sidentielle. La candidate du Front national est arriv&#xE9;e avec pr&#xE8;s de trois points de retard sur son adversaire d&#x2019;En marche&#xA0;!, dimanche 23&#xA0;avril, en enregistrant 21,3&#xA0;% des suffrages, contre 24&#xA0;% pour M. Macron.</p>\n" +
    "<p>Les soutiens en faveur de l&#x2019;ancien ministre de l&#x2019;&#xE9;conomie ont afflu&#xE9;, lundi 24, de la part du parti Les R&#xE9;publicains, du Parti socialiste ou encore du pr&#xE9;sident de la R&#xE9;publique, Fran&#xE7;ois Hollande. Et les premiers sondages du second tour, r&#xE9;v&#xE9;l&#xE9;s depuis dimanche soir, promettent entre 62&#xA0;% et 64&#xA0;% des voix &#xE0; l&#x2019;ancien banquier, le 7&#xA0;mai.</p>\n" +
    "<p>Dans ce contexte, M<sup>me</sup> Le Pen a choisi de saturer au plus vite l&#x2019;espace m&#xE9;diatique et d&#x2019;attaquer sans rel&#xE2;che son adversaire, alors que M. Macron s&#x2019;est permis de prendre un peu de recul et a laiss&#xE9; la d&#xE9;put&#xE9;e europ&#xE9;enne boxer seule sur son ring. Pour tenter de convaincre de sa capacit&#xE9; &#xE0; ouvrir ses rangs et &#xE0; rassembler, la candidate du parti d&#x2019;extr&#xEA;me droite a sorti une carte de son jeu, lundi&#xA0;: elle a annonc&#xE9; au journal de 20&#xA0;heures de France 2 se mettre <em>&#xAB;&#xA0;en cong&#xE9;&#xA0;&#xBB;</em> de la pr&#xE9;sidence du FN. <em>&#xAB;&#xA0;Ce soir, je ne suis plus la pr&#xE9;sidente du FN, je suis la candidate &#xE0; la pr&#xE9;sidentielle&#xA0;&#xBB;,</em> a-t-elle expliqu&#xE9;, dans une posture qu&#x2019;elle voulait solennelle.</p>\n" +
    "Le Pen et la difficult&#xE9; &#xE0; sortir d&#x2019;une posture jug&#xE9;e clivante\n" +
    "<p>Cette d&#xE9;cision &#xE9;tait sugg&#xE9;r&#xE9;e depuis des mois par certains soutiens de la d&#xE9;put&#xE9;e europ&#xE9;enne, mais restait cantonn&#xE9;e au stade du projet. Elle s&#x2019;apparente aujourd&#x2019;hui &#xE0; une r&#xE9;volution de pure forme. Selon les statuts du parti, c&#x2019;est au premier vice-pr&#xE9;sident, Jean-Fran&#xE7;ois Jalkh &#x2013; un homme &#xE0; la fid&#xE9;lit&#xE9; &#xE9;prouv&#xE9;e, aussi bien par M<sup>me</sup> Le Pen que par son p&#xE8;re, Jean-Marie Le Pen, auparavant &#x2013;, d&#x2019;assurer l&#x2019;int&#xE9;rim. Et les instances du FN, toutes...</p> </div></div>",
      "next_page_url"=>nil,
      "url"=> "http://www.lemonde.fr/election-presidentielle-2017/article/2017/04/25/au-lendemain-du-premier-tour-macron-peaufine-sa-strategie-marine-le-pen-part-a-l-assaut_5116871_4854003.html",
      "domain"=>"www.paris.fr",
      "excerpt"=> "La candidate d’extrême droite a choisi de se mettre en congé de la présidence du FN, un geste symbolique. Chez le prétendant d’En marche !, on hésite sur le plan de bataille.",
      "word_count"=>365,
      "direction"=>"ltr",
      "total_pages"=>1,
      "rendered_pages"=>1
    }
  )
#
# # Article that belongs to the domain lemonde.fr
# # Article.where('content @> ?', {domain: 'www.lemonde.fr'}.to_json)

# You can query the article like this
# article = Article.first
# article.content[:url] or article.content['url']
# article.content[:domain] or article.content['domain']


# Load fixtures in to the current environment
# rake db:fixtures:load FIXTURES=credit_card_types
