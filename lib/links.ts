export const SITE_URL = "https://example.com";

export const affiliateLinks = {
  "bizops-pm": "https://example.com/affiliate/pm-career",
  "bizops-bizops": "https://example.com/affiliate/bizops",
  "bizops-resume": "https://example.com/affiliate/resume",
  "ai-chatgpt": "https://example.com/affiliate/generative-ai",
  "ai-nocode": "https://example.com/affiliate/nocode",
  "ai-dx": "https://example.com/affiliate/dx",
  "reskill-it": "https://example.com/affiliate/it-basics",
  "reskill-code": "https://example.com/affiliate/programming",
  "reskill-cert": "https://example.com/affiliate/cert",
} as const;

export type AffiliateLinkId = keyof typeof affiliateLinks;
