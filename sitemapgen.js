import axios from 'axios';
import fs from 'fs/promises';
import { parseStringPromise, Builder } from 'xml2js';

async function checkURL(url) {
  try {
    const response = await axios.get(url);
    return response.status !== 404;
  } catch (error) {
    return false;
  }
}

async function generateSitemap() {
  try {
    // Fetch the existing sitemap.xml
    const response = await axios.get('https://thenextgem.ai/sitemap.xml'); // Replace with your actual sitemap URL
    const xml = response.data;

    // Parse the XML
    const result = await parseStringPromise(xml);

    // Filter out URLs that return 404
    const filteredUrls = [];
    console.log(result.urlset.url)
    for (const entry of result.urlset.url) {
      const url = entry.loc[0];
      const isValid = await checkURL(url);
      if (isValid) {
        filteredUrls.push(entry);
      } else {
        console.log(`Removed URL: ${url}`);
      }
    }

    // Build new sitemap object
    const newSitemap = {
      urlset: {
        $: {
          xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
        },
        url: filteredUrls,
      },
    };

    // Convert JSON back to XML
    const builder = new Builder();
    const xmlContent = builder.buildObject(newSitemap);

    // Write to a new sitemap.xml file
    await fs.writeFile('public/sitemap.xml', xmlContent);

    console.log('New sitemap generated successfully!');
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
}

generateSitemap();
