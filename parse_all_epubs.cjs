const fs = require('fs');
const path = require('path');

const cleanText = (html) => {
    if (!html) return "";
    let text = html
        .replace(/<sup[^>]*>([\s\S]*?)<\/sup>/gi, '') // Discard footnotes first
        .replace(/<sub[^>]*>([\s\S]*?)<\/sub>/gi, '')
        .replace(/<a[^>]*>([\s\S]*?)<\/a>/gi, '$1') // Discard anchor tags but keep text
        .replace(/<span[^>]*>/gi, '')
        .replace(/<\/span>/gi, '')
        .replace(/<br\s*\/?>/gi, ' ');
    
    // Strip other block elements except basic inline styling
    text = text.replace(/<(?!i|em|b|strong|\/i|\/em|\/b|\/strong)[^>]+>/gi, '');
    text = text.replace(/\s+/g, ' ').trim();
    return text;
};

// Extracts paragraphs from HTML segment
const getParagraphs = (html, isZh) => {
    const paragraphs = [];
    const regex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
    let match;
    while ((match = regex.exec(html)) !== null) {
        const text = cleanText(match[1]);
        if (text.length > 0) {
            if (isZh && (text === "无人生还" || text.includes("sign.png"))) continue;
            if (!isZh && (text.includes("href=") || text === "One" || text === "Two")) continue;
            paragraphs.push(text);
        }
    }
    return paragraphs;
};

// Merge consecutive short paragraphs and filter out notes/separators/images
const mergeShortParagraphs = (paragraphs, zhMin = 40, enMin = 40) => {
    const merged = [];
    let buffer = null;

    paragraphs.forEach(p => {
        const zh = p.zh || '';
        const en = p.en || '';
        const zhLen = zh.length;
        const enLen = en.length;
        const isShort = zhLen < zhMin || enLen < enMin;

        // Filter out notes, separators, and image-only paragraphs
        const isNote = zh.startsWith('[') || zh.startsWith('注释') || zh.startsWith('注：') ||
                       zh.trim() === '***' || zh.trim() === '—' || zh.trim() === '* * *' ||
                       zh.startsWith('<img') || en.startsWith('<img');

        if (isNote) return;

        if (isShort) {
            if (!buffer) {
                buffer = { zh, en };
            } else {
                buffer.zh = buffer.zh + (buffer.zh ? ' ' : '') + zh;
                buffer.en = buffer.en + (buffer.en ? ' ' : '') + en;
            }
        } else {
            if (buffer) {
                buffer.zh = buffer.zh + (buffer.zh ? ' ' : '') + zh;
                buffer.en = buffer.en + (buffer.en ? ' ' : '') + en;
                merged.push({ zh: buffer.zh.trim(), en: buffer.en.trim() });
                buffer = null;
            } else {
                merged.push({ zh: zh.trim(), en: en.trim() });
            }
        }
    });

    if (buffer) {
        merged.push({ zh: buffer.zh.trim(), en: buffer.en.trim() });
    }

    return merged;
};

// Group merged paragraphs into pages (each page ~300-500 Chinese characters)
const groupIntoPages = (paragraphs, minChars = 200, maxChars = 400) => {
    const pages = [];
    let current = { zh: '', en: '' };
    let zhLen = 0;

    paragraphs.forEach(p => {
        const pZh = p.zh || '';
        const pEn = p.en || '';
        const pZhLen = pZh.length;

        if (zhLen > 0 && zhLen + pZhLen > maxChars) {
            pages.push({ zh: current.zh.trim(), en: current.en.trim() });
            current = { zh: pZh, en: pEn };
            zhLen = pZhLen;
        } else {
            if (current.zh) {
                current.zh += '\n\n' + pZh;
                current.en += '\n\n' + pEn;
            } else {
                current = { zh: pZh, en: pEn };
            }
            zhLen += pZhLen;
        }
    });

    if (current.zh) {
        pages.push({ zh: current.zh.trim(), en: current.en.trim() });
    }

    return pages;
};

// Generate mapping from original paragraph index to page index for a chapter
const getParaToPageMap = (paragraphs, minChars = 200, maxChars = 400) => {
    const map = {};
    let currentPageIdx = 0;
    let currentZhLen = 0;

    paragraphs.forEach((p, paraIdx) => {
        const pZh = p.zh || '';
        const pZhLen = pZh.length;

        if (currentZhLen > 0 && currentZhLen + pZhLen > maxChars) {
            currentPageIdx++;
            currentZhLen = pZhLen;
        } else {
            currentZhLen += pZhLen;
        }

        map[paraIdx] = currentPageIdx;
    });

    return map;
};

// --- BOOK 1: And Then There Were None (attwn) ---
const parseAttwn = () => {
    const chMap = [
        { id: 1, titleEN: "Chapter One", titleZH: "第一章", en: "007_chapter01.html", zh: "chapter4.xhtml" },
        { id: 2, titleEN: "Chapter Two", titleZH: "第二章", en: "008_chapter02.html", zh: "chapter5.xhtml" },
        { id: 3, titleEN: "Chapter Three", titleZH: "第三章", en: "009_chapter03.html", zh: "chapter6.xhtml" },
        { id: 4, titleEN: "Chapter Four", titleZH: "第四章", en: "010_chapter04.html", zh: "chapter7.xhtml" },
        { id: 5, titleEN: "Chapter Five", titleZH: "第五章", en: "011_chapter05.html", zh: "chapter8.xhtml" },
        { id: 6, titleEN: "Chapter Six", titleZH: "第六章", en: "012_chapter06.html", zh: "chapter9.xhtml" },
        { id: 7, titleEN: "Chapter Seven", titleZH: "第七章", en: "013_chapter07.html", zh: "chapter10.xhtml" },
        { id: 8, titleEN: "Chapter Eight", titleZH: "第八章", en: "014_chapter08.html", zh: "chapter11.xhtml" },
        { id: 9, titleEN: "Chapter Nine", titleZH: "第九章", en: "015_chapter09.html", zh: "chapter12.xhtml" },
        { id: 10, titleEN: "Chapter Ten", titleZH: "第十章", en: "016_chapter10.html", zh: "chapter13.xhtml" },
        { id: 11, titleEN: "Chapter Eleven", titleZH: "第十一章", en: "017_chapter11.html", zh: "chapter14.xhtml" },
        { id: 12, titleEN: "Chapter Twelve", titleZH: "第十二章", en: "018_chapter12.html", zh: "chapter15.xhtml" },
        { id: 13, titleEN: "Chapter Thirteen", titleZH: "第十三章", en: "019_chapter13.html", zh: "chapter16.xhtml" },
        { id: 14, titleEN: "Chapter Fourteen", titleZH: "第十四章", en: "020_chapter14.html", zh: "chapter17.xhtml" },
        { id: 15, titleEN: "Chapter Fifteen", titleZH: "第十五章", en: "021_chapter15.html", zh: "chapter18.xhtml" },
        { id: 16, titleEN: "Chapter Sixteen", titleZH: "第十六章", en: "022_chapter16.html", zh: "chapter19.xhtml" },
        { id: 17, titleEN: "Epilogue", titleZH: "尾声", en: "023_epiloguepage.html", zh: "chapter20.xhtml" },
        { id: 18, titleEN: "Manuscript", titleZH: "手稿", en: "024_backmatterpage01.html", zh: "chapter21.xhtml" }
    ];

    const chaptersData = [];
    chMap.forEach((ch) => {
        const enPath = path.join(__dirname, 'temp_extracted', 'en', 'OEBPS', ch.en);
        const zhPath = path.join(__dirname, 'temp_extracted', 'zh', 'OEBPS', 'Text', ch.zh);
        const enHtml = fs.readFileSync(enPath, 'utf8');
        const zhHtml = fs.readFileSync(zhPath, 'utf8');

        let alignedParagraphs = [];

        if (ch.id <= 16) {
            const enSections = enHtml.split(/<p class="chapterHeadA"[^>]*>([\s\S]*?)<\/p>/i);
            const enSectionBlocks = [];
            for (let i = 2; i < enSections.length; i += 2) {
                enSectionBlocks.push(enSections[i]);
            }
            if (enSectionBlocks.length === 0) enSectionBlocks.push(enHtml);

            const zhSections = zhHtml.split(/<p class="subtitle1"[^>]*>([\s\S]*?)<\/p>/i);
            const zhSectionBlocks = [];
            for (let i = 2; i < zhSections.length; i += 2) {
                zhSectionBlocks.push(zhSections[i]);
            }
            if (zhSectionBlocks.length === 0) zhSectionBlocks.push(zhHtml);

            const numSections = Math.max(enSectionBlocks.length, zhSectionBlocks.length);
            for (let s = 0; s < numSections; s++) {
                const enBlock = enSectionBlocks[s] || "";
                const zhBlock = zhSectionBlocks[s] || "";

                const enParas = getParagraphs(enBlock, false);
                const zhParas = getParagraphs(zhBlock, true);

                const numParas = Math.max(enParas.length, zhParas.length);
                for (let p = 0; p < numParas; p++) {
                    alignedParagraphs.push({
                        en: enParas[p] || "",
                        zh: zhParas[p] || ""
                    });
                }
            }
        } else {
            const enParas = getParagraphs(enHtml, false);
            const zhParas = getParagraphs(zhHtml, true);
            const numParas = Math.max(enParas.length, zhParas.length);
            for (let p = 0; p < numParas; p++) {
                alignedParagraphs.push({
                    en: enParas[p] || "",
                    zh: zhParas[p] || ""
                });
            }
        }
        
        const mergedParagraphs = mergeShortParagraphs(alignedParagraphs);
        const pages = groupIntoPages(mergedParagraphs);
        
        chaptersData.push({
            id: ch.id,
            titleEN: ch.titleEN,
            titleZH: ch.titleZH,
            pages: pages
        });
    });
    console.log(`Parsed 'And Then There Were None' (${chaptersData.length} chapters)`);
    return { chapters: chaptersData };
};

// --- BOOK 2: The Word Is Murder (word_is_murder) ---
const parseWordIsMurder = () => {
    const chaptersData = [];
    for (let i = 1; i <= 24; i++) {
        const enPath = path.join(__dirname, 'temp_extracted', 'word_is_murder_en', 'OPS', 'xhtml', `chapter${String(i).padStart(3, '0')}.xhtml`);
        const zhPath = path.join(__dirname, 'temp_extracted', 'word_is_murder_zh', 'text', `part${String(i + 3).padStart(4, '0')}.html`);

        const enHtml = fs.readFileSync(enPath, 'utf8');
        const zhHtml = fs.readFileSync(zhPath, 'utf8');

        const enParas = getParagraphs(enHtml, false);
        const zhParas = getParagraphs(zhHtml, true);

        const alignedParagraphs = [];
        const numParas = Math.max(enParas.length, zhParas.length);
        for (let p = 0; p < numParas; p++) {
            alignedParagraphs.push({
                en: enParas[p] || "",
                zh: zhParas[p] || ""
            });
        }

        const mergedParagraphs = mergeShortParagraphs(alignedParagraphs);
        const pages = groupIntoPages(mergedParagraphs);

        chaptersData.push({
            id: i,
            titleEN: `Chapter ${i}`,
            titleZH: `第${i}章`,
            pages: pages
        });
    }
    console.log(`Parsed 'The Word Is Murder' (${chaptersData.length} chapters)`);
    return { chapters: chaptersData };
};

// --- BOOK 3: The Sentence is Death (sentence_is_death) ---
const parseSentenceIsDeath = () => {
    const chaptersData = [];
    for (let i = 1; i <= 24; i++) {
        const enPath = path.join(__dirname, 'temp_extracted', 'sentence_is_death_en', 'text', `part${String(i + 5).padStart(4, '0')}.html`);
        const zhPath = path.join(__dirname, 'temp_extracted', 'sentence_is_death_zh', 'text', `part${String(i + 4).padStart(4, '0')}.html`);

        const enHtml = fs.readFileSync(enPath, 'utf8');
        const zhHtml = fs.readFileSync(zhPath, 'utf8');

        const enParas = getParagraphs(enHtml, false);
        const zhParas = getParagraphs(zhHtml, true);

        const alignedParagraphs = [];
        const numParas = Math.max(enParas.length, zhParas.length);
        for (let p = 0; p < numParas; p++) {
            alignedParagraphs.push({
                en: enParas[p] || "",
                zh: zhParas[p] || ""
            });
        }

        const mergedParagraphs = mergeShortParagraphs(alignedParagraphs);
        const pages = groupIntoPages(mergedParagraphs);

        chaptersData.push({
            id: i,
            titleEN: `Chapter ${i}`,
            titleZH: `第${i}章`,
            pages: pages
        });
    }
    console.log(`Parsed 'The Sentence is Death' (${chaptersData.length} chapters)`);
    return { chapters: chaptersData };
};

// --- MAIN COMPILE ---
const compileAll = () => {
    const novelData = {};
    novelData["attwn"] = parseAttwn();
    novelData["word_is_murder"] = parseWordIsMurder();
    novelData["sentence_is_death"] = parseSentenceIsDeath();

    const outputDir = path.join(__dirname, 'src', 'data');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    const outputPath = path.join(outputDir, 'novel_data.json');
    fs.writeFileSync(outputPath, JSON.stringify(novelData, null, 2), 'utf8');
    console.log(`\nSuccess! Compiled all 3 aligned books to ${outputPath}`);
};

compileAll();
