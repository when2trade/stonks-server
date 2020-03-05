const request = require("supertest");
const server = require("../main.js");

beforeAll(() => {
});

afterAll(() => {
	server.close();
});

describe("api/v1/cloud", () => {
	test("GET returns JSON of correct shape", () => {
		return request(server).get("/api/v1/cloud").then(response => {
			expect(response.status).toEqual(200);
			expect(response.type).toEqual("application/json");
			const data = JSON.parse(response.text);
			expect(data.nodes).toBeInstanceOf(Array);
			expect(data.edges).toBeInstanceOf(Array);
			data.nodes.forEach(node => {
				expect(node).toBeInstanceOf(Array);
				expect(node.length).toBe(3);
				node.forEach(v => {
					expect(v).toEqual(expect.any(Number));
				});
			});
			data.edges.forEach(edge => {
				expect(edge.nodes).toBeInstanceOf(Array);
				expect(edge.nodes.length).toEqual(2);
				expect(edge.value).toEqual(expect.any(Number));
				edge.nodes.forEach(v => {
					expect(v).toEqual(expect.any(Number));
					expect(v % 1).toBe(0);
					expect(v).toBeGreaterThanOrEqual(0);
					expect(v).toBeLessThan(data.nodes.length);
				});
				expect(edge.nodes[0]).not.toEqual(edge.nodes[1]);
			});
		});
	});
});
