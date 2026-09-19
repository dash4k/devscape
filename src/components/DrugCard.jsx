const DrugCard = ({ gambar, nama, indikasi }) => {
  return (
    <div className="flex flex-col gap-1 w-full h-full p-4 rounded-2xl bg-surface border-4 border-text-inverse-primary">
      {gambar && (
        <img
          className="rounded-xl"
          src={gambar}
          alt={`Struktur kimia ${nama}`}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      )}
      <h3 className="text-label-lg font-bold text-text-primary">{nama}</h3>
      <p className="text-body-sm text-text-primary">{indikasi}</p>
    </div>
  );
};

export default DrugCard;
