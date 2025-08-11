"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, X } from "lucide-react"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

interface SearchFormProps {
  onSearch?: (query: string, filters: SearchFilters) => void
  className?: string
}

interface SearchFilters {
  category?: string
  tags?: string[]
  dateRange?: string
  sortBy?: string
}

const categories = [
  { id: 'harmonyos', name: 'HarmonyOS' },
  { id: 'database', name: '数据库' },
  { id: 'cloud', name: '云计算' },
  { id: 'ai', name: '人工智能' },
  { id: 'frontend', name: '前端开发' },
  { id: 'backend', name: '后端开发' }
]

const popularTags = [
  'llm', 'ai agent', 'deepseek', '大模型', 'rag', '智能体',
  'ai', '人工智能', 'javascript', 'typescript', 'react', 'vue'
]

const sortOptions = [
  { value: 'newest', label: '最新发布' },
  { value: 'popular', label: '最受欢迎' },
  { value: 'views', label: '浏览量' },
  { value: 'comments', label: '评论数' }
]

export function SearchForm({ onSearch, className }: SearchFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [filters, setFilters] = useState<SearchFilters>({
    category: searchParams.get('category') || '',
    tags: searchParams.get('tags')?.split(',').filter(Boolean) || [],
    dateRange: searchParams.get('date') || '',
    sortBy: searchParams.get('sort') || 'newest'
  })
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query, filters)
    } else {
      // 构建搜索URL
      const params = new URLSearchParams()
      if (query) params.set('q', query)
      if (filters.category) params.set('category', filters.category)
      if (filters.tags && filters.tags.length > 0) params.set('tags', filters.tags.join(','))
      if (filters.dateRange) params.set('date', filters.dateRange)
      if (filters.sortBy) params.set('sort', filters.sortBy)

      router.push(`/search?${params.toString()}`)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const addTag = (tag: string) => {
    if (!filters.tags?.includes(tag)) {
      setFilters(prev => ({
        ...prev,
        tags: [...(prev.tags || []), tag]
      }))
    }
  }

  const removeTag = (tag: string) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags?.filter(t => t !== tag) || []
    }))
  }

  const clearFilters = () => {
    setFilters({
      category: '',
      tags: [],
      dateRange: '',
      sortBy: 'newest'
    })
  }

  const hasFilters = filters.category || filters.tags?.length || filters.dateRange

  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 ${className}`}>
      {/* Main search input */}
      <div className="flex space-x-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="搜索技术文章、课程、直播..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-10"
          />
        </div>
        <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700">
          搜索
        </Button>
        <Button
          variant="outline"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="px-3"
        >
          高级
        </Button>
      </div>

      {/* Advanced filters */}
      {showAdvanced && (
        <div className="border-t pt-4 space-y-4">
          {/* Category filter */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">分类</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilters(prev => ({ ...prev, category: '' }))}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  !filters.category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                全部
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setFilters(prev => ({
                    ...prev,
                    category: category.id === filters.category ? '' : category.id
                  }))}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    filters.category === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Tags filter */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              标签 {filters.tags && filters.tags.length > 0 && (
                <span className="text-blue-600">({filters.tags.length})</span>
              )}
            </label>
            {filters.tags && filters.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {filters.tags.map((tag) => (
                  <Badge key={tag} variant="default" className="flex items-center space-x-1">
                    <span>#{tag}</span>
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-red-300"
                      onClick={() => removeTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => addTag(tag)}
                  disabled={filters.tags?.includes(tag)}
                  className={`px-2 py-1 text-xs rounded border transition-colors ${
                    filters.tags?.includes(tag)
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'border-gray-300 text-gray-600 hover:border-blue-300 hover:text-blue-600'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>

          {/* Date range filter */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">时间范围</label>
            <div className="flex flex-wrap gap-2">
              {[
                { value: '', label: '全部时间' },
                { value: 'today', label: '今天' },
                { value: 'week', label: '本周' },
                { value: 'month', label: '本月' },
                { value: 'year', label: '今年' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFilters(prev => ({ ...prev, dateRange: option.value }))}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    filters.dateRange === option.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sort options */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">排序方式</label>
            <div className="flex flex-wrap gap-2">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFilters(prev => ({ ...prev, sortBy: option.value }))}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    filters.sortBy === option.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Clear filters */}
          {hasFilters && (
            <div className="flex justify-end">
              <Button variant="outline" size="sm" onClick={clearFilters}>
                清除筛选条件
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
