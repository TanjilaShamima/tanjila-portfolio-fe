import { MetadataRoute } from 'next';
import { baseUrl } from '@/@utils/metadata';

/**
 * Generates the sitemap for the application.
 *
 * @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap}
 *
 * @property {string} url - The absolute URL of the page.
 * @property {Date} lastModified - The date when the page was last modified.
 * @property {'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'} changeFrequency - How frequently the page is likely to change.
 * @property {number} priority - The priority of this URL relative to other URLs on your site (range: 0.0 to 1.0).
 *
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'yearly', 
      priority: 1
    },
    // Add more URLs as needed
  ];
}
