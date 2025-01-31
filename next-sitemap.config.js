/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.illacloud.com',
  generateRobotsTxt: true,
  // optional
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://www.illacloud.com/docs/about-illa.xml',
      'https://www.illacloud.com/docs/github.xml',
    ],
  },
}
