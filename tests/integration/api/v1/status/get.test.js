
test("GET to status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status"); // faz a requisição do tipo async (assincrona) para esperar `await` a resposta do fetch
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString(); // testa se o time é valido
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  // Conexões max_connections
  expect(responseBody.dependencies.database.max_connections).toBe(100);
  // Quantas conexões estão sendo usadas
  expect(responseBody.dependencies.database.opened_connections).toEqual(1);
  // Versão do Postgres
  expect(responseBody.dependencies.database.version).toEqual("16.0");

});

