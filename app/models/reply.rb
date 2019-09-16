class Reply
  if (ENV["DATABASE_URL"])
      encoded_url = URI.encode(ENV["DATABASE_URL"])
      uri = URI.parse(encoded_url)
      DB = PG.connect(uri.hostname, uri.port, nil, nil, uri.path[1..-1], uri.user, uri.password)
    else
      DB = PG.connect(host: "localhost", port: 5432, dbname: "calliope_development")
    end

  def self.all (promptId)
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
      id: result["user_id"],
      username: result["username"]
    }
    return {
      id: result["id"],
      title: result["title"],
      body: result["body"],
      user: user
    }
  end

end
