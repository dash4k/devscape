const ArticleCard = ({ article, hovered }) => {
  const { slug, title, date, summary } = article;

  return (
    <div className={`w-full h-auto flex flex-col justify-center items-start pb-8 mb-2 border-b transition-all duration-300 ${
      hovered === slug
        ? 'border-accent-primary-hover border-solid'
        : 'border-border-strong border-dotted'
    }`}>
      <h2 className={`text-base text-label-bold transition-all duration-300 ${
        hovered === slug
          ? 'text-accent-primary-hover'
          : 'text-text-primary'
      }`}>{title}</h2>
      <div className="flex flex-row gap-1 flex-wrap text-text-muted text-body-sm">
        <span className="italic">{summary}</span> | {date}
      </div>
    </div>
  );
};

export default ArticleCard;
