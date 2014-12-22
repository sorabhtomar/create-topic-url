# name: create_topic
# about: topic creation plugin for Discourse
# version: 0.1
# authors: tfdavids, niolacity

register_asset('javascripts/create_topic.js')

after_initialize do
  Discourse::Application.routes.prepend do
    get 'c/:parent_category/:category/create' => 'list#parent_category_category_latest'
    get 'c/:category/create' => 'list#category_latest'
  end
end
