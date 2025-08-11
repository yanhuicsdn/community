"use client"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ArticleList } from "@/components/ArticleList"
import { Sidebar } from "@/components/Sidebar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Grid, List, Calendar, TrendingUp, Eye, MessageCircle } from "lucide-react"
import { useState, useEffect } from "react"
import { mockArticles } from "@/lib/directus"
import { notFound } from "next/navigation"
import Link from "next/link"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

// Mock categories data
const categories = {
  'harmonyos': {
    id: 'harmonyos',
    name: 'HarmonyOS',
    slug: 'harmonyos',
    description: 'AI Agent 开发相关技术文章、教程和最佳实践',
    color: '#FF6B35',
    articlesCount: 156,
    followersCount: 12300
  },
  'database': {
    id: 'database',
    name: '数据库',
    slug: 'database',
    description: '数据库技术、优化、最佳实践和故障排除',
    color: '#4ECDC4',
    articlesCount: 89,
    followersCount: 8900
  },
  'cloud': {
    id: 'cloud',
    name: '云计算',
    slug: 'cloud',
    description: '云原生技术、微服务架构和云平台最佳实践',
    color: '#45B7D1',
    articlesCount: 234,
    followersCount: 15600
  }
}

const sortOptions = [
  { value: 'newest', label: '最新发布', icon: Calendar },
  { value: 'popular', label: '最受欢迎', icon: TrendingUp },
  { value: 'views', label: '浏览量', icon: Eye },
  { value: 'comments', label: '评论数', icon: MessageCircle }
]

export default function CategoryPage({ params }: CategoryPageProps) {
  const [articles, setArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState('newest')
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')

  const category = categories[params.slug as keyof typeof categories]

  if (!category) {
    notFound()
  }

  useEffect(() => {
    loadArticles()
  }, [params.slug, sortBy])

  const loadArticles = async () => {
    setLoading(true)
    try {
      // 在实际应用中，这里会调用 DirectusAPI.getArticles(20, 0, params.slug)
      let filteredArticles = mockArticles.filter(article => {
        const articleCategory = typeof article.category === 'object' ? article.category.slug : article.category
        return articleCategory === params.slug
      })

      // 排序
      filteredArticles.sort((a, b) => {
        switch (sortBy) {
          case 'popular':
            return b.likes - a.likes
          case 'views':
            return b.views - a.views
          case 'comments':
            return b.comments_count - a.comments_count
          case 'newest':
          default:
            return new Date(b.date_published || b.date_created).getTime() -
                   new Date(a.date_published || a.date_created).getTime()
        }
      })

      setArticles(filteredArticles)
    } catch (error) {
      console.error('Error loading articles:', error)
      setArticles([])
    } finally {
      setLoading(false)
    }
  }

  // 转换数据格式
  const transformedArticles = articles.map(article => {
    const user = typeof article.user_created === 'object' ? article.user_created : null
    return {
      ...article,
      author: {
        name: user ? `${user.first_name} ${user.last_name}` : 'Unknown Author',
        avatar: user?.avatar
      },
      category: typeof article.category === 'object' ? article.category.name : category.name,
      tags: article.tags?.map((tag: any) => typeof tag === 'object' ? tag.name : tag) || [],
      published_at: article.date_published || article.date_created,
      comments: article.comments_count
    }
  })

  const relatedCategories = Object.values(categories).filter(cat => cat.slug !== params.slug)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-blue-600">首页</Link>
          <span className="mx-2">/</span>
          <Link href="/categories" className="hover:text-blue-600">分类</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{category.name}</span>
        </nav>

        {/* Category Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-4">
                <div
                  className="w-16 h-16 rounded-lg flex items-center justify-center text-white text-2xl font-bold"
                  style={{ backgroundColor: category.color }}
                >
                  {category.name[0]}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.name}</h1>
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <span>{category.articlesCount} 篇文章</span>
                    <span>{category.followersCount.toLocaleString()} 关注者</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">
                {category.description}
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline">关注分类</Button>
              <Button>订阅更新</Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Filters and controls */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {category.name}相关文章
                  </h2>
                  {loading ? (
                    <span className="text-sm text-gray-500">加载中...</span>
                  ) : (
                    <span className="text-sm text-gray-500">
                      共 {articles.length} 篇文章
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-4">
                  {/* Sort selector */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {sortOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center space-x-2">
                            <option.icon className="w-4 h-4" />
                            <span>{option.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* View mode toggle */}
                  <div className="flex items-center border rounded-lg">
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className="rounded-r-none"
                    >
                      <List className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className="rounded-l-none"
                    >
                      <Grid className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Sub-categories or tags */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">
                  全部
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">
                  基础教程
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">
                  进阶技巧
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">
                  最佳实践
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">
                  案例分析
                </Badge>
              </div>
            </div>

            {/* Articles list */}
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-500">正在加载文章...</p>
                </div>
              </div>
            ) : articles.length > 0 ? (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : ''}>
                <ArticleList articles={transformedArticles} />
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">暂无文章</h3>
                <p className="text-gray-500 mb-6">
                  该分类下还没有文章，期待您的分享！
                </p>
                <Button>发布文章</Button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Related categories */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">相关分类</h3>
              <div className="space-y-3">
                {relatedCategories.map((relatedCategory) => (
                  <Link
                    key={relatedCategory.slug}
                    href={`/category/${relatedCategory.slug}`}
                    className="block group"
                  >
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                        style={{ backgroundColor: relatedCategory.color }}
                      >
                        {relatedCategory.name[0]}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                          {relatedCategory.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {relatedCategory.articlesCount} 篇文章
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Category stats */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">分类统计</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">本周新增</span>
                  <span className="font-semibold text-green-600">+12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">本月热门</span>
                  <span className="font-semibold text-blue-600">28</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">总浏览量</span>
                  <span className="font-semibold text-gray-900">1.2M</span>
                </div>
              </div>
            </div>

            <Sidebar />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
