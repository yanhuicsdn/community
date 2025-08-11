# 华为开发者社区 - 前端项目

这是一个仿照华为云CSDN开发者社区的前端项目，使用 Next.js + Tailwind CSS + shadcn/ui 构建，后台使用 Directus 进行内容管理。

## 功能特性

- 🎨 现代化的UI设计，还原华为开发者社区界面
- 📱 完全响应式设计，支持移动端和桌面端
- 🚀 基于Next.js 15和React 19的现代化架构
- 💎 使用shadcn/ui组件库，可定制性强
- 🔧 集成Directus无头CMS，便于内容管理
- 🎯 TypeScript支持，类型安全
- ⚡ 优化的性能和SEO

## 技术栈

- **框架**: Next.js 15
- **UI库**: shadcn/ui + Tailwind CSS
- **语言**: TypeScript
- **后台**: Directus CMS
- **图标**: Lucide React
- **包管理**: Bun

## 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 首页
├── components/            # React 组件
│   ├── layout/           # 布局组件
│   │   ├── Header.tsx    # 顶部导航
│   │   ├── HeroSection.tsx # Hero轮播图
│   │   └── Footer.tsx    # 底部
│   ├── ArticleList.tsx   # 文章列表
│   ├── Sidebar.tsx       # 侧边栏
│   └── ui/              # shadcn/ui 基础组件
├── lib/                  # 工具库
│   ├── directus.ts      # Directus API客户端
│   └── utils.ts         # 工具函数
```

## 快速开始

### 1. 安装依赖

```bash
bun install
```

### 2. 配置环境变量

复制 `.env.example` 到 `.env.local`:

```bash
cp .env.example .env.local
```

编辑 `.env.local` 文件，配置你的Directus实例：

```env
NEXT_PUBLIC_DIRECTUS_URL=http://localhost:8055
```

### 3. 启动开发服务器

```bash
bun dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看结果。

## Directus 后台配置

### 安装 Directus

```bash
# 创建新的Directus项目
npx create-directus-project my-directus-project

# 或者使用Docker
docker run -p 8055:8055 directus/directus
```

### 数据模型配置

项目需要以下数据模型：

#### 1. Articles (文章)
- `id` (UUID, Primary Key)
- `status` (选择: published, draft, archived)
- `title` (字符串, 必填)
- `slug` (字符串, 唯一)
- `excerpt` (文本)
- `content` (富文本)
- `featured_image` (文件)
- `user_created` (用户关联)
- `date_created` (日期时间)
- `date_published` (日期时间)
- `category` (分类关联)
- `tags` (标签多对多关联)
- `views` (整数, 默认0)
- `likes` (整数, 默认0)
- `comments_count` (整数, 默认0)

#### 2. Categories (分类)
- `id` (UUID, Primary Key)
- `name` (字符串, 必填)
- `slug` (字符串, 唯一)
- `description` (文本)
- `color` (字符串)

#### 3. Tags (标签)
- `id` (UUID, Primary Key)
- `name` (字符串, 必填)
- `slug` (字符串, 唯一)

#### 4. Courses (课程)
- `id` (UUID, Primary Key)
- `title` (字符串, 必填)
- `description` (文本)
- `slug` (字符串, 唯一)
- `featured_image` (文件)
- `instructor` (用户关联)
- `category` (分类关联)
- `difficulty_level` (选择: beginner, intermediate, advanced)
- `duration_hours` (整数)
- `lessons_count` (整数)
- `students_count` (整数, 默认0)
- `price` (小数)
- `is_free` (布尔, 默认false)
- `status` (选择: published, draft)

#### 5. Live Streams (直播)
- `id` (UUID, Primary Key)
- `title` (字符串, 必填)
- `description` (文本)
- `presenter` (用户关联)
- `scheduled_at` (日期时间)
- `status` (选择: scheduled, live, ended)
- `stream_url` (字符串)
- `recording_url` (字符串)
- `thumbnail` (文件)
- `viewers_count` (整数, 默认0)

### API权限配置

在Directus管理面板中：

1. 创建一个 `Public` 角色
2. 为该角色配置以下权限：
   - Articles: 读取权限 (状态为published的文章)
   - Categories: 读取权限
   - Tags: 读取权限
   - Courses: 读取权限 (状态为published的课程)
   - Live Streams: 读取权限

## API使用示例

```typescript
import { DirectusAPI } from '@/lib/directus'

// 获取文章列表
const articles = await DirectusAPI.getArticles(20, 0)

// 获取单篇文章
const article = await DirectusAPI.getArticle('article-slug')

// 获取课程列表
const courses = await DirectusAPI.getCourses(10)

// 搜索内容
const searchResults = await DirectusAPI.searchContent('关键词')
```

## 部署

### Vercel部署

1. 推送代码到GitHub
2. 在Vercel中导入项目
3. 配置环境变量
4. 部署

### Netlify部署

项目已配置 `netlify.toml`，可直接部署到Netlify。

### Docker部署

```bash
# 构建镜像
docker build -t huawei-dev-community .

# 运行容器
docker run -p 3000:3000 huawei-dev-community
```

## 开发说明

### 添加新组件

```bash
# 添加shadcn/ui组件
cd huawei-developer-community && bunx shadcn@latest add -y -o [component-name]
```

### 自定义样式

项目使用Tailwind CSS，所有样式都在 `src/app/globals.css` 中配置。

### Mock数据

在Directus未配置时，项目使用 `src/lib/directus.ts` 中的Mock数据进行开发。

## 贡献

1. Fork项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建Pull Request

## 许可证

MIT License
