import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'http://8.136.112.63'
  
  // 主要页面
  const routes = [
    '',
    '/about',
    '/team',
    '/contact',
    '/news', 
    '/partners',
    '/joinus',
  ]
  
  // 为每个路由生成中英文版本
  const sitemapEntries: MetadataRoute.Sitemap = []
  
  // 添加根路径
  sitemapEntries.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1,
  })
  
  // 为每个语言添加路由
  const languages = ['ch', 'en']
  
  languages.forEach(lang => {
    routes.forEach(route => {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '/news' ? 'daily' : 'weekly',
        priority: route === '' ? 1 : route === '/about' ? 0.9 : 0.8,
      })
    })
  })
  
  // 添加动态路由 - 团队项目页面
  const teamProjects = [
    '智能陪护',
    '无人车定位跟踪系统'
  ]
  
  languages.forEach(lang => {
    teamProjects.forEach(project => {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}/team/${encodeURIComponent(project)}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    })
  })
  
  return sitemapEntries
}
