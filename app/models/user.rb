class User
  if (ENV["DATABASE_URL"])
    encoded_url = URI.encode(ENV["DATABASE_URL"])
    uri = URI.parse(encoded_url)
    DB = PG.connect(uri.hostname, uri.port, nil, nil, uri.path[1..-1], uri.user, uri.password)
  else
    DB = PG.connect(host: "localhost", port: 5432, dbname: "calliope_development")
  end

  def self.find(username)
    results = DB.exec("SELECT id FROM users WHERE username='#{username}'")
    return results.first
  end

  def self.create(opts)
    results = DB.exec(
      <<-SQL
        INSERT INTO users (username)
        VALUES ('#{opts["username"]}')
        RETURNING id, username;
      SQL
    )
    result = results.first
    return {
      id: result["id"].to_i,
      username: result["username"]
    }
  end

end
