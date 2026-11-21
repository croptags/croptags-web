export function EmptyState({ image, title, description }) {
  return (
    <div className="flex min-h-[280px] sm:min-h-[400px] flex-col items-center justify-center px-5 text-center">
      <img
        src={image}
        alt=""
        className="mb-5 sm:mb-7 h-20 w-20 object-contain sm:h-36 sm:w-36"
      />
      <h2 className="heading-h6-bold md:heading-h5-bold text-text-primary">
        {title}
      </h2>
      <p className="label-2-regular md:label-1-regular mt-1 sm:mt-2 max-w-lg text-text-secondary">
        {description}
      </p>
    </div>
  );
}
