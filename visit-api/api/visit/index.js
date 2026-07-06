const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const allowOrigin = "*";
const corsHeaders = {
  "Access-Control-Allow-Origin": allowOrigin,
  "Access-Control-Allow-Methods": "GET,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};

module.exports = async (req, res) => {
  if (req.method === "OPTIONS") {
    return res.status(200).setHeaders(corsHeaders).send("ok");
  }

  try {
    const { data } = await supabase
      .from("site_visit")
      .select("total_visit")
      .eq("id", 1)
      .single();
    let num = data.total_visit;

    await supabase
      .from("site_visit")
      .update({ total_visit: num + 1 })
      .eq("id", 1);

    return res.status(200).setHeaders(corsHeaders).json({ total: num + 1 });
  } catch (err) {
    return res.status(500).setHeaders(corsHeaders).json({ error: err.message });
  }
};