import { useNavigate, useParams, Link, createSearchParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import fm from 'front-matter';

import { getArticleBySlug } from '../data/articles.js';
import ScrollToTopButton from '../components/ScrollToTopButton.jsx';
import { ARTICLE_NOT_FOUND } from '../utils/constants.js';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';

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

  if (!article) return (
    <section className="flex flex-col items-center gap-2 py-10">
      <div className="flex flex-col justify-center w-full items-center gap-3 py-5 text-center">
        <img
          src={ARTICLE_NOT_FOUND}
          alt="Tidak ada hasil"
          className='w-40 h-40 rounded-xl p-1 border border-border-strong'
        />
        <div className="w-3/4 md:w-1/2 flex flex-col justify-center items-center gap-1">
          <h3 className="text-label-md text-lg text-text-primary">Artikel tidak ditemukan</h3>
          <p className="text-body-sm text-text-primary/70">Artikel yang Anda cari tidak dapat kami temukan. Kemungkinan terjadi kesalahan penulisan nama artikel. Silakan cek kembali ejaan atau jelajahi daftar lengkap artikel yang tersedia.</p>
          <Link to="/news" className="w-auto flex flex-row items-center justify-evenly gap-1.5 text-text-on-cta mt-2 bg-accent-cta hover:bg-accent-cta-hover p-2 rounded-xl text-headline-lg text-base transition-colors duration-300">
            <FaRegArrowAltCircleLeft className='mb-0.5'/> Kembali
          </Link>
        </div>
      </div>
    </section>
  );

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
      <ScrollToTopButton />
    </section>
  );
};

export default NewsDetailPage;
