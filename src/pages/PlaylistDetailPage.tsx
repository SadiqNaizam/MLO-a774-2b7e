import React from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/button';
import { SongListItem } from '@/components/SongListItem';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlayCircle, Shuffle, Heart, Clock, Edit3 } from 'lucide-react';

// Placeholder data for PlaylistDetailPage
const playlistDetails = {
  id: 'dora-favs',
  name: "Doraemon's Favorites",
  creator: 'You',
  description: "All the best songs, handpicked by Doraemon (and you!). Perfect for any adventure.",
  coverImageUrl: 'https://placehold.co/300x300/3B82F6/FFFFFF?text=DoraFavs',
  songs: [
    { id: 'song1', title: 'Yume wo Kanaete Doraemon', artist: 'MAO', album: 'Doraemon OST', duration: '4:05', imageUrl: 'https://placehold.co/40x40/3B82F6/FFFFFF?text=YK', isLiked: true },
    { id: 'song2', title: 'Himawari no Yakusoku', artist: 'Motohiro Hata', album: 'Stand By Me Doraemon OST', duration: '5:15', imageUrl: 'https://placehold.co/40x40/FBBF24/000000?text=HY', isLiked: false },
    { id: 'song3', title: 'Boku Doraemon', artist: 'Nobuyo Ōyama', album: 'Classic Doraemon Hits', duration: '2:55', imageUrl: 'https://placehold.co/40x40/EC4899/FFFFFF?text=BD', isLiked: true },
  ],
  totalDuration: '12 min 15 sec'
};

const PlaylistDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  console.log(`PlaylistDetailPage loaded for playlist ID: ${id}`);
  // In a real app, fetch playlistDetails based on id

  const handlePlayPauseSong = (songId: string | number) => console.log(`Play/pause song ${songId} from playlist ${id}`);
  const handleLikeSong = (songId: string | number) => console.log(`Like/unlike song ${songId} from playlist ${id}`);
  const handlePlayAll = () => console.log(`Play all songs from playlist ${id}`);
  const handleShufflePlay = () => console.log(`Shuffle play songs from playlist ${id}`);
  const handleEditPlaylist = () => console.log(`Edit playlist ${id}`);


  return (
    <div className="flex bg-neutral-900 min-h-screen text-white">
      <Sidebar />
      <ScrollArea className="ml-60 flex-1 overflow-y-auto">
        <main className="p-6">
          {/* Header Section */}
          <section className="flex flex-col md:flex-row items-center md:items-end gap-6 mb-8">
            <img 
              src={playlistDetails.coverImageUrl} 
              alt={`${playlistDetails.name} cover`} 
              className="w-48 h-48 md:w-60 md:h-60 rounded-lg shadow-2xl object-cover border-4 border-blue-500" 
            />
            <div className="flex-1 text-center md:text-left">
              <p className="text-xs uppercase font-semibold text-neutral-400">Playlist</p>
              <h1 className="text-4xl md:text-6xl font-bold my-2 break-words" style={{ color: '#FFD700' /* Doraemon Yellow */ }}>{playlistDetails.name}</h1>
              <p className="text-neutral-300 mb-1 text-sm">{playlistDetails.description}</p>
              <p className="text-sm text-neutral-400">
                Created by <span className="font-semibold text-white">{playlistDetails.creator}</span>
                {' \u2022 '} {playlistDetails.songs.length} songs
                {' \u2022 '} {playlistDetails.totalDuration}
              </p>
            </div>
          </section>

          {/* Action Buttons Section */}
          <section className="mb-8 flex items-center gap-4">
            <Button onClick={handlePlayAll} size="lg" className="bg-green-500 hover:bg-green-600 text-white rounded-full px-6 py-3">
              <PlayCircle className="mr-2 h-6 w-6" /> Play All
            </Button>
            <Button onClick={handleShufflePlay} variant="outline" size="icon" className="border-neutral-600 hover:bg-neutral-700 text-neutral-300 hover:text-white">
              <Shuffle className="h-5 w-5" />
            </Button>
             {playlistDetails.creator === 'You' && (
                <Button onClick={handleEditPlaylist} variant="outline" size="icon" className="border-neutral-600 hover:bg-neutral-700 text-neutral-300 hover:text-white">
                    <Edit3 className="h-5 w-5" />
                </Button>
            )}
            {/* Add more actions like 'Add to queue', 'Share' etc. */}
          </section>

          {/* Tracklist Section */}
          <section>
            <Table>
              <TableHeader className="border-b border-neutral-700">
                <TableRow>
                  <TableHead className="w-10 text-neutral-400">#</TableHead>
                  <TableHead className="text-neutral-400">Title</TableHead>
                  <TableHead className="hidden md:table-cell text-neutral-400">Album</TableHead>
                  <TableHead className="text-right text-neutral-400"><Heart className="h-4 w-4 inline-block mr-1" /></TableHead>
                  <TableHead className="text-right text-neutral-400"><Clock className="h-4 w-4 inline-block" /></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {playlistDetails.songs.map((song, index) => (
                  <TableRow key={song.id} className="border-none hover:bg-neutral-800/50 group">
                     <TableCell className="text-neutral-400 group-hover:text-white">
                       <span className="group-hover:hidden">{index + 1}</span>
                       <PlayCircle className="hidden group-hover:inline-block h-5 w-5 cursor-pointer" onClick={() => handlePlayPauseSong(song.id)} />
                     </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img src={song.imageUrl} alt={song.title} className="w-10 h-10 rounded object-cover" />
                        <div>
                          <p className="font-medium text-white group-hover:text-green-400">{song.title}</p>
                          <p className="text-xs text-neutral-400">{song.artist}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-neutral-400">{song.album}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleLikeSong(song.id)} className={`h-8 w-8 text-neutral-400 hover:text-white ${song.isLiked ? 'text-green-400' : ''}`}>
                        <Heart className={`h-4 w-4 ${song.isLiked ? 'fill-current' : ''}`} />
                      </Button>
                    </TableCell>
                    <TableCell className="text-right text-neutral-400">{song.duration}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>
        </main>
      </ScrollArea>
    </div>
  );
};

export default PlaylistDetailPage;