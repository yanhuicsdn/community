"use client"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Users, FileText, Calendar } from "lucide-react"
import Link from "next/link"

// Mock categories data
const categories = [
  {
    id: 'harmonyos',
    name: 'HarmonyOS',
    slug: 'harmonyos',
    description: 'AI Agent 开发相关技术文章、教程和最佳实践',
    color: '#FF6B35',
    articlesCount: 156,
    followersCount: 12300,
    weeklyGrowth: '+8.5%',
    latestUpdate: '2小时前',
    tags: ['移动开发', 'IoT', '跨平台']
  },
  {
    id: 'database',
    name: '数据库',
    slug: 'database',
    description: '数据库技术、优化、最佳实践和故障排除',
    color: '#4ECDC4',
    articlesCount: 89,
    followersCount: 8900,
    weeklyGrowth: '+5.2%',
    latestUpdate: '6小时前',
    tags: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis']
  },
  {
    id: 'cloud',
    name: '云计算',
    slug: 'cloud',
    description: '云原生技术、微服务架构和云平台最佳实践',
    color: '#45B7D1',
    articlesCount: 234,
    followersCount: 15600,
    weeklyGrowth: '+12.3%',
    latestUpdate: '1小时前',
    tags: ['Kubernetes', 'Docker', '微服务', 'DevOps']
  },
  {
    id: 'ai',
    name: '人工智能',
    slug: 'ai',
    description: 'AI/ML技术、深度学习框架和智能应用开发',
    color: '#9B59B6',
    articlesCount: 178,
    followersCount: 18900,
    weeklyGrowth: '+15.7%',
    latestUpdate: '30分钟前',
    tags: ['机器学习', '深度学习', 'NLP', '计算机视觉']
  },
  {
    id: 'frontend',
    name: '前端开发',
    slug: 'frontend',
    description: '现代前端技术、框架和用户体验设计',
    color: '#F39C12',
    articlesCount: 267,
    followersCount: 22100,
    weeklyGrowth: '+7.8%',
    latestUpdate: '45分钟前',
    tags: ['React', 'Vue', 'Angular', 'TypeScript']
  },
  {
    id: 'backend',
    name: '后端开发',
    slug: 'backend',
    description: '服务端技术、API设计和系统架构',
    color: '#27AE60',
    articlesCount: 198,
    followersCount: 16800,
    weeklyGrowth: '+6.4%',
    latestUpdate: '2小时前',
    tags: ['Node.js', 'Python', 'Java', 'Go']
  },
  {
    id: 'mobile',
    name: '移动开发',
    slug: 'mobile',
    description: 'iOS、Android和跨平台移动应用开发',
    color: '#E74C3C',
    articlesCount: 145,
    followersCount: 13500,
    weeklyGrowth: '+4.9%',
    latestUpdate: '3小时前',
    tags: ['iOS', 'Android', 'Flutter', 'React Native']
  },
  {
    id: 'security',
    name: '网络安全',
    slug: 'security',
    description: '网络安全、数据保护和安全开发实践',
    color: '#34495E',
    articlesCount: 92,
    followersCount: 9600,
    weeklyGrowth: '+11.2%',
    latestUpdate: '4小时前',
    tags: ['网络安全', '密码学', '渗透测试', '安全审计']
  }
]

export default function CategoriesPage() {
  const totalArticles = categories.reduce((sum, cat) => sum + cat.articlesCount, 0)
  const totalFollowers = categories.reduce((sum, cat) => sum + cat.followersCount, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">技术分类</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            探索不同技术领域的精华内容，找到您感兴趣的技术方向，与同行开发者交流学习。
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{categories.length}</div>
              <div className="text-sm text-gray-500">技术分类</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{totalArticles.toLocaleString()}</div>
              <div className="text-sm text-gray-500">技术文章</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{totalFollowers.toLocaleString()}</div>
              <div className="text-sm text-gray-500">关注用户</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">24/7</div>
              <div className="text-sm text-gray-500">持续更新</div>
            </div>
          </div>
        </div>

        {/* Categories grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card key={category.id} className="group hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl font-bold"
                      style={{ backgroundColor: category.color }}
                    >
                      {category.name[0]}
                    </div>
                    <div>
                      <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                        <Link href={`/category/${category.slug}`}>
                          {category.name}
                        </Link>
                      </CardTitle>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>{category.articlesCount} 篇文章</span>
                        <span>•</span>
                        <span>{category.followersCount.toLocaleString()} 关注</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-green-700 bg-green-100">
                    {category.weeklyGrowth}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {category.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {category.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {category.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{category.tags.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 text-center text-sm border-t pt-3">
                  <div>
                    <div className="flex items-center justify-center mb-1">
                      <FileText className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="font-medium text-gray-900">{category.articlesCount}</div>
                    <div className="text-gray-500">文章</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center mb-1">
                      <Users className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="font-medium text-gray-900">{category.followersCount.toLocaleString()}</div>
                    <div className="text-gray-500">关注</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center mb-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="font-medium text-gray-900">{category.latestUpdate}</div>
                    <div className="text-gray-500">最新</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2 mt-4">
                  <Button asChild className="flex-1">
                    <Link href={`/category/${category.slug}`}>
                      浏览文章
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" className="px-3">
                    关注
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">没找到您感兴趣的分类？</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              我们持续收集开发者反馈，不断完善和新增技术分类。
              如果您有建议或想要新的分类，请告诉我们！
            </p>
            <div className="flex items-center justify-center space-x-4">
              <Button variant="outline" className="bg-white text-blue-600 hover:bg-gray-100">
                提交建议
              </Button>
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600">
                发布文章
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
