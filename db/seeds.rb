# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Prompt.create({
  "title" => "A classic fic prompt: Two people, one bed. Go.",
  "body" => "Guess we have to share the bed... Haha just kidding... Unless...",
  "user_id" => 2})

Prompt.create({
  "title" => "Go on a walk and write a short story about the first person you see.",
  "body" => "",
  "user_id" => 3})
