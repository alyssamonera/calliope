class User
  if (ENV["DATABASE_URL"])
    encoded_url = URI.encode(ENV["DATABASE_URL"])
    uri = URI.parse(encoded_url)
    DB = PG.connect(uri.hostname, uri.port, nil, nil, uri.path[1..-1], uri.user, uri.password)
  else
    DB = PG.connect(host: "localhost", port: 5432, dbname: "calliope_development")
  end

  def self.findId(username)
    results = DB.exec("SELECT id, avatar FROM users WHERE username='#{username}'")
    result = results.first
    return {
      id: result["id"].to_i,
      avatar: result["avatar"]
    }
  end

  def self.findUser(username)
    results = DB.exec(
      <<-SQL
      SELECT
        users.*,
        prompts.title AS prompt_title,
        prompts.id AS prompt_id,
        replies.title AS reply_title,
        replies.id AS reply_id
      FROM
        prompts
      RIGHT JOIN
        users
      ON
        prompts.user_id = users.id
      LEFT JOIN
        replies
      ON
        replies.user_id = users.id
      WHERE users.username='#{username}'
      SQL
    )
    replies = []
    prompts = []
    results.map do |result|
      if (result["reply_id"])
        reply = {
          id: result["reply_id"].to_i,
          title: result["reply_title"]
        }
        unless replies.include?(reply) then replies.push(reply) end
      end
      if (result["prompt_id"])
        prompt = {
          id: result["prompt_id"].to_i,
          title: result["prompt_title"]
        }
        unless prompts.include?(prompt) then prompts.push(prompt) end
      end
    end
    user = results.first
    return {
      id: user["id"],
      username: user["username"],
      avatar: user["avatar"],
      replies: replies,
      prompts: prompts
    }
  end

  def self.create(opts)
    results = DB.exec(
      <<-SQL
        INSERT INTO users (username, avatar)
        VALUES ('#{opts["username"]}', '#{opts["avatar"]}')
        RETURNING id, username, avatar;
      SQL
    )
    result = results.first
    return {
      id: result["id"].to_i,
      username: result["username"],
      avatar: result["avatar"]
    }
  end

  def self.update(username, opts)
    results = DB.exec(
      <<-SQL
        UPDATE users
        SET
          avatar='#{opts["avatar"]}'
        WHERE username='#{username}'
        RETURNING id, username, avatar;
      SQL
    )
    result = results.first
    return {
      id: result["id"].to_i,
      username: result["username"],
      avatar: result["avatar"]
    }
  end

end
