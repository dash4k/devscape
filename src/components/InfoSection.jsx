const InfoSection = ({ id, title, items }) => {
  if (!items || items.length === 0) return null;

  return (
    <section aria-labelledby={id} className="flex flex-col gap-2">
      <h2 id={id} className="text-label-lg font-black text-text-primary">
        {title}
      </h2>
      <ul className={`list-disc pl-5 text-body-md text-text-primary ${
        id === 'merek'
          ? `grid grid-cols-${Math.ceil(items.length / 22)} gap-3`
          : 'flex flex-col gap-1'
      }`}>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </section>
  );
};

export default InfoSection;
