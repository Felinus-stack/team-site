"use client";

const BackgroundVideo = () => {
  return (
    <div className="absolute inset-0 z-0">
      <video autoPlay muted loop className="w-full h-full object-cover">
        <source src="/video.mp4" type="video/mp4" />
        Twoja przeglądarka nie obsługuje tagu wideo.
      </video>
      <div className="bg-black/70 absolute inset-0"></div>
    </div>
  );
};

export default BackgroundVideo;
