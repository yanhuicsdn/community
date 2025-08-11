'use client';

import { useState, useEffect } from 'react';
import { DirectusAPI } from '@/lib/directus';

export default function TestDirectusPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        
        // Fetch articles, categories, and tags in parallel
        const [articlesData, categoriesData, tagsData] = await Promise.all([
          DirectusAPI.getArticles(5),
          DirectusAPI.getCategories(),
          DirectusAPI.getTags(10)
        ]);

        setArticles(articlesData);
        setCategories(categoriesData);
        setTags(tagsData);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data from Directus. Please check your connection and try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Testing Directus Integration</h1>
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Testing Directus Integration</h1>
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>{error}</p>
            <p className="mt-2 text-sm">
              Make sure your Directus server is running at {process.env.NEXT_PUBLIC_DIRECTUS_URL} and the credentials in .env.local are correct.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Directus Integration Test</h1>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Latest Articles</h2>
          <div className="space-y-4">
            {articles.length > 0 ? (
              articles.map((article) => (
                <div key={article.id} className="bg-white p-4 rounded-lg shadow">
                  <h3 className="text-lg font-medium">{article.title}</h3>
                  <p className="text-gray-600 text-sm">
                    {new Date(article.date_published).toLocaleDateString()} • {article.views} views
                  </p>
                  <p className="mt-2 text-gray-700">{article.excerpt}</p>
                  {article.category && (
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mt-2">
                      {article.category.name}
                    </span>
                  )}
                </div>
              ))
            ) : (
              <p>No articles found.</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Categories</h2>
            <div className="bg-white p-4 rounded-lg shadow">
              {categories.length > 0 ? (
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category.id} className="flex justify-between items-center">
                      <span>{category.name}</span>
                      <span className="text-sm text-gray-500">{category.articles_count || 0} articles</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No categories found.</p>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Popular Tags</h2>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex flex-wrap gap-2">
                {tags.length > 0 ? (
                  tags.map((tag) => (
                    <span 
                      key={tag.id}
                      className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full transition-colors"
                    >
                      {tag.name}
                    </span>
                  ))
                ) : (
                  <p>No tags found.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-medium text-green-800">Directus Connection Successful!</h3>
          <p className="text-sm text-green-700 mt-1">
            Your frontend is successfully connected to Directus and fetching data correctly.
          </p>
        </div>
      </div>
    </div>
  );
}
