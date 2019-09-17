class User
  if (ENV["DATABASE_URL"])
    encoded_url = URI.encode(ENV["DATABASE_URL"])
    uri = URI.parse(encoded_url)
    DB = PG.connect(uri.hostname, uri.port, nil, nil, uri.path[1..-1], uri.user, uri.password)
  else
    DB = PG.connect(host: "localhost", port: 5432, dbname: "calliope_development")
  end

  def self.findId(username)
    results = DB.exec("SELECT id FROM users WHERE username='#{username}'")
    return results.first
  end

  def self.findUser(username)
    results = DB.exec("SELECT * FROM users WHERE username='#{username}'")
    result = results.first
    return {
      id: result["id"].to_i,
      username: result["username"],
      avatar: result["avatar"]
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

end
