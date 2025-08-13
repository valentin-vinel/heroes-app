import pg from "pg";

const client = new pg.Client({
  connectionString: "postgresql://neondb_owner:npg_coa1bNfXJ2Fk@ep-shiny-bush-abh05cxg-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
});

(async () => {
  try {
    await client.connect();
    console.log("✅ Connexion réussie à Neon !");
    const res = await client.query("SELECT NOW()");
    console.log("📅 Heure serveur :", res.rows[0]);
  } catch (err) {
    console.error("❌ Erreur de connexion :", err.message);
  } finally {
    await client.end();
  }
})();
