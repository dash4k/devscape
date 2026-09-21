import { useNavigate, useParams, Link, createSearchParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import fm from 'front-matter';

import { getArticleBySlug } from '../data/articles.js';

const files = import.meta.glob('../content/articles/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const articles = Object.values(files).map((raw) => {
  const { attributes, body } = fm(raw);
  return { data: attributes, content: body };
});

const NewsDetailPage = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const article = articles.find((a) => a.data.slug === slug);
  const articleData = getArticleBySlug(slug);

  if (!article) return <p>Artikel tidak ditemukan.</p>;

  return (
    <section className="w-full px-5 pt-10">
      <div className="w-full flex flex-row items-center justify-between text-text-muted text-body-sm pb-2">
        <p>Tags: {articleData.tags.map((t) => (
          <span
            onClick={() =>
              navigate({
                pathname: '/search',
                search: `?${createSearchParams({ q: t.toLowerCase() })}`,
              })
            }
            className='hover:text-accent-cta-hover cursor-pointer'
          >
            {`[${t}] `}
          </span>
        ))}</p>
        <p>{articleData.date}</p>
      </div>
      <article className="prose dark:prose-invert max-w-screen">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.content}</ReactMarkdown>
        <Link to={`/references/${article.data.drugId}`}>Lihat detail obat</Link>
      </article>
    </section>
  );
};

export default NewsDetailPage;
