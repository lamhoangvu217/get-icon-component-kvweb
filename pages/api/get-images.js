import fs from "fs";

export default function handler(req, res) {
  const files = fs.readdirSync("public/outline");
  const svgFiles = files.filter((file) => file.endsWith(".svg"));
  res.status(200).json({ images: svgFiles });
}
