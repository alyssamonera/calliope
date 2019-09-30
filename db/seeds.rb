# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create({
  "username" => "alyssadev",
  "avatar" => "https://66.media.tumblr.com/5bbeeecdaf38bd56c2ea737d17856343/tumblr_p7bt5xQvbE1wso6i4o1_400.gif"
  })

User.create({
  "username" => "alyssadm",
  "avatar" => "https://66.media.tumblr.com/bb5567b1ac86075458902c201e522c72/tumblr_pm9nkvPwY01w1bqy1_540.jpg"
  })

User.create({
  "username" => "ahlisa",
  "avatar" => "https://66.media.tumblr.com/0589217651552a97d13090f51226355f/tumblr_pgdrohCmGM1vhmz26_640.jpg"
  })

Prompt.create({
  "title" => "A classic fic prompt: Two people, one bed. Go.".gsub!("'", "''"),
  "body" => "Guess we have to share the bed... Haha just kidding... Unless...".gsub!("'", "''"),
  "user_id" => 1})

Reply.create({
  "title" => "warmth".gsub!("'", "''"),
  "body" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur semper enim a semper commodo. Mauris laoreet finibus lacus ultrices eleifend. Vivamus nec venenatis mauris. Maecenas ut est a dui vestibulum luctus eu nec magna. Integer ultrices justo augue, sit amet eleifend massa vestibulum non. Integer vulputate facilisis felis vitae viverra. Proin ac fringilla metus. Maecenas faucibus, massa sit amet aliquet porta, lectus ex tincidunt quam, at consectetur urna nibh ut libero.".gsub!("'", "''"),
  "user_id" => 2,
  "prompt_id" => 1
  })

Reply.create({
  "title" => "After You".gsub!("'", "''"),
  "body" => "Nunc quis euismod augue. Nullam lacinia, ipsum eu finibus pretium, sapien lacus elementum tellus, sit amet volutpat odio dolor mollis dui. Fusce rutrum odio quis facilisis consequat. Aliquam at lacus sit amet est eleifend porta. Vivamus id eleifend enim. Quisque vehicula, tortor non tristique vehicula, ligula lorem dapibus eros, quis egestas elit mi condimentum justo. Praesent eros ante, ornare eu efficitur eu, semper sed ante. Suspendisse finibus sed nibh id faucibus. Aliquam eget sagittis nisl. Vestibulum non nisl eget massa lobortis euismod eu eget tortor.".gsub!("'", "''"),
  "user_id" => 3,
  "prompt_id" => 1
  })

Prompt.create({
  "title" => "Go on a walk and write a short story about the first person you see.".gsub!("'", "''"),
  "body" => "",
  "user_id" => 2})

Reply.create({
  "title" => "At Last!".gsub!("'", "''"),
  "body" => "Quisque egestas nibh posuere felis semper, quis tempus massa consequat. Nunc imperdiet at arcu a maximus. Praesent vel egestas ligula, ut cursus dui. Aliquam erat volutpat. Mauris vel nisl non lorem dictum cursus. Curabitur porta in elit non pretium. Curabitur sit amet sem sit amet orci dictum placerat. Integer suscipit sodales tortor quis ultrices. Fusce luctus nisl ac augue sodales egestas.".gsub!("'", "''"),
  "user_id" => 1,
  "prompt_id" => 2
  })

Reply.create({
  "title" => "To the Stars".gsub!("'", "''"),
  "body" => "Donec tristique dui sit amet facilisis dignissim. Integer consectetur massa nec efficitur laoreet. Curabitur dui lacus, viverra in laoreet vel, aliquet ac turpis. In lectus nibh, pulvinar ut suscipit vitae, commodo non mauris. Nunc rutrum odio diam, quis mollis neque commodo vitae. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque dapibus felis sit amet ante vestibulum congue. Cras auctor id odio sed commodo. Curabitur eget quam id arcu sodales semper. Maecenas ut ligula scelerisque, dictum est sit amet, facilisis est. Suspendisse aliquam tellus et justo iaculis, ut malesuada sem hendrerit. Etiam sagittis dapibus sodales. Donec fermentum pulvinar purus in pretium.".gsub!("'", "''"),
  "user_id" => 3,
  "prompt_id" => 2
  })

Prompt.create({
  "title" => "Write from the perspective of someone you hate.".gsub!("'", "''"),
  "body" => "",
  "user_id" => 3})

Reply.create({
  "title" => "let's grab a beer".gsub!("'", "''"),
  "body" => "Phasellus accumsan nisl quis nisl mattis, ac condimentum lacus molestie. Donec semper euismod lectus, at pulvinar ex sodales vitae. Vestibulum ornare consequat diam, sed egestas erat blandit quis. Suspendisse iaculis in tellus ut ullamcorper. Ut luctus, lacus rhoncus porttitor vulputate, dolor dui rutrum nisl, quis mollis diam arcu et ante. Integer vel commodo arcu. In at consequat lectus, et suscipit neque.".gsub!("'", "''"),
  "user_id" => 1,
  "prompt_id" => 3
  })

Reply.create({
  "title" => "#Vibes".gsub!("'", "''"),
  "body" => "Etiam vehicula libero ex, quis volutpat enim convallis vel. Curabitur et rhoncus diam. Maecenas id massa a lacus dictum tempor ut eu mauris. Integer scelerisque molestie risus, ut dapibus lectus mollis quis. Sed magna nisl, convallis ac euismod ac, hendrerit in lectus. Mauris condimentum convallis elit nec aliquam. Quisque semper turpis a est sollicitudin hendrerit. Morbi non ex ex. Etiam ac porta est. Aliquam orci mi, lobortis non purus id, fermentum commodo tellus. Suspendisse potenti. Cras eget nunc rutrum, lobortis libero sit amet, euismod sapien. Duis vitae finibus arcu, et commodo eros.".gsub!("'", "''"),
  "user_id" => 2,
  "prompt_id" => 3
  })
