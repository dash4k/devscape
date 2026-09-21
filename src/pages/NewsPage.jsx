import articles from '../data/articles.json';
import { articlesCarousel } from '../data/articles.js';
import { pickRandomFromList } from '../utils/utils.js';

import Carousel from '../components/Carousel.jsx';
import ArticleCard from '../components/ArticleCard.jsx';
import { Link } from 'react-router-dom';
import React from 'react';

const NewsPage = () => {
  const [articleHovered, setArticleHovered] = React.useState(null);

  const randomArticles = pickRandomFromList(articlesCarousel, 3);

  return (
    <section className="w-full px-5 pt-3 flex flex-col gap-10">
      <article className="w-full flex flex-col justify-center gap-2 p-2 pb-10 border-b border-dashed border-border">
        <h1 className="text-headline-lg text-xl md:text-4xl font-thin mb-5 text-text-primary">Latest on Devscape</h1>
        <Carousel items={randomArticles} />
      </article>
      <article className="w-full grid grid-cols-2 gap-5">
        {articles.articles.map((a) => (
          <Link
            to={`/news/${a.slug}`}
            key={a.slug}
            className="block min-w-0"
            onMouseEnter={() => setArticleHovered(a.slug)}
            onMouseLeave={() => setArticleHovered(null)}
          >
            <ArticleCard article={a} hovered={articleHovered} />
          </Link>
        ))}
      </article>
    </section>
  );
};

export default NewsPage;
