import { createDirectus, rest, readItems, readItem, authentication, AuthenticationData, RestClient, AuthenticationClient } from '@directus/sdk'
import 'isomorphic-fetch'

// Directus schema types
export interface User {
  id: string
  first_name: string
  last_name: string
  email: string
  avatar?: string
  title?: string
  description?: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  color?: string
}

export interface Tag {
  id: string
  name: string
  slug: string
}

export interface Article {
  id: string
  status: 'published' | 'draft' | 'archived'
  title: string
  slug: string
  excerpt?: string
  content: string
  featured_image?: string
  user_created: User | string
  user_updated?: User | string
  date_created: string
  date_updated?: string
  date_published?: string
  category?: Category | string
  tags?: Tag[] | string[]
  views: number
  likes: number
  comments_count: number
  meta_title?: string
  meta_description?: string
}

export interface Course {
  id: string
  title: string
  description: string
  slug: string
  featured_image?: string
  instructor: User | string
  category?: Category | string
  difficulty_level: 'beginner' | 'intermediate' | 'advanced'
  duration_hours: number
  lessons_count: number
  students_count: number
  price: number
  is_free: boolean
  status: 'published' | 'draft'
  date_created: string
  date_updated?: string
}

export interface LiveStream {
  id: string
  title: string
  description: string
  presenter: User | string
  scheduled_at: string
  status: 'scheduled' | 'live' | 'ended'
  stream_url?: string
  recording_url?: string
  thumbnail?: string
  viewers_count: number
}

// Define the schema for our Directus instance
interface Schema {
  articles: Article[]
  categories: Category[]
  tags: Tag[]
  courses: Course[]
  live_streams: LiveStream[]
  users: User[]
}

// Directus client configuration
const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055'

// Create a type for our Directus client with the schema
type DirectusClient = RestClient<Schema> & AuthenticationClient<Schema>

// Create Directus client with authentication and REST support
const createDirectusClient = (): DirectusClient => {
  return createDirectus<Schema>(directusUrl)
    .with(rest())
    .with(authentication('json'))
}

// Export the client instance
export const directus = createDirectusClient()

// Helper function to handle authentication
export const authenticate = async (email: string, password: string): Promise<AuthenticationData | null> => {
  try {
    const response = await directus.login({
      email,
      password,
    })
    return response
  } catch (error) {
    console.error('Authentication failed:', error)
    return null
  }
}

// Helper function to check authentication status
export const isAuthenticated = async (): Promise<boolean> => {
  try {
    await directus.getToken()
    return true
  } catch (error) {
    return false
  }
}

// Helper function to logout
export const logout = async (): Promise<void> => {
  try {
    await directus.logout()
  } catch (error) {
    console.error('Logout failed:', error)
  }
}

// API functions
export class DirectusAPI {
  // Articles
  static async getArticles(limit = 20, offset = 0, category?: string): Promise<Article[]> {
    try {
      const filter: any = {
        status: { _eq: 'published' as const }
      }

      if (category) {
        filter['category'] = { slug: { _eq: category } }
      }

      const query = {
        limit,
        offset,
        sort: ['-date_published' as const],
        filter,
        fields: [
          'id', 'title', 'slug', 'excerpt', 'featured_image',
          'date_published', 'views', 'likes', 'comments_count',
          {
            user_created: ['id', 'first_name', 'last_name', 'avatar']
          },
          {
            category: ['id', 'name', 'slug']
          },
          {
            tags: ['id', 'name', 'slug']
          }
        ]
      } as const

      const articles = await directus.request(readItems('articles', query))
      return articles as unknown as Article[]
    } catch (error) {
      console.error('Error fetching articles:', error)
      return []
    }
  }

  static async getArticle(slug: string): Promise<Article | null> {
    try {
      const articles = await directus.request(
        readItems('articles', {
          filter: {
            slug: { _eq: slug },
            status: { _eq: 'published' as const }
          },
          fields: [
            '*',
            {
              user_created: ['id', 'first_name', 'last_name', 'avatar']
            },
            {
              category: ['id', 'name', 'slug']
            },
            {
              tags: ['id', 'name', 'slug']
            }
          ]
        } as const)
      )
      return (articles[0] as unknown as Article) || null
    } catch (error) {
      console.error('Error fetching article:', error)
      return null
    }
  }

  static async getFeaturedArticles(limit = 5): Promise<Article[]> {
    try {
      const articles = await directus.request(
        readItems('articles', {
          limit,
          sort: ['-views'],
          filter: {
            status: { _eq: 'published' as const }
          },
          fields: [
            'id', 'title', 'slug', 'excerpt', 'featured_image',
            'date_published', 'views', 'likes',
            {
              user_created: ['id', 'first_name', 'last_name', 'avatar']
            }
          ]
        } as const)
      )
      return articles as unknown as Article[]
    } catch (error) {
      console.error('Error fetching featured articles:', error)
      return []
    }
  }

  // Categories
  static async getCategories(): Promise<Category[]> {
    try {
      const categories = await directus.request(
        readItems('categories', {
          sort: ['name'],
          fields: ['id', 'name', 'slug', 'description', 'color']
        } as const)
      )
      return categories as unknown as Category[]
    } catch (error) {
      console.error('Error fetching categories:', error)
      return []
    }
  }

  // Tags
  static async getTags(limit = 20): Promise<Tag[]> {
    try {
      const tags = await directus.request(
        readItems('tags', {
          limit,
          sort: ['name'],
          fields: ['id', 'name', 'slug']
        } as const)
      )
      return tags as unknown as Tag[]
    } catch (error) {
      console.error('Error fetching tags:', error)
      return []
    }
  }

  // Users
  static async getUser(id: string): Promise<User | null> {
    try {
      const user = await directus.request(
        readItem('users', id, {
          fields: [
            'id', 'first_name', 'last_name', 'email', 'avatar',
            'bio', 'website', 'github', 'twitter', 'linkedin',
            'role', 'status', 'date_created', 'last_login'
          ]
        } as const)
      )
      return user as unknown as User
    } catch (error) {
      console.error('Error fetching user:', error)
      return null
    }
  }

  // Courses
  static async getCourses(limit = 10, difficulty?: string): Promise<Course[]> {
    try {
      const filter: any = {
        status: { _eq: 'published' as const }
      }

      if (difficulty) {
        filter.difficulty_level = { _eq: difficulty }
      }

      const query = {
        limit,
        sort: ['-students_count' as const],
        filter,
        fields: [
          'id', 'title', 'description', 'slug', 'featured_image',
          'difficulty_level', 'duration_hours', 'lessons_count',
          'students_count', 'average_rating', 'is_free',
          {
            instructor: ['id', 'first_name', 'last_name', 'avatar']
          },
          {
            category: ['id', 'name', 'slug']
          }
        ]
      } as const

      const courses = await directus.request(readItems('courses', query))
      return courses as unknown as Course[]
    } catch (error) {
      console.error('Error fetching courses:', error)
      return []
    }
  }

  // Live Streams
  static async getLiveStreams(limit = 10, upcoming = true): Promise<LiveStream[]> {
    try {
      const now = new Date().toISOString()
      
      const query = {
        limit,
        sort: [upcoming ? 'scheduled_start' : '-scheduled_start' as const],
        filter: {
          status: { _eq: 'published' as const },
          scheduled_start: { [upcoming ? '_gte' : '_lte']: now } as any
        },
        fields: [
          'id', 'title', 'description', 'slug', 'thumbnail',
          'scheduled_start', 'duration_minutes', 'viewers_count',
          {
            host: ['id', 'first_name', 'last_name', 'avatar']
          },
          {
            category: ['id', 'name', 'slug']
          }
        ]
      } as const

      const streams = await directus.request(readItems('live_streams', query))
      return streams as unknown as LiveStream[]
    } catch (error) {
      console.error('Error fetching live streams:', error)
      return []
    }
  }

  // Search
  static async search(query: string, limit = 10) {
    try {
      const [articles, courses, liveStreams] = await Promise.all([
        directus.request(
          readItems('articles', {
            limit,
            search: query,
            filter: { status: { _eq: 'published' as const } },
            fields: ['id', 'title', 'slug', 'excerpt', 'date_published']
          } as const)
        ),
        directus.request(
          readItems('courses', {
            limit,
            search: query,
            filter: { status: { _eq: 'published' as const } },
            fields: ['id', 'title', 'slug', 'description', 'difficulty_level']
          } as const)
        ),
        directus.request(
          readItems('live_streams', {
            limit,
            search: query,
            filter: { 
              status: { _eq: 'published' as const },
              scheduled_start: { _gte: new Date().toISOString() }
            },
            fields: ['id', 'title', 'slug', 'description', 'scheduled_start']
          } as const)
        )
      ])

      return {
        articles: articles as unknown as Article[],
        courses: courses as unknown as Course[],
        liveStreams: liveStreams as unknown as LiveStream[]
      }
    } catch (error) {
      console.error('Error searching:', error)
      return { articles: [], courses: [], liveStreams: [] }
    }
  }

  // User interactions
  static async incrementViews(articleId: string) {
    try {
      // This would typically be done server-side to prevent abuse
      // Implementation depends on your Directus setup
    } catch (error) {
      console.error('Error incrementing views:', error)
    }
  }

  static async likeArticle(articleId: string) {
    try {
      // Implementation depends on your authentication setup
    } catch (error) {
      console.error('Error liking article:', error)
    }
  }
}

// Mock data for development (when Directus is not available)
export const mockArticles: Article[] = [
  {
    id: '1',
    status: 'published',
    title: 'HarmonyOS SDK助力次世代App能力建设',
    slug: 'harmonyos-sdk-app-development',
    excerpt: '本基础将帮助用户更好地解App资讯和政策管理，深入政治、水资源状开，渠道开展开发者友配配置法的开发解决方案。',
    content: '',
    featured_image: 'https://ext.same-assets.com/3583378434/3509567426.png',
    user_created: {
      id: '1',
      first_name: 'AON AI',
      last_name: '开发者',
      email: 'dev@huawei.com',
      avatar: 'https://ext.same-assets.com/3583378434/3677345794.png'
    },
    date_created: '2025-08-09T10:00:00Z',
    date_published: '2025-08-09T10:00:00Z',
    category: {
      id: '1',
      name: 'HarmonyOS',
      slug: 'harmonyos'
    },
    tags: [
      { id: '1', name: 'harmonyos', slug: 'harmonyos' },
      { id: '2', name: 'AON AI Agent', slug: 'aion-ai-agent' }
    ],
    views: 520,
    likes: 28,
    comments_count: 5
  },
  {
    id: '2',
    status: 'published',
    title: '【GaussDB】内存资源告急：深度解析一起"memory temporarily unavailable"错误',
    slug: 'gaussdb-memory-error-analysis',
    excerpt: '在专网测试环境（GaussDB 506.0 SPC0100 版本中），一个重要应用程序的主要节点，遇到用户执行特定查询时报ERROR: memory is temporarily unavailable)。今天',
    content: '',
    featured_image: 'https://ext.same-assets.com/3583378434/3936907249.png',
    user_created: {
      id: '2',
      first_name: 'GaussDB',
      last_name: '数据库',
      email: 'gaussdb@huawei.com',
      avatar: 'https://ext.same-assets.com/3583378434/3677345794.png'
    },
    date_created: '2025-08-08T15:30:00Z',
    date_published: '2025-08-08T15:30:00Z',
    category: {
      id: '2',
      name: '数据库',
      slug: 'database'
    },
    tags: [
      { id: '3', name: 'oracle', slug: 'oracle' },
      { id: '4', name: '数据库', slug: 'database' }
    ],
    views: 162,
    likes: 10,
    comments_count: 2
  },
  {
    id: '3',
    status: 'published',
    title: '"全域消费"智控未来"——云系列课...',
    slug: 'cloud-consumption-control',
    excerpt: '本期直播将深度介绍全域消费智控解决方案，头部企业如何进行智能化数据决策优化用户平台，分布式切问可用算法器可用不是用户不是用模型！',
    content: '',
    user_created: {
      id: '1',
      first_name: 'AON AI',
      last_name: '开发者',
      email: 'dev@huawei.com',
      avatar: 'https://ext.same-assets.com/3583378434/3677345794.png'
    },
    date_created: '2025-08-08T07:00:00Z',
    date_published: '2025-08-08T07:00:00Z',
    category: {
      id: '3',
      name: '云计算',
      slug: 'cloud'
    },
    tags: [
      { id: '5', name: '云计算', slug: 'cloud' },
      { id: '6', name: '智能化', slug: 'ai' }
    ],
    views: 85,
    likes: 5,
    comments_count: 1
  }
]
