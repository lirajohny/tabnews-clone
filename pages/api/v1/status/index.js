import database from "infra/database.js"

async function status(request, response) {
  const databaseName = process.env.POSTGRES_DB;
  const updatedAt = new Date().toISOString();

  const maxConnections = await database.query("SHOW max_connections;");
  const parsedMaxConnections = parseInt(maxConnections.rows[0].max_connections);

  const openedConnections = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname=$1",
    values: [databaseName],
  });
  const parsedOpenedConnections = openedConnections.rows[0].count;

  const dbVersion = await database.query("SHOW server_version;");
  const parsedDbVersion = dbVersion.rows[0].server_version;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        status: "healthy",
        max_connections: parsedMaxConnections,
        opened_connections: parsedOpenedConnections,
        version: parsedDbVersion,
      }
    },
  });
}

export default status;
