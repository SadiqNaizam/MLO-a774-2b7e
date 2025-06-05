import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { AlbumPlaylistCard } from '@/components/AlbumPlaylistCard';
import { SongListItem } from '@/components/SongListItem';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PlusCircle, ListMusic, Disc, User, Heart } from 'lucide-react';

// Placeholder data for LibraryPage
const myPlaylists = [
  { id: 'dora-favs', title: "Doraemon's Favorites", creator: 'You', imageUrl: 'https://placehold.co/150x150/3B82F6/FFFFFF?text=DoraFavs', type: 'playlist' as 'playlist', themeColor: 'bg-blue-500' },
  { id: 'sleepy-tunes', title: 'Sleepy Time Tunes', creator: 'You', imageUrl: 'https://placehold.co/150x150/FBBF24/000000?text=Zzz', type: 'playlist' as 'playlist' },
];
const likedSongs = [
  { id: 'song3', title: 'Boku Doraemon', artist: 'Nobuyo Ōyama', duration: '2:55', imageUrl: 'https://placehold.co/40x40/EC4899/FFFFFF?text=BD', album: 'Classic Doraemon Hits', isLiked: true },
  { id: 'song4', title: 'Pocket no Naka ni', artist: 'Doraemon & Friends', duration: '3:20', imageUrl: 'https://placehold.co/40x40/10B981/FFFFFF?text=Pocket', album: 'Friendship Songs', isLiked: true },
];
const savedAlbums = [
    { id: 'album-dora-classics', title: 'Classic Doraemon Hits', creator: 'Various Artists', imageUrl: 'https://placehold.co/150x150/8B5CF6/FFFFFF?text=Classics', type: 'album' as 'album' },
];
const followedArtists = [ // Representing artists as cards for simplicity
    { id: 'artist-mao', title: 'MAO (Singer)', creator: 'Doraemon Theme Artist', imageUrl: 'https://placehold.co/150x150/EF4444/FFFFFF?text=MAO', type: 'playlist' as 'playlist' /* Treat as playlist card for display */ },
];


const LibraryPage: React.FC = () => {
  console.log('LibraryPage loaded');

  // Dummy handlers
  const handlePlayPauseSong = (id: string | number) => console.log(`Play/pause song ${id}`);
  const handleLikeSong = (id: string | number) => console.log(`Like/unlike song ${id}`);
  const handleCardPlay = (id: string | number) => console.log(`Play item ${id}`);
  const handleCardClick = (id: string | number, type: string) => console.log(`Navigate to ${type}/${id}`);
  const handleCreatePlaylist = () => console.log('Create new playlist');

  return (
    <div className="flex bg-neutral-900 min-h-screen text-white">
      <Sidebar />
      <main className="ml-60 flex-1 p-6 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-400">Your Library</h1>
          <Button onClick={handleCreatePlaylist} className="bg-yellow-500 hover:bg-yellow-600 text-black">
            <PlusCircle className="mr-2 h-5 w-5" /> Create Playlist
          </Button>
        </div>

        <Tabs defaultValue="playlists" className="flex-grow flex flex-col">
          <TabsList className="bg-neutral-800 p-1 rounded-md self-start mb-4">
            <TabsTrigger value="playlists" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white px-3 py-1.5 text-sm"><ListMusic className="mr-1.5 h-4 w-4"/>Playlists</TabsTrigger>
            <TabsTrigger value="songs" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white px-3 py-1.5 text-sm"><Heart className="mr-1.5 h-4 w-4"/>Liked Songs</TabsTrigger>
            <TabsTrigger value="albums" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white px-3 py-1.5 text-sm"><Disc className="mr-1.5 h-4 w-4"/>Albums</TabsTrigger>
            <TabsTrigger value="artists" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white px-3 py-1.5 text-sm"><User className="mr-1.5 h-4 w-4"/>Artists</TabsTrigger>
          </TabsList>

          <ScrollArea className="flex-grow pr-2">
            <TabsContent value="playlists" className="mt-0">
              <h3 className="text-xl font-semibold mb-3">My Playlists</h3>
              {myPlaylists.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {myPlaylists.map(playlist => <AlbumPlaylistCard key={playlist.id} {...playlist} onPlay={handleCardPlay} onClick={(id) => handleCardClick(id, 'playlist')} />)}
                </div>
              ) : <p className="text-neutral-500">You haven't created any playlists yet.</p>}
            </TabsContent>

            <TabsContent value="songs" className="mt-0">
              <h3 className="text-xl font-semibold mb-3">Liked Songs</h3>
              {likedSongs.length > 0 ? (
                <div className="space-y-1">
                  {likedSongs.map(song => <SongListItem key={song.id} {...song} onPlayPauseClick={handlePlayPauseSong} onLikeClick={handleLikeSong} />)}
                </div>
              ) : <p className="text-neutral-500">You haven't liked any songs yet.</p>}
            </TabsContent>

            <TabsContent value="albums" className="mt-0">
              <h3 className="text-xl font-semibold mb-3">Saved Albums</h3>
               {savedAlbums.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {savedAlbums.map(album => <AlbumPlaylistCard key={album.id} {...album} onPlay={handleCardPlay} onClick={(id) => handleCardClick(id, 'album')} />)}
                </div>
              ) : <p className="text-neutral-500">You haven't saved any albums yet.</p>}
            </TabsContent>

            <TabsContent value="artists" className="mt-0">
              <h3 className="text-xl font-semibold mb-3">Followed Artists</h3>
               {followedArtists.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {followedArtists.map(artist => <AlbumPlaylistCard key={artist.id} {...artist} onPlay={handleCardPlay} onClick={(id) => handleCardClick(id, 'artist')} />)}
                </div>
              ) : <p className="text-neutral-500">You haven't followed any artists yet.</p>}
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </main>
    </div>
  );
};

export default LibraryPage;