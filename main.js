const Koa = require("koa");
const KoaRouter = require("koa-router");
const path = require("path");
const fs = require("fs");

const app = new Koa();

const router = KoaRouter();

router
	.get("/api/v1/cloud", cloud);

function cloud(ctx, next) {
	return new Promise((resolve, reject) => {
		ctx.type = "application/json";
		const nodes = new Array(1000);
		for (let i = 0; i < nodes.length; i+=1) {
			nodes[i] = [Math.random()*10-5, Math.random()*10-5, Math.random()*10-5];
		}
		const edges = new Array(10000);
		for (let i = 0; i < edges.length; i+=1) {
			const firstNode = Math.floor(Math.random()*nodes.length);
			const secondNode = (firstNode+Math.ceil(Math.random()*(nodes.length-1)))%nodes.length;
			edges[i] = {
				nodes: [firstNode, secondNode],
				value: Math.random()*20-10,
			};
		}
		ctx.body = JSON.stringify({nodes, edges});
		resolve();
	});
}

app.use(router.routes());

const server = app.listen(process.env.PORT || 80);

module.exports = server;
