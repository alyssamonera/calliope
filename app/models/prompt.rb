class Prompt
  if (ENV["DATABASE_URL"])
      encoded_url = URI.encode(ENV["DATABASE_URL"])
      uri = URI.parse(encoded_url)
      DB = PG.connect(uri.hostname, uri.port, nil, nil, uri.path[1..-1], uri.user, uri.password)
    else
      DB = PG.connect(host: "localhost", port: 5432, dbname: "calliope_development")
    end

  def self.all
    results = DB.exec(
      <<-SQL
        SELECT
          prompts.*,
          users.username
        FROM prompts LEFT JOIN users
        ON prompts.user_id = users.id
        ORDER BY prompts.id DESC;
        SQL
      )
    return results.map do |result|
      body = nil
      if (result["body"] != "NULL") then body = result["body"] end
      user = {
        id: result["user_id"].to_i,
        username: result["username"]
      }
      {
        id: result["id"].to_i,
        title: result["title"],
        body: body,
        user: user
      }
    end
  end

  def self.find(id)
    results = DB.exec(
      <<-SQL
      SELECT
        prompts.*,
        users.username
      FROM prompts LEFT JOIN users
      ON prompts.user_id = users.id
      WHERE prompts.id = 7;
      SQL
    )
    result = results.first
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
