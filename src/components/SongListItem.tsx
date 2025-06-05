import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, PlayCircle, MoreHorizontal, PauseCircle } from 'lucide-react'; // Icons
import { cn } from '@/lib/utils';

interface SongListItemProps {
  id: string | number;
  title: string;
  artist: string;
  album?: string; // Optional
  duration: string; // e.g., "3:45"
  imageUrl?: string; // Optional album art for the song row
  isPlaying?: boolean; // To show play/pause state
  isLiked?: boolean;
  onPlayPauseClick: (id: string | number) => void;
  onLikeClick: (id: string | number) => void;
  onOptionsClick?: (id: string | number, event: React.MouseEvent) => void; // For a context menu
  onClick?: (id: string | number) => void; // For clicking the row itself to play or navigate
}

const SongListItem: React.FC<SongListItemProps> = ({
  id,
  title,
  artist,
  album,
  duration,
  imageUrl,
  isPlaying = false,
  isLiked = false,
  onPlayPauseClick,
  onLikeClick,
  onOptionsClick,
  onClick
}) => {
  console.log("Rendering SongListItem:", title, "- Playing:", isPlaying);
  const [isHovered, setIsHovered] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLikeClick(id);
  };

  const handlePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPlayPauseClick(id);
  };
  
  const handleOptions = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onOptionsClick) onOptionsClick(id, e);
  };

  const handleRowClick = () => {
    if (onClick) {
      onClick(id);
    } else {
      // Default to play/pause if no specific row click action
      onPlayPauseClick(id);
    }
  };

  return (
    <div
      className={cn(
        "flex items-center p-2 space-x-3 hover:bg-neutral-800/50 rounded-md cursor-pointer group", // Doraemon theme: rounded-md
        isPlaying ? "bg-neutral-700/70" : ""
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleRowClick}
      role="button"
      tabIndex={0}
      aria-label={`Play song ${title} by ${artist}`}
    >
      {/* Play/Pause button or Track Number - visible on hover or if playing */}
      <div className="w-8 text-center flex items-center justify-center">
        {(isHovered || isPlaying) ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePlayPause}
            className="h-8 w-8 text-white hover:text-white"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <PauseCircle className="h-5 w-5 text-green-400" /> : <PlayCircle className="h-5 w-5" />}
          </Button>
        ) : (
          <span className="text-sm text-neutral-400 group-hover:text-white">{/* Track number placeholder e.g., '1.' */}</span>
        )}
      </div>

      {imageUrl && (
        <img src={imageUrl} alt={album || title} className="h-10 w-10 rounded object-cover" />
      )}

      <div className="flex-1 min-w-0">
        <p className={cn("text-sm font-medium truncate", isPlaying ? "text-green-400" : "text-white")}>{title}</p>
        <p className="text-xs text-neutral-400 truncate">{artist}</p>
      </div>

      {album && <p className="hidden md:block text-xs text-neutral-400 truncate w-1/4">{album}</p>}
      
      <div className="flex items-center space-x-2">
        <Button
            variant="ghost"
            size="icon"
            onClick={handleLike}
            className={cn("h-8 w-8 text-neutral-400 hover:text-white", isLiked ? "text-green-400 hover:text-green-300" : "")}
            aria-label={isLiked ? "Unlike" : "Like"}
          >
          <Heart className={cn("h-4 w-4", isLiked ? "fill-current" : "")} />
        </Button>
        <span className="text-xs text-neutral-400 w-10 text-right">{duration}</span>
        {onOptionsClick && (
            <Button
                variant="ghost"
                size="icon"
                onClick={handleOptions}
                className="h-8 w-8 text-neutral-400 hover:text-white opacity-0 group-hover:opacity-100 focus:opacity-100"
                aria-label="More options"
            >
                <MoreHorizontal className="h-4 w-4" />
            </Button>
        )}
      </div>
    </div>
  );
}

export default SongListItem;