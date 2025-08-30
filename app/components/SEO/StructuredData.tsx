'use client'

interface StructuredDataProps {
  type: 'organization' | 'website' | 'article' | 'breadcrumb'
  data: any
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const generateStructuredData = () => {
    switch (type) {
      case 'organization':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "源境团队",
          "alternateName": "Yuanjing Team",
          "url": "",
          "logo": "http://8.136.112.63/images/logo.png",
          "description": "源境软件工作室成立于2018年，专注于软件开发与技术创新的专业学生团队。",
          "foundingDate": "2018",
          "founders": [
            {
              "@type": "Person",
              "name": "源境团队创始人"
            }
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+86-152-2596-8963",
            "contactType": "customer service",
            "email": "yuanjingteam@163.com"
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "金穗大道789号平原体育中心",
            "addressLocality": "新乡市",
            "addressRegion": "河南省",
            "postalCode": "453000",
            "addressCountry": "CN"
          },
          "sameAs": [
            "https://github.com/yuanjingteam",
            "https://weibo.com/yuanjingteam"
          ],
          ...data
        }
      
      case 'website':
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "源境团队",
          "alternateName": "Yuanjing Team", 
          "url": "http://8.136.112.63",
          "description": "源境软件工作室专注于软件开发与技术创新",
          "publisher": {
            "@type": "Organization",
            "name": "源境团队"
          },
          "inLanguage": ["zh-CN", "en-US"],
          ...data
        }
      
      case 'article':
        return {
          "@context": "https://schema.org",
          "@type": "Article",
          "publisher": {
            "@type": "Organization",
            "name": "源境团队",
            "logo": "http://8.136.112.63//images/logo.png"
          },
          ...data
        }
      
      case 'breadcrumb':
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": data.map((item: any, index: number) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
          }))
        }
      
      default:
        return data
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(generateStructuredData())
      }}
    />
  )
}
