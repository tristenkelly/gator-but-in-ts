import postgres from "postgres";

const sql = postgres({
  host: "localhost",
  port: 5432,
  database: "postgres",
  username: "postgres",
  password: "postgres",
  ssl: false,
  debug: true,
});

async function test() {
  console.log("Testing connection...");
  const res = await sql`SELECT NOW()`;
  console.log("Result:", res);
  process.exit(0);
}

test().catch(err => {
  console.error("Error:", err);
  process.exit(1);
});
