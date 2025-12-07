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
    homeFile: path.join(__dirname, "../src/pages/Home.jsx"),
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
  "date": "Month Day, Year (e.g., December 7, 2025)",
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

function updateFashionBlogPage(articleData) {
    if (!fs.existsSync(CONFIG.fashionBlogFile)) {
        console.warn("⚠️ FashionBlog.jsx not found, skipping update.");
        return;
    }

    let jsxContent = fs.readFileSync(CONFIG.fashionBlogFile, "utf8");

    const slug = toSlug(articleData.title);
    const gradient = `linear-gradient(135deg, ${articleData.gradientStart} 0%, ${articleData.gradientEnd} 100%)`;
    
    // Create new blog card
    const newCard = `
                {/* NEW ARTICLE: ${articleData.title} */}
                <Link to="/blogs/${slug}" className="gallery-item blog-card" style={{ '--card-gradient': '${gradient}' }}>
                    <div className="blog-icon-wrapper">
                        <i className="${articleData.iconClass} blog-icon" style={{ color: '${articleData.iconColor}' }}></i>
                    </div>
                    <div className="blog-text">
                        <h2 style={{ color: '#ffffffff' }}>${articleData.title}</h2>
                        <p style={{ color: '#ffffffff' }}>${articleData.summary}</p>
                    </div>
                </Link>
`;

    // Find the gallery div and insert after the opening tag
    const galleryMatch = jsxContent.match(/(<div className="gallery">)/);
    if (galleryMatch) {
        const insertIndex = galleryMatch.index + galleryMatch[0].length;
        jsxContent = jsxContent.slice(0, insertIndex) + newCard + jsxContent.slice(insertIndex);
        
        fs.writeFileSync(CONFIG.fashionBlogFile, jsxContent, "utf8");
        console.log(`🧩 Updated FashionBlog.jsx with "${articleData.title}"`);
    } else {
        console.warn("⚠️ Could not find gallery div in FashionBlog.jsx");
    }
}

function updateHomePage(articleData) {
    if (!fs.existsSync(CONFIG.homeFile)) {
        console.warn("⚠️ Home.jsx not found, skipping update.");
        return;
    }

    let jsxContent = fs.readFileSync(CONFIG.homeFile, "utf8");

    const slug = toSlug(articleData.title);
    const gradient = `linear-gradient(135deg, ${articleData.gradientStart} 0%, ${articleData.gradientEnd} 100%)`;
    
    // Create featured blog card for home page
    const newCard = `
                    {/* Featured Blog: ${articleData.title} */}
                    <Link
                        to="/blogs/${slug}"
                        className="gallery-item blog-card"
                        style={{ textDecoration: 'none', background: '${gradient}' }}
                    >
                        <div className="blog-icon-wrapper">
                            <i className="${articleData.iconClass} blog-icon" style={{ color: '${articleData.iconColor}' }}></i>
                        </div>
                        <div className="blog-text" style={{ padding: '20px' }}>
                            <h3 style={{ color: '#fff', fontSize: '1.4em', marginBottom: '10px' }}>${articleData.title}</h3>
                            <p style={{ color: '#fff', fontSize: '0.95em' }}>${articleData.summary}</p>
                        </div>
                    </Link>
`;

    // Find the "Latest Fashion Insights" section - more flexible regex
    const insightsGalleryMatch = jsxContent.match(/Latest Fashion Insights[\s\S]{0,200}?<div className="gallery">/);
    if (insightsGalleryMatch) {
        const insertIndex = insightsGalleryMatch.index + insightsGalleryMatch[0].length;
        jsxContent = jsxContent.slice(0, insertIndex) + newCard + jsxContent.slice(insertIndex);
        
        fs.writeFileSync(CONFIG.homeFile, jsxContent, "utf8");
        console.log(`🏠 Updated Home.jsx with featured blog "${articleData.title}"`);
    } else {
        console.warn("⚠️ Could not find Latest Fashion Insights section in Home.jsx - skipping Home page update (article still created successfully)");
    }
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
        
        updateFashionBlogPage(articleData);
        updateHomePage(articleData);

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