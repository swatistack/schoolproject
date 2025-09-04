import formidable from "formidable";
import fs from "fs";
import path from "path";
import pool from "../../../lib/db";

export const config = { api: { bodyParser: false } };

const uploadsDir = path.join(process.cwd(), "public", "schoolImages");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

export default async function handler(req, res){
  if (req.method === "GET") {
    try{
      const [rows] = await pool.query(
        "SELECT id, name, address, city, image FROM schools ORDER BY id DESC"
      );
      return res.status(200).json(rows);
    }catch(err){
      console.error(err);
      return res.status(500).json({ message:"DB fetch failed" });
    }
  }

  if (req.method === "POST") {
    try{
      const form = formidable({ multiples:false, keepExtensions:true });
      form.uploadDir = uploadsDir;

      const { fields, files } = await new Promise((resolve, reject)=>{
        form.parse(req, (err, fields, files)=> err ? reject(err) : resolve({fields, files}));
      });

      const { name="", address="", city="", state="", contact="", email_id="" } = fields;
      let imagePath = "";

      if (files.image) {
        const file = Array.isArray(files.image) ? files.image[0] : files.image;
        const ext = path.extname(file.originalFilename || "");
        const safeName = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext || ".jpg"}`;
        const dest = path.join(uploadsDir, safeName);
        // formidable may already place a temp file; move/rename to our filename:
        fs.renameSync(file.filepath, dest);
        imagePath = `/schoolImages/${safeName}`;
      }

      const sql = "INSERT INTO schools (name,address,city,state,contact,image,email_id) VALUES (?,?,?,?,?,?,?)";
      const vals = [name, address, city, state, String(contact||""), imagePath, email_id];
      const [result] = await pool.query(sql, vals);

      return res.status(201).json({ id: result.insertId, image: imagePath, message:"Created" });
    }catch(err){
      console.error(err);
      return res.status(500).json({ message:"Create failed" });
    }
  }

  res.setHeader("Allow", ["GET","POST"]);
  return res.status(405).end("Method Not Allowed");
}
