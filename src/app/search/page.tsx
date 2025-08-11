"use client"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { SearchForm } from "@/components/SearchForm"
import { ArticleList } from "@/components/ArticleList"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Grid, List } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { mockArticles, DirectusAPI } from "@/lib/directus"

interface SearchFilters {
  category?: string
  tags?: string[]
  dateRange?: string
  sortBy?: string
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')
  const [activeTab, setActiveTab] = useState('articles')

  const query = searchParams.get('q') || ''
  const category = searchParams.get('category') || ''
  const tags = searchParams.get('tags')?.split(',').filter(Boolean) || []
  const dateRange = searchParams.get('date') || ''
  const sortBy = searchParams.get('sort') || 'newest'

  useEffect(() => {
    performSearch()
  }, [searchParams])

  const performSearch = async () => {
    setLoading(true)
    try {
      // 在实际应用中，这里会调用 DirectusAPI.searchContent(query)
      // 现在使用模拟数据进行搜索
      let filteredResults = mockArticles

      // 文本搜索
      if (query) {
        filteredResults = filteredResults.filter(article =>
          article.title.toLowerCase().includes(query.toLowerCase()) ||
          article.excerpt?.toLowerCase().includes(query.toLowerCase())
        )
      }

      // 分类筛选
      if (category) {
        filteredResults = filteredResults.filter(article => {
          const articleCategory = typeof article.category === 'object' ? article.category.slug : article.category
          return articleCategory === category
        })
      }

      // 标签筛选
      if (tags.length > 0) {
        filteredResults = filteredResults.filter(article =>
          article.tags?.some(tag => {
            const tagName = typeof tag === 'object' ? tag.name : tag
            return tags.includes(tagName)
          })
        )
      }

      // 排序
      filteredResults.sort((a, b) => {
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

      setResults(filteredResults)
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (newQuery: string, filters: SearchFilters) => {
    // 这个函数由SearchForm组件调用
    // URL参数会通过router.push更新，触发useEffect重新搜索
  }

  // 转换数据格式以匹配ArticleList组件
  const transformedResults = results.map(article => {
    const user = typeof article.user_created === 'object' ? article.user_created : null
    return {
      ...article,
      author: {
        name: user ? `${user.first_name} ${user.last_name}` : 'Unknown Author',
        avatar: user?.avatar
      },
      category: typeof article.category === 'object' ? article.category.name : 'Default',
      tags: article.tags?.map((tag: any) => typeof tag === 'object' ? tag.name : tag) || [],
      published_at: article.date_published || article.date_created,
      comments: article.comments_count
    }
  })

  const getActiveFiltersCount = () => {
    let count = 0
    if (category) count++
    if (tags.length > 0) count += tags.length
    if (dateRange) count++
    return count
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search form */}
        <SearchForm onSearch={handleSearch} className="mb-8" />

        {/* Search summary */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">
              {query ? `"${query}" 的搜索结果` : '搜索结果'}
            </h1>
            {loading ? (
              <span className="text-gray-500">搜索中...</span>
            ) : (
              <span className="text-gray-500">
                找到 {results.length} 个结果
              </span>
            )}
          </div>

          <div className="flex items-center space-x-4">
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

        {/* Active filters */}
        {(category || tags.length > 0 || dateRange) && (
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-3">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                当前筛选条件 ({getActiveFiltersCount()})
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {category && (
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <span>分类: {category}</span>
                </Badge>
              )}
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center space-x-1">
                  <span>#{tag}</span>
                </Badge>
              ))}
              {dateRange && (
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <span>时间: {dateRange}</span>
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Search results tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="articles">
              文章 ({results.length})
            </TabsTrigger>
            <TabsTrigger value="courses">
              课程 (0)
            </TabsTrigger>
            <TabsTrigger value="videos">
              视频 (0)
            </TabsTrigger>
            <TabsTrigger value="docs">
              文档 (0)
            </TabsTrigger>
          </TabsList>

          <TabsContent value="articles" className="mt-6">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-500">正在搜索...</p>
                </div>
              </div>
            ) : results.length > 0 ? (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : ''}>
                <ArticleList articles={transformedResults} />
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">未找到相关内容</h3>
                <p className="text-gray-500 mb-6">
                  {query ? `没有找到包含 "${query}" 的内容` : '请尝试调整搜索条件'}
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• 检查搜索关键词是否正确</p>
                  <p>• 尝试使用更广泛的搜索词</p>
                  <p>• 减少筛选条件</p>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="courses" className="mt-6">
            <div className="text-center py-12">
              <p className="text-gray-500">课程搜索功能即将上线...</p>
            </div>
          </TabsContent>

          <TabsContent value="videos" className="mt-6">
            <div className="text-center py-12">
              <p className="text-gray-500">视频搜索功能即将上线...</p>
            </div>
          </TabsContent>

          <TabsContent value="docs" className="mt-6">
            <div className="text-center py-12">
              <p className="text-gray-500">文档搜索功能即将上线...</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  )
}
