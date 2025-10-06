import { useState } from 'react';
import { Sparkles, Moon, Eye, Menu, X } from 'lucide-react';
import { DreamInput } from './components/DreamInput';
import { DreamVisualization } from './components/DreamVisualization';
import { LucidDreamingGuide } from './components/LucidDreamingGuide';
import { OBEGuide } from './components/OBEGuide';
import { supabase, type Dream } from './lib/supabase';
import { interpretDream } from './lib/dreamInterpreter';

type View = 'home' | 'lucid' | 'obe';

function App() {
  const [view, setView] = useState<View>('home');
  const [currentDream, setCurrentDream] = useState<Dream | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleDreamSubmit = async (dreamText: string) => {
    setIsLoading(true);
    try {
      const sessionId = crypto.randomUUID();
      const { interpretation, visualData } = await interpretDream(dreamText);

      const { data, error } = await supabase
        .from('dreams')
        .insert({
          dream_text: dreamText,
          interpretation,
          visual_data: visualData,
          session_id: sessionId,
        })
        .select()
        .single();

      if (error) throw error;

      setCurrentDream(data);
    } catch (error) {
      console.error('Error processing dream:', error);
      alert('Failed to interpret dream. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewDream = () => {
    setCurrentDream(null);
  };

  const navItems = [
    { id: 'home' as View, label: 'Dream Portal', icon: Sparkles },,
    { id: 'lucid' as View, label: 'Lucid Dreaming', icon: Moon },
    { id: 'obe' as View, label: 'Out-of-Body', icon: Eye },
  ];

  return (
    <div className="min-h-screen bg-[url('https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg')] bg-cover bg-center relative overflow-hidden">
      <div className="absolute inset-0 bg-black/85" />

      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative z-10">
        <nav className="border-b border-white/10 backdrop-blur-xl bg-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <div className="flex items-center gap-3">
                <img src="/src/imgs/dreamlogo.png" alt="Dream Portal Logo" className="w-12 h-12" />
                <span className="text-2xl font-light text-white tracking-wide hidden sm:block font-cinzel">Dream Portal</span>
              </div>

              <div className="hidden md:flex items-center gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setView(item.id);
                        setCurrentDream(null);
                      }}
                      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                        view === item.id
                          ? 'bg-white/20 text-white'
                          : 'text-blue-200 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-white hover:bg-white/10"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden border-t border-white/10 bg-white/5 backdrop-blur-xl">
              <div className="px-4 py-4 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setView(item.id);
                        setCurrentDream(null);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                        view === item.id
                          ? 'bg-white/20 text-white'
                          : 'text-blue-200 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </nav>

        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {view === 'home' && (
            <>
              {currentDream ? (
                <DreamVisualization dream={currentDream} onNewDream={handleNewDream} />
              ) : (
                <DreamInput onSubmit={handleDreamSubmit} isLoading={isLoading} />
              )}
            </>
          )}
          {view === 'lucid' && <LucidDreamingGuide />}
          {view === 'obe' && <OBEGuide />}
        </main>

        <footer className="border-t border-white/10 backdrop-blur-xl bg-white/5 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center text-blue-200 text-sm">
              <p>Powered By</p>
              <a href="https://www.linkedin.com/in/kumar-koirala/" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-white">
                Kumar Koirala
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;