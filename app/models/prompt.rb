class Prompt
  if (ENV["HEROKU_POSTGRESQL_CHARCOAL_URL"])
    uri = URI.parse(ENV["HEROKU_POSTGRESQL_CHARCOAL_URL"])
    DB = PG.connect(uri.hostname, uri.port, nil, nil, uri.path[1..-1], uri.user, uri.password)
    else
      DB = PG.connect(host: "localhost", port: 5432, dbname: "calliope_development")
    end

  def self.all
    results = DB.exec(
      <<-SQL
        SELECT
          prompts.*,
          prompt_author.username AS prompt_author,
          reply_author.username AS reply_author,
          reply_author.id AS reply_author_id,
          replies.title AS reply_title,
          replies.body AS reply_body,
          replies.id AS reply_id
        FROM
          prompts LEFT JOIN users AS prompt_author
        ON
          prompts.user_id = prompt_author.id
        LEFT JOIN
          replies
        ON
          replies.prompt_id = prompts.id
        LEFT JOIN
          users AS reply_author
        ON
          replies.user_id = reply_author.id
        ORDER BY prompts.id DESC;
        SQL
      )
    prompts = []
    last_prompt_id = nil
    results.each do |result|
      if result["id"] != last_prompt_id
        user = {
          id: result["user_id"].to_i,
          username: result["prompt_author"]
        }
        prompts.push(
          {
            id: result["id"].to_i,
            title: result["title"],
            body: result["body"],
            user: user,
            replies: []
          }
        )
        last_prompt_id = result["id"]
      end
      if result["reply_id"]
        user = {
          id: result["reply_author_id"],
          username: result["reply_author"]
        }
        new_reply = {
          id: result["reply_id"],
          title: result["reply_title"],
          body: result["reply_body"],
          user: user
        }
        prompts.last[:replies].push(new_reply)
      end
    end
    return prompts
  end

  def self.find(id)
    results = DB.exec(
      <<-SQL
      SELECT
        prompts.*,
        prompt_author.username AS prompt_author,
        prompt_author.id AS prompt_author_id,
        reply_author.username AS reply_author,
        reply_author.id AS reply_author_id,
        replies.title AS reply_title,
        replies.body AS reply_body,
        replies.id AS reply_id
      FROM
        prompts LEFT JOIN users AS prompt_author
      ON
        prompts.user_id = prompt_author.id
      LEFT JOIN replies
      ON
        replies.prompt_id = prompts.id
      LEFT JOIN users AS reply_author
      ON
        replies.user_id = reply_author.id
      WHERE prompts.id = #{id}
      ORDER BY replies.id DESC;
      SQL
    )
    replies = []
    results.map do |result|
      if (result["reply_id"])
        user = {
          id: result["reply_author_id"],
          username: result["reply_author"]
        }
        reply = {
          id: result["reply_id"],
          title: result["reply_title"],
          body: result["reply_body"],
          user: user
        }
        replies.push(reply)
      end
    end
    prompt = results.first
    body = nil
    if (prompt["body"] != "NULL") then body = prompt["body"] end
    user = {
      id: prompt["prompt_author_id"].to_i,
      username: prompt["prompt_author"]
    }
    prompt = {
      id: results.first["id"].to_i,
      title: results.first["title"],
      body: body,
      user: user,
      replies: replies
    }
    return prompt
  end

  def self.create(opts)
    results = DB.exec(
      <<-SQL
        INSERT INTO prompts (title, body, user_id)
        VALUES ('#{opts["title"]}', '#{opts["body"] ? opts["body"] : "NULL"}', #{opts["user_id"]})
        RETURNING id, title, body, user_id;
      SQL
    )
    newPrompt = DB.exec(
      <<-SQL
        SELECT prompts.*, users.username
        FROM prompts LEFT JOIN users
        ON prompts.user_id = users.id
        WHERE prompts.id = #{results.first["id"].to_i}
      SQL
    )
    result = newPrompt.first
    body = nil
    if (result["body"] != "NULL") then body = result["body"] end
    user = {
      id: result["user_id"].to_i,
      username: result["username"]
    }
    return {
      id: result["id"].to_i,
      title: result["title"],
      body: body,
      user: user
    }
  end

  def self.update(id, opts)
    results = DB.exec(
      <<-SQL
        UPDATE prompts
        SET
          title='#{opts["title"]}',
          body='#{opts["body"] ? opts["body"] : "NULL"}'
        WHERE id = #{id}
        RETURNING id, title, body, user_id
      SQL
    )
    updatedPrompt = DB.exec(
      <<-SQL
        SELECT prompts.*, users.username
        FROM prompts LEFT JOIN users
        ON prompts.user_id = users.id
        WHERE prompts.id = #{results.first["id"].to_i}
      SQL
    )
    result = updatedPrompt.first
    body = nil
    if (result["body"] != "NULL") then body = result["body"] end
    user = {
      username: result["username"],
      id: result["user_id"].to_i
    }
    return {
      id: result["id"].to_i,
      title: result["title"],
      body: body,
      user: user
    }
  end

  def self.delete(id)
    results = DB.exec("DELETE FROM prompts WHERE id = #{id}")
    return {deleted: true}
  end


end
