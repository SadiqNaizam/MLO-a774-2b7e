import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SongListItem } from '@/components/SongListItem';
import { AlbumPlaylistCard } from '@/components/AlbumPlaylistCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search as SearchIcon, Music, User, Disc, ListMusic } from 'lucide-react';

// Placeholder data for SearchPage
const mockSongs = [
  { id: 'song1', title: 'Yume wo Kanaete Doraemon', artist: 'MAO', duration: '4:05', imageUrl: 'https://placehold.co/40x40/3B82F6/FFFFFF?text=YK', album: 'Doraemon OST' },
  { id: 'song2', title: 'Himawari no Yakusoku', artist: 'Motohiro Hata', duration: '5:15', imageUrl: 'https://placehold.co/40x40/FBBF24/000000?text=HY', album: 'Stand By Me Doraemon OST' },
];
const mockAlbums = [
  { id: 'album1', title: 'Doraemon Movie Themes', creator: 'Various Artists', imageUrl: 'https://placehold.co/150x150/10B981/FFFFFF?text=Movies', type: 'album' as 'album' },
];
const mockArtists = [ // Using AlbumPlaylistCard structure for artists for consistency
  { id: 'artist1', title: 'Doraemon Band', creator: 'Lead Vocal: Doraemon', imageUrl: 'https://placehold.co/150x150/EC4899/FFFFFF?text=DB', type: 'playlist' as 'playlist' /* Or a new type 'artist' if card supports */ },
];
const mockPlaylists = [
  { id: 'playlist1', title: "Doraemon's Adventure Mix", creator: 'MusicApp', imageUrl: 'https://placehold.co/150x150/8B5CF6/FFFFFF?text=Adventure', type: 'playlist' as 'playlist' },
];

const SearchPage: React.FC = () => {
  console.log('SearchPage loaded');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState("all");

  // Dummy handlers
  const handlePlayPause = (id: string | number) => console.log(`Play/pause song ${id}`);
  const handleLike = (id: string | number) => console.log(`Like song ${id}`);
  const handleCardPlay = (id: string | number) => console.log(`Play item ${id}`);
  const handleCardClick = (id: string | number, type: string) => console.log(`Navigate to ${type}/${id}`);

  return (
    <div className="flex bg-neutral-900 min-h-screen text-white">
      <Sidebar />
      <main className="ml-60 flex-1 p-6 flex flex-col">
        <div className="relative w-full max-w-xl mb-6">
          <Input
            type="search"
            placeholder="What do you want to listen to?"
            className="pl-10 pr-4 py-3 text-lg bg-neutral-800 border-neutral-700 placeholder-neutral-500 focus:bg-neutral-700 focus:border-blue-500 rounded-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500" />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-grow flex flex-col">
          <TabsList className="bg-neutral-800 p-1 rounded-md self-start mb-4">
            <TabsTrigger value="all" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white px-4 py-1.5">All</TabsTrigger>
            <TabsTrigger value="songs" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white px-4 py-1.5">Songs</TabsTrigger>
            <TabsTrigger value="artists" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white px-4 py-1.5">Artists</TabsTrigger>
            <TabsTrigger value="albums" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white px-4 py-1.5">Albums</TabsTrigger>
            <TabsTrigger value="playlists" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white px-4 py-1.5">Playlists</TabsTrigger>
          </TabsList>

          <ScrollArea className="flex-grow pr-2">
            <TabsContent value="all" className="mt-0">
              {searchTerm && (
                <>
                  <h3 className="text-xl font-semibold mb-3 text-blue-400 flex items-center"><Music className="mr-2 h-5 w-5"/>Songs</h3>
                  {mockSongs.map(song => <SongListItem key={song.id} {...song} onPlayPauseClick={handlePlayPause} onLikeClick={handleLike} />)}
                  
                  <h3 className="text-xl font-semibold my-3 text-yellow-400 flex items-center"><User className="mr-2 h-5 w-5"/>Artists</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {mockArtists.map(artist => (
                       <div key={artist.id} className="flex flex-col items-center p-2 hover:bg-neutral-800 rounded-lg cursor-pointer" onClick={() => handleCardClick(artist.id, 'artist')}>
                         <Avatar className="w-24 h-24 mb-2 border-2 border-neutral-700">
                           <AvatarImage src={artist.imageUrl} alt={artist.title} />
                           <AvatarFallback>{artist.title.substring(0,2)}</AvatarFallback>
                         </Avatar>
                         <p className="text-sm font-medium text-center">{artist.title}</p>
                         <p className="text-xs text-neutral-400 text-center">{artist.creator}</p>
                       </div>
                    ))}
                  </div>

                  <h3 className="text-xl font-semibold my-3 text-pink-400 flex items-center"><Disc className="mr-2 h-5 w-5"/>Albums</h3>
                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {mockAlbums.map(album => <AlbumPlaylistCard key={album.id} {...album} onPlay={handleCardPlay} onClick={(id) => handleCardClick(id, 'album')} />)}
                  </div>

                  <h3 className="text-xl font-semibold my-3 text-green-400 flex items-center"><ListMusic className="mr-2 h-5 w-5"/>Playlists</h3>
                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {mockPlaylists.map(playlist => <AlbumPlaylistCard key={playlist.id} {...playlist} onPlay={handleCardPlay} onClick={(id) => handleCardClick(id, 'playlist')} />)}
                  </div>
                </>
              )}
              {!searchTerm && <p className="text-neutral-500 text-center py-10">Search for your favorite music!</p>}
            </TabsContent>
            {/* Individual Tab Contents */}
            <TabsContent value="songs" className="mt-0">
              {searchTerm ? mockSongs.map(song => <SongListItem key={song.id} {...song} onPlayPauseClick={handlePlayPause} onLikeClick={handleLike} />) : <p className="text-neutral-500">Search to see song results.</p>}
            </TabsContent>
            <TabsContent value="artists" className="mt-0">
               {searchTerm ? <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {mockArtists.map(artist => (
                       <div key={artist.id} className="flex flex-col items-center p-2 hover:bg-neutral-800 rounded-lg cursor-pointer" onClick={() => handleCardClick(artist.id, 'artist')}>
                         <Avatar className="w-24 h-24 mb-2 border-2 border-neutral-700">
                           <AvatarImage src={artist.imageUrl} alt={artist.title} />
                           <AvatarFallback>{artist.title.substring(0,2)}</AvatarFallback>
                         </Avatar>
                         <p className="text-sm font-medium text-center">{artist.title}</p>
                         <p className="text-xs text-neutral-400 text-center">{artist.creator}</p>
                       </div>
                    ))}
                  </div> : <p className="text-neutral-500">Search to see artist results.</p>}
            </TabsContent>
             <TabsContent value="albums" className="mt-0">
               {searchTerm ? <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {mockAlbums.map(album => <AlbumPlaylistCard key={album.id} {...album} onPlay={handleCardPlay} onClick={(id) => handleCardClick(id, 'album')} />)}
                  </div> : <p className="text-neutral-500">Search to see album results.</p>}
            </TabsContent>
            <TabsContent value="playlists" className="mt-0">
               {searchTerm ? <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {mockPlaylists.map(playlist => <AlbumPlaylistCard key={playlist.id} {...playlist} onPlay={handleCardPlay} onClick={(id) => handleCardClick(id, 'playlist')} />)}
                  </div> : <p className="text-neutral-500">Search to see playlist results.</p>}
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </main>
    </div>
  );
};

export default SearchPage;