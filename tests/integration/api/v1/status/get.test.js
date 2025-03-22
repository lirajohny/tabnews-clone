
test("GET to status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status"); // faz a requisição do tipo async (assincrona) para esperar `await` a resposta do fetch
  expect(response.status).toBe(200);
});

