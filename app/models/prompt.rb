class Prompt
  if (ENV["DATABASE_URL"])
      uri = URI.parse(ENV["DATABASE_URL"])
      DB = PG.connect(uri.hostname, uri.port, nil, nil, uri.path[1..-1], uri.user, uri.password)
    else
      DB = PG.connect(host: "localhost", port: 5432, dbname: "calliope_development")
    end

  def self.all
    results = DB.exec("SELECT * FROM prompts ORDER BY id DESC;")
    return results.map do |result|
      {
        id: result["id"].to_i,
        title: result["title"],
        body: result["body"],
        user_id: result["user_id"].to_i
      }
    end
  end

  def self.create(opts)
    results = DB.exec(
      <<-SQL
        INSERT INTO prompts (title, body, user_id)
        VALUES ('#{opts["title"]}', '#{opts["body"] ? opts["body"] : "NULL"}', #{opts["user_id"]})
        RETURNING id, title, body, user_id;
      SQL
    )
    result = results.first
    body = nil
    if (result["body"] != "NULL") then body = result["body"] end
    return {
      id: result["id"].to_i,
      title: result["title"],
      body: body,
      user_id: result["user_id"].to_i
    }
  end

end
