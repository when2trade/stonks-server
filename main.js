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
		ctx.body = fs.createReadStream(path.join(__dirname, "cloud.json"));
		resolve();
	});
}

app.use(router.routes());

const server = app.listen(process.env.PORT || 80);

module.exports = server;
