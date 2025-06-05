import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { Input } from '@/components/ui/input';
import { Carousel } from '@/components/Carousel'; // Corrected import based on custom component
import { AlbumPlaylistCard } from '@/components/AlbumPlaylistCard'; // Corrected import
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Added Card specific imports
import { Search } from 'lucide-react';

// Placeholder data for HomePage
const featuredPlaylists = [
  { id: 'dora-mix-1', title: "Doraemon's Happy Mix", creator: 'Doraemon', imageUrl: 'https://placehold.co/300x300/3B82F6/FFFFFF?text=Happy+Mix', type: 'playlist' as 'playlist', themeColor: 'bg-blue-500' },
  { id: 'nobita-chill', title: "Nobita's Chill Beats", creator: 'Nobita Nobi', imageUrl: 'https://placehold.co/300x300/FBBF24/000000?text=Chill+Beats', type: 'playlist' as 'playlist', themeColor: 'bg-yellow-500' },
  { id: 'shizuka-study', title: "Shizuka's Study Session", creator: 'Shizuka Minamoto', imageUrl: 'https://placehold.co/300x300/EC4899/FFFFFF?text=Study+Time', type: 'playlist' as 'playlist', themeColor: 'bg-pink-500' },
];

const newReleases = [
  { id: 'album-future-gadget', title: 'Future Gadget Sounds', creator: 'The Dorayakis', imageUrl: 'https://placehold.co/300x300/10B981/FFFFFF?text=Future+Album', type: 'album' as 'album' },
  { id: 'album-anywhere-door', title: 'Anywhere Door Acoustics', creator: 'Gian Takeshi', imageUrl: 'https://placehold.co/300x300/8B5CF6/FFFFFF?text=Acoustic+Hits', type: 'album' as 'album' },
];

const HomePage: React.FC = () => {
  console.log('HomePage loaded');

  const handleCardPlay = (id: string | number) => {
    console.log(`Play item ${id} from HomePage`);
    // Add play logic here
  };

  const handleCardClick = (id: string | number, type: 'album' | 'playlist') => {
    console.log(`Navigate to ${type}/${id} from HomePage`);
    // Add navigation logic here: navigate(`/${type}/${id}`);
  };

  const carouselSlides = featuredPlaylists.map(item => (
    <AlbumPlaylistCard
      key={item.id}
      {...item}
      onPlay={() => handleCardPlay(item.id)}
      onClick={() => handleCardClick(item.id, item.type)}
    />
  ));

  return (
    <div className="flex bg-neutral-900 min-h-screen text-white">
      <Sidebar />
      <main className="ml-60 flex-1 p-6 overflow-y-auto">
        <header className="mb-8">
          <div className="relative w-full max-w-md">
            <Input
              type="search"
              placeholder="Search for songs, artists, or albums..."
              className="pl-10 bg-neutral-800 border-neutral-700 placeholder-neutral-500 focus:bg-neutral-700 focus:border-blue-500"
            />
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500" />
          </div>
        </header>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-blue-400">Doraemon's Picks</h2>
          <Carousel slides={carouselSlides} options={{ loop: true }} />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">New Releases</h2>
          <ScrollArea className="h-[320px] w-full"> {/* Adjusted height */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 pr-4">
              {newReleases.map(item => (
                <AlbumPlaylistCard
                  key={item.id}
                  {...item}
                  onPlay={() => handleCardPlay(item.id)}
                  onClick={() => handleCardClick(item.id, item.type)}
                />
              ))}
            </div>
          </ScrollArea>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Your Top Genres</h2>
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {['Pop', 'Anime Soundtracks', 'J-Rock', 'Classical'].map(genre => (
              <Card key={genre} className="bg-neutral-800/50 hover:bg-neutral-700/70 cursor-pointer border-neutral-700 rounded-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-yellow-400">{genre}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-neutral-300">Explore {genre.toLowerCase()} music.</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;