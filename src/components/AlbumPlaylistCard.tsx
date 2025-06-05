import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { PlayCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AlbumPlaylistCardProps {
  id: string | number;
  title: string;
  creator: string; // e.g., Artist Name or "Spotify"
  imageUrl: string;
  type: 'album' | 'playlist'; // To differentiate styling or behavior if needed
  onPlay?: (id: string | number) => void; // Callback when play is clicked
  onClick?: (id: string | number) => void; // Callback for card click (navigation)
  // Doraemon theme related props (optional)
  themeColor?: string; // e.g., 'bg-blue-500' for Doraemon blue
}

const AlbumPlaylistCard: React.FC<AlbumPlaylistCardProps> = ({
  id,
  title,
  creator,
  imageUrl,
  type,
  onPlay,
  onClick,
  themeColor,
}) => {
  console.log("Rendering AlbumPlaylistCard:", title);

  const handleCardClick = () => {
    if (onClick) {
      onClick(id);
    } else if (onPlay) {
      // Default to play if no specific onClick for navigation is provided
      onPlay(id);
    }
  };

  const handlePlayButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event if play button is distinct
    if (onPlay) onPlay(id);
  };

  return (
    <Card
      className={cn(
        "w-full overflow-hidden transition-all duration-300 hover:bg-neutral-800/60 group cursor-pointer rounded-lg shadow-md", // Doraemon theme: rounded-lg
        "bg-neutral-800/30 border-neutral-700" // Dark theme friendly
      )}
      onClick={handleCardClick}
    >
      <CardHeader className="p-0 relative">
        <AspectRatio ratio={1 / 1} className="bg-neutral-700">
          <img
            src={imageUrl || '/placeholder.svg'}
            alt={`${title} ${type} cover`}
            className="object-cover w-full h-full rounded-t-lg transition-transform duration-300 group-hover:scale-105"
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        </AspectRatio>
        {onPlay && (
          <button
            onClick={handlePlayButtonClick}
            aria-label={`Play ${title}`}
            className={cn(
                "absolute bottom-2 right-2 p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:bottom-3 focus:opacity-100 focus:bottom-3",
                themeColor ? `${themeColor} hover:brightness-110` : "bg-green-500 hover:bg-green-400", // Default green, can be Doraemon's red/yellow
                "text-white"
            )}
          >
            <PlayCircle className="h-8 w-8" strokeWidth={1.5}/>
          </button>
        )}
      </CardHeader>
      <CardContent className="p-3">
        <h3 className="font-semibold text-sm text-white truncate" title={title}>
          {title}
        </h3>
        <p className="text-xs text-neutral-400 truncate" title={creator}>
          {creator}
        </p>
      </CardContent>
      {/* CardFooter can be used for additional actions or tags if needed */}
    </Card>
  );
}

export default AlbumPlaylistCard;