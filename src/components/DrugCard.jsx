import { DRUG_IMAGE_PLACEHOLDER } from '../utils/constants.js';

const DrugCard = ({ gambar, nama, indikasi }) => {
  return (
    <div className="flex flex-col gap-1 w-full h-full p-4 rounded-2xl bg-surface border-4 border-text-inverse-primary">
      {(gambar || DRUG_IMAGE_PLACEHOLDER) && (
        <img
          className="rounded-xl  max-w-[300px] max-h-[300px]"
          src={gambar || DRUG_IMAGE_PLACEHOLDER}
          alt={`Struktur kimia ${nama}`}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = DRUG_IMAGE_PLACEHOLDER;
          }}
        />
      )}
      <h3 className="text-label-lg font-bold text-text-primary wrap-break-word line-clamp-2">{nama}</h3>
      <p className="text-body-sm text-text-primary wrap-break-word line-clamp-3">{indikasi}</p>
    </div>
  );
};

export default DrugCard;
