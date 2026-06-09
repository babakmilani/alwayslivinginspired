// scripts/generate-article.js
import 'dotenv/config';
import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as cheerio from "cheerio";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

// CONFIG
const CONFIG = {
    model: "claude-sonnet-4-20250514",
    maxTokens: 8000,
    categories: [
        "Fashion Trends",
        "Style Guide",
        "Seasonal Fashion",
        "Wardrobe Essentials",
        "Color Theory",
        "Accessories",
        "Footwear",
        "Menswear",
        "Womenswear",
        "Fashion Opinion"
    ],
    blogsDir: path.join(__dirname, "../public/blogs"),
    fashionBlogFile: path.join(__dirname, "../src/pages/FashionBlog.jsx"),
    templateFile: path.join(__dirname, "../public/blogs/4-Mens-Wear-for-Fall.html"),
};

function toSlug(str) {
    return str
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
}

function getExistingArticles() {
    if (!fs.existsSync(CONFIG.blogsDir)) return [];
    return fs
        .readdirSync(CONFIG.blogsDir)
        .filter((f) => f.endsWith(".html"))
        .map((f) => ({
            name: path.basename(f, ".html"),
            file: f,
            title: toTitle(f),
        }));
}

function toTitle(filename) {
    return filename
        .replace(/-/g, " ")
        .replace(".html", "")
        .replace(/\b\w/g, (c) => c.toUpperCase());
}

async function generateArticleData() {
    const existing = getExistingArticles();

    const userPrompt = `Generate a comprehensive fashion blog article on a trending style or fashion topic.

CRITICAL REQUIREMENTS:
1. Avoid these existing topics: ${existing.map((a) => a.name).join(", ")}
2. The article MUST be 1500-2500 words
3. Include 4-6 major sections with <h2> tags
4. Use proper HTML formatting: <p>, <strong>, etc.
5. Focus on practical fashion advice, trends, and styling tips
6. Make it engaging, professional, and inspirational

Return ONLY valid JSON (no markdown code blocks) with these exact fields:
{
  "title": "Complete article title",
  "category": "One of: Fashion Trends, Style Guide, Seasonal Fashion, Wardrobe Essentials, Color Theory, Accessories, Footwear, Menswear, Womenswear, Fashion Opinion",
  "author": "The Style Futurist or The Fashion Editor",
  "summary": "2-3 sentence engaging summary",
  "gradientStart": "#hexcolor",
  "gradientEnd": "#hexcolor",
  "iconClass": "fas fa-icon-name (e.g., fas fa-tshirt, fas fa-palette, fas fa-shoe-prints)",
  "iconColor": "#hexcolor",
  "content": "Full HTML content with proper structure. Must include: <h2> sections with proper styling, <p> paragraphs with good line-height and margins. Use the styling from the template: h2 with font-size: 1.8em, color: #646cff, margin-top: 30px, margin-bottom: 15px"
}`;

    console.log("🤖 Generating fashion article with Claude Sonnet 4...");
    const message = await anthropic.messages.create({
        model: CONFIG.model,
        max_tokens: CONFIG.maxTokens,
        messages: [{ role: "user", content: userPrompt }],
    });

    let jsonText = message.content.map((c) => c.text).join("\n");
    jsonText = jsonText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();

    let articleData;
    try {
        articleData = JSON.parse(jsonText);
    } catch (err) {
        console.error("⚠️ JSON parse failed, attempting cleanup...");
        const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            try {
                articleData = JSON.parse(jsonMatch[0]);
            } catch {
                throw new Error("Failed to parse JSON from Claude response");
            }
        } else {
            throw new Error("No valid JSON found in Claude response");
        }
    }

    // Always stamp the real current date — never trust the model's date field.
    articleData.date = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    articleData.filename = `${toSlug(articleData.title)}.html`;
    return articleData;
}

function createArticleHTML(articleData) {
    const template = fs.readFileSync(CONFIG.templateFile, "utf8");
    const $ = cheerio.load(template);

    // Update meta information
    $("title").text(articleData.title);

    // Update header
    $(".post-header h1").text(articleData.title);
    $(".post-header p").text(`By ${articleData.author} | ${articleData.date}`);

    // Update content
    const introText = `This ${articleData.category.toLowerCase()} guide explores the latest trends and styling strategies. ${articleData.summary}`;

    $(".blog-post-content > p").first().html(`
        <span style="font-size: 1.1em; line-height: 1.7; margin-bottom: 30px;">
            ${introText}
        </span>
    `);

    // Clear existing sections
    $(".blog-post-content section").remove();

    // Add new content sections
    $(".blog-post-content").append(articleData.content);

    return $.html();
}

// Append the new article's metadata to public/blogs/articles.json.
// The Journal page (FashionBlog.jsx) reads this manifest and renders + searches it.
function updateManifest(articleData) {
    const manifestPath = path.join(CONFIG.blogsDir, "articles.json");
    let list = [];
    if (fs.existsSync(manifestPath)) {
        try { list = JSON.parse(fs.readFileSync(manifestPath, "utf8")) || []; }
        catch { list = []; }
    }

    const slug = toSlug(articleData.title);
    const entry = {
        slug,
        title: articleData.title,
        summary: articleData.summary,
        category: articleData.category || "",
        date: articleData.date,
        gradient: `linear-gradient(135deg, ${articleData.gradientStart} 0%, ${articleData.gradientEnd} 100%)`,
        iconClass: articleData.iconClass,
        iconColor: articleData.iconColor,
    };

    // De-dupe by slug, newest first.
    list = list.filter((a) => a.slug !== slug);
    list.unshift(entry);

    fs.writeFileSync(manifestPath, JSON.stringify(list, null, 2), "utf8");
    console.log(`🧩 Updated articles.json — ${list.length} articles`);
}

async function main() {
    try {
        console.log("🚀 Starting fashion article generation...");
        if (!fs.existsSync(CONFIG.blogsDir)) {
            fs.mkdirSync(CONFIG.blogsDir, { recursive: true });
        }

        const articleData = await generateArticleData();
        const html = createArticleHTML(articleData);

        const outputPath = path.join(CONFIG.blogsDir, articleData.filename);
        fs.writeFileSync(outputPath, html, "utf8");

        console.log(`✅ Created new article: ${outputPath}`);

        // NOTE: Home.jsx and FashionBlog.jsx are intentionally NOT edited.
        // Articles surface via the articles.json manifest the Journal page reads.
        updateManifest(articleData);

        // Write report files
        fs.writeFileSync(".article-title.txt", articleData.title, "utf8");
        fs.writeFileSync(
            "article-report.txt",
            `📰 ${articleData.title}\n📂 ${articleData.filename}\n🏷️ ${articleData.category}\n👤 ${articleData.author}\n📅 ${articleData.date}\n\nSummary:\n${articleData.summary}\n`,
            "utf8"
        );

        console.log("\n✨ Article generation complete!");
    } catch (error) {
        console.error("❌ Failed:", error);
        process.exit(1);
    }
}

main();