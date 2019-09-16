class Reply
  if (ENV["DATABASE_URL"])
      encoded_url = URI.encode(ENV["DATABASE_URL"])
      uri = URI.parse(encoded_url)
      DB = PG.connect(uri.hostname, uri.port, nil, nil, uri.path[1..-1], uri.user, uri.password)
    else
      DB = PG.connect(host: "localhost", port: 5432, dbname: "calliope_development")
    end

  def self.all promptId
    results = DB.exec(
      <<-SQL
        SELECT replies.*, users.username
        FROM replies LEFT JOIN users
        ON replies.user_id = users.id
        WHERE prompt_id = #{promptId}
      SQL
    )
    result = results.first
    user = {
      id: result["user_id"].to_i,
      username: result["username"]
    }
    return {
      id: result["id"].to_i,
      title: result["title"],
      body: result["body"],
      user: user
    }
  end

  def self.find id
    results = DB.exec(
      <<-SQL
        SELECT replies.*, users.username, prompts.title AS prompt_title, prompts.body AS prompt_body
        FROM replies LEFT JOIN users
        ON replies.user_id = users.id
        LEFT JOIN prompts ON replies.prompt_id = prompts.id
        WHERE replies.id = #{id}
      SQL
    )
    result = results.first
    user = {
      id: result["user_id"].to_i,
      username: result["username"]
    }
    prompt = {
      id: result["prompt_id"].to_i,
      title: result["prompt_title"],
      body: result["prompt_body"]
    }
    return {
      id: result["id"].to_i,
      title: result["title"],
      body: result["body"],
      user: user,
      prompt: prompt
    }
  end

  def self.create opts
    results = DB.exec(
      <<-SQL
        INSERT INTO replies (title, body, user_id, prompt_id)
        VALUES ('#{opts["title"]}', '#{opts["body"]}', #{opts["user_id"]}, #{opts["prompt_id"]})
        RETURNING id, title, body, user_id, prompt_id
      SQL
    )
    newReply = DB.exec(
      <<-SQL
        SELECT replies.*, users.username
        FROM replies LEFT JOIN users
        ON replies.user_id = users.id
        WHERE replies.id = #{results.first["id"].to_i}
      SQL
    )
    result = newReply.first
    user = {
      id: result["user_id"].to_i,
      username: result["username"]
    }
    return {
      id: result["id"].to_i,
      title: result["title"],
      body: result["body"],
      user: user
    }
  end

  def self.delete id
    results = DB.exec("DELETE FROM replies WHERE id = #{id}")
    return {deleted: true}
  end

end
