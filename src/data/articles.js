import articles from './articles.json';

export const articlesCarousel = articles.articles.map((a) => ({
  title: a.title,
  date: a.date,
  gambar: a.gambar,
  slug: a.slug,
}));

export const getArticleBySlug = (slug) => articles.articles.find((a) => a.slug === slug);

export const getArticleByQuery = (query) => articles.articles.filter((a) => (
  a.slug.includes(query.toLowerCase())
    || a.title.toLowerCase().includes(query.toLowerCase())
    || a.drugId.includes(query.toLowerCase())
    || a.tags.map((a) => (a.toLowerCase())).includes(query.toLowerCase())
));
