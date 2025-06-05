import React from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/button';
import { SongListItem } from '@/components/SongListItem'; // Re-using this for consistency, though Table might be better for albums
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlayCircle, Heart, Clock, Library } from 'lucide-react';

// Placeholder data for AlbumDetailPage
const albumDetailsData = {
  id: 'album-dora-classics',
  name: 'Classic Doraemon Hits',
  artist: 'Various Artists',
  releaseYear: '2005',
  coverImageUrl: 'https://placehold.co/300x300/8B5CF6/FFFFFF?text=Classics',
  songs: [
    { id: 's1', title: 'Doraemon no Uta', artist: 'Kumiko Osugi', duration: '3:15', isLiked: true, albumArt: 'https://placehold.co/40x40/8B5CF6/FFFFFF?text=DU' },
    { id: 's2', title: 'Aoi Sora wa Pocket sa', artist: 'Kumiko Osugi', duration: '2:50', isLiked: false, albumArt: 'https://placehold.co/40x40/8B5CF6/FFFFFF?text=AS' },
    { id: 's3', title: 'Maru Kao no Uta', artist: 'Nobuyo Ōyama', duration: '3:05', isLiked: true, albumArt: 'https://placehold.co/40x40/8B5CF6/FFFFFF?text=MK' },
  ],
  totalDuration: '9 min 10 sec',
  isLiked: false, // For liking the whole album
  isInLibrary: true, // For adding/removing from library
};


const AlbumDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  console.log(`AlbumDetailPage loaded for album ID: ${id}`);
  // In a real app, fetch albumDetailsData based on id

  const handlePlayPauseSong = (songId: string | number) => console.log(`Play/pause song ${songId} from album ${id}`);
  const handleLikeSong = (songId: string | number) => console.log(`Like/unlike song ${songId} from album ${id}`);
  const handlePlayAlbum = () => console.log(`Play all songs from album ${id}`);
  const handleLikeAlbum = () => console.log(`Like/unlike album ${id}`);
  const handleToggleLibrary = () => console.log(`Add/remove album ${id} from library`);

  return (
    <div className="flex bg-neutral-900 min-h-screen text-white">
      <Sidebar />
      <ScrollArea className="ml-60 flex-1 overflow-y-auto">
        <main className="p-6">
          {/* Header Section */}
           <section className="flex flex-col md:flex-row items-center md:items-end gap-6 mb-8">
            <img 
              src={albumDetailsData.coverImageUrl} 
              alt={`${albumDetailsData.name} cover`} 
              className="w-48 h-48 md:w-60 md:h-60 rounded-lg shadow-2xl object-cover border-4 border-red-500" // Doraemon red accent
            />
            <div className="flex-1 text-center md:text-left">
              <p className="text-xs uppercase font-semibold text-neutral-400">Album</p>
              <h1 className="text-4xl md:text-6xl font-bold my-2 break-words text-red-400">{albumDetailsData.name}</h1>
              <p className="text-xl text-neutral-200 mb-1">{albumDetailsData.artist}</p>
              <p className="text-sm text-neutral-400">
                {albumDetailsData.releaseYear}
                {' \u2022 '} {albumDetailsData.songs.length} songs
                {' \u2022 '} {albumDetailsData.totalDuration}
              </p>
            </div>
          </section>

          {/* Action Buttons Section */}
          <section className="mb-8 flex items-center gap-4">
            <Button onClick={handlePlayAlbum} size="lg" className="bg-green-500 hover:bg-green-600 text-white rounded-full px-6 py-3">
              <PlayCircle className="mr-2 h-6 w-6" /> Play Album
            </Button>
            <Button onClick={handleLikeAlbum} variant="ghost" size="icon" className={`text-neutral-300 hover:text-white ${albumDetailsData.isLiked ? 'text-green-400' : ''}`}>
              <Heart className={`h-6 w-6 ${albumDetailsData.isLiked ? 'fill-current' : ''}`} />
            </Button>
             <Button onClick={handleToggleLibrary} variant="ghost" size="icon" className={`text-neutral-300 hover:text-white ${albumDetailsData.isInLibrary ? 'text-blue-400' : ''}`}>
              <Library className={`h-6 w-6 ${albumDetailsData.isInLibrary ? 'fill-current' : ''}`} />
            </Button>
          </section>

          {/* Tracklist Section */}
          <section>
             <Table>
              <TableHeader className="border-b border-neutral-700">
                <TableRow>
                  <TableHead className="w-10 text-neutral-400">#</TableHead>
                  <TableHead className="text-neutral-400">Title</TableHead>
                  {/* Artist is same for album, so not needed in each row unless it's a compilation */}
                  <TableHead className="text-right text-neutral-400"><Heart className="h-4 w-4 inline-block mr-1" /></TableHead>
                  <TableHead className="text-right text-neutral-400"><Clock className="h-4 w-4 inline-block" /></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {albumDetailsData.songs.map((song, index) => (
                  <TableRow key={song.id} className="border-none hover:bg-neutral-800/50 group">
                     <TableCell className="text-neutral-400 group-hover:text-white">
                       <span className="group-hover:hidden">{index + 1}</span>
                       <PlayCircle className="hidden group-hover:inline-block h-5 w-5 cursor-pointer" onClick={() => handlePlayPauseSong(song.id)} />
                     </TableCell>
                    <TableCell>
                      {/* Album page song list typically doesn't show individual song art, but can be included */}
                      <div className="flex items-center gap-3">
                        {/* Optional: <img src={song.albumArt} alt={song.title} className="w-10 h-10 rounded object-cover" /> */}
                        <div>
                          <p className="font-medium text-white group-hover:text-green-400">{song.title}</p>
                          {/* Artist could be shown if it's a compilation album */}
                          {/* <p className="text-xs text-neutral-400">{song.artist}</p> */}
                        </div>
                      </div>
                    </TableCell>
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

export default AlbumDetailPage;