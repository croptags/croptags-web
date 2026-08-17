import heroBanner from "@/assets/hero-banner.png";

export const Hero = () => {
  return (
    <section className="w-full h-screen overflow-hidden">
      <img
        src={heroBanner}
        alt="CropTags Hero Banner"
        className="w-full h-auto object-cover"
      />
    </section>
  );
};
