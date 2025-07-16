import { MetadataRoute } from 'next';
import { baseUrl } from '@/@utils/metadata';

const isProd = process.env.NODE_ENV === 'production';

/**
 * Generates robots.txt content using Next.js Metadata API
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots(): MetadataRoute.Robots {
  if (!isProd) {
    // Prevent all crawling in dev/staging
    return {
      rules: [
        {
          userAgent: '*',
          disallow: '/',
        },
      ],
    };
  }

  return {
    // Rules for different user agents
    rules: [
      // Default rules for all bots
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',          // Protect API routes
          '/private/',      // Protect private routes
          '/_next/',        // Protect Next.js system files
          '/static/_next/', // Protect static Next.js files
        ],
      },

      // OpenAI Bots
      {
        userAgent: 'GPTBot',        // Model training crawler
        allow: '/',
      },
      {
        userAgent: 'ChatGPT-User',  // User-triggered requests
        allow: '/',
      },
      {
        userAgent: 'OAI-SearchBot', // Search results
        allow: '/',
      },

      // Anthropic (Claude) Bots
      {
        userAgent: 'anthropic-ai',  // Model training
        allow: '/',
      },
      {
        userAgent: 'ClaudeBot',     // Real-time fetching
        allow: '/',
      },
      {
        userAgent: 'claude-web',    // Web crawler
        allow: '/',
      },

      // Google AI Bots
      {
        userAgent: 'Google-Extended', // Gemini and AI features
        allow: '/',
      },

      // Microsoft Bots
      {
        userAgent: 'BingBot',        // Bing/Copilot
        allow: '/',
      },

      // Perplexity Bots
      {
        userAgent: 'PerplexityBot',  // Search indexing
        allow: '/',
      },
      {
        userAgent: 'Perplexity-User', // User-triggered
        allow: '/',
      },

      // Other Major AI Bots
      {
        userAgent: 'Amazonbot',      // Alexa/FireOS
        allow: '/',
      },
      {
        userAgent: 'Applebot',       // Siri/Spotlight
        allow: '/',
      },
      {
        userAgent: 'Applebot-Extended', // Apple AI
        allow: '/',
      },
      {
        userAgent: 'FacebookBot',    // Meta
        allow: '/',
      },
      {
        userAgent: 'meta-externalagent', // Meta AI
        allow: '/',
      },
      {
        userAgent: 'Bytespider',     // ByteDance/TikTok
        allow: '/',
      },
      {
        userAgent: 'DuckAssistBot',  // DuckDuckGo AI
        allow: '/',
      },
      {
        userAgent: 'cohere-ai',      // Cohere
        allow: '/',
      },
      {
        userAgent: 'YouBot',         // You.com
        allow: '/',
      },
      {
        userAgent: 'MistralAI-User', // Mistral AI
        allow: '/',
      },

      // Research & Open Source
      {
        userAgent: 'CCBot',          // Common Crawl
        allow: '/',
      },
      {
        userAgent: 'AI2Bot',         // Allen Institute
        allow: '/',
      },
    ],
    
    // Point to sitemap
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
