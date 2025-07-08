import { toolsData, pagesData } from "./seo-data";

export interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export function generateSitemap(): string {
  const baseUrl = "https://pdfo.io";
  const lastmod = new Date().toISOString().split('T')[0];
  
  const entries: SitemapEntry[] = [
    // Homepage
    {
      url: baseUrl,
      lastmod,
      changefreq: 'weekly',
      priority: 1.0
    },
    
    // Static pages
    ...Object.values(pagesData).map(page => ({
      url: `${baseUrl}${page.path}`,
      lastmod,
      changefreq: 'monthly' as const,
      priority: page.path === '/' ? 1.0 : 0.6
    })),
    
    // Tool pages
    ...Object.values(toolsData).map(tool => ({
      url: `${baseUrl}${tool.path}`,
      lastmod,
      changefreq: 'weekly' as const,
      priority: 0.8
    }))
  ];

  // Remove duplicates (in case home page is included twice)
  const uniqueEntries = entries.filter((entry, index, self) => 
    index === self.findIndex(e => e.url === entry.url)
  );

  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n';
  const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  const urlsetClose = '</urlset>';

  const urlEntries = uniqueEntries.map(entry => 
    `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
  ).join('\n');

  return xmlHeader + urlsetOpen + urlEntries + '\n' + urlsetClose;
}

export function generateRobotsTxt(): string {
  return `User-agent: *
Allow: /
Disallow: /pdfo_pravaah_aite/
Disallow: /uploads/
Disallow: /outputs/

# Sitemap
Sitemap: https://pdfo.io/sitemap.xml

# Crawl delay
Crawl-delay: 1

# Specific bots
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /`;
}