// src/components/PhotoGrid.tsx
type Props = {
  photos: { imageUrl: string; uploadedAt: string }[];
};

export default function PhotoGrid({ photos }: Props) {
  return (
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
      {photos.map((photo, index) => (
        <div key={index} className="overflow-hidden rounded-lg">
          <img
            src={photo.imageUrl}
            alt="Uploaded"
            className="w-full h-48 object-cover"
          />
        </div>
      ))}
    </div>
  );
}
