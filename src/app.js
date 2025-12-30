import express from "express";
import cors from "cors";
import "dotenv/config";
import { supabase } from "./services/supabase.js";

const app = express();

app.use(cors());
app.use(express.json());

// 1) 서버 살아있는지 체크
app.get("/health", (req, res) => {
  res.json({ ok: true, message: "dongataxi server alive" });
});

// 2) Supabase 연결 체크 (profiles 테이블에서 1개만 조회)
app.get("/supabase-check", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("id")
      .limit(1);

    if (error) {
      return res.status(500).json({ ok: false, error: error.message });
    }

    return res.json({ ok: true, sample: data });
  } catch (e) {
    return res.status(500).json({ ok: false, error: String(e) });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
