import { Download, Sparkles, Eye, Brain, Heart } from 'lucide-react';
import type { Dream } from '../lib/supabase';
import { generatePDF } from '../lib/pdfGenerator';

interface DreamVisualizationProps {
  dream: Dream;
  onNewDream: () => void;
}

export function DreamVisualization({ dream, onNewDream }: DreamVisualizationProps) {
  const { interpretation, visual_data } = dream;

  if (!interpretation || !visual_data) return null;

  const handleDownload = () => {
    generatePDF(dream);
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 animate-fadeIn">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
          <Eye className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-5xl font-light text-white mb-4 tracking-wide">Your Dream Revealed</h1>
        <p className="text-xl text-blue-200 font-light">A mystical journey through your subconscious</p>
      </div>

      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
        <div className="flex items-start gap-4 mb-6">
          <Brain className="w-8 h-8 text-purple-300 flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-2xl font-light text-white mb-3">Dream Essence</h2>
            <p className="text-lg text-blue-100 leading-relaxed">{interpretation.summary}</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
          <h3 className="text-2xl font-light text-white mb-6 flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-yellow-300" />
            Themes Discovered
          </h3>
          <div className="space-y-4">
            {interpretation.themes.map((theme, index) => (
              <div key={index} className="bg-white/5 rounded-2xl p-5 border border-white/10">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg font-medium text-white">{theme.name}</h4>
                  <span className="text-sm text-purple-300 font-medium">{theme.intensity}%</span>
                </div>
                <p className="text-blue-200 text-sm mb-3">{theme.description}</p>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-1000"
                    style={{ width: `${theme.intensity}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
          <h3 className="text-2xl font-light text-white mb-6 flex items-center gap-3">
            <Heart className="w-6 h-6 text-pink-300" />
            Emotional Landscape
          </h3>
          <div className="space-y-4">
            {interpretation.emotions.map((emotion, index) => (
              <div key={index} className="bg-white/5 rounded-2xl p-5 border border-white/10">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-lg font-medium text-white">{emotion.name}</h4>
                  <span className="text-sm text-purple-300 font-medium">{emotion.intensity}%</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${emotion.intensity}%`,
                      backgroundColor: emotion.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
        <h3 className="text-2xl font-light text-white mb-6">Symbolic Universe</h3>
        <div className="relative h-96 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-2xl border border-white/10 overflow-hidden">
          <div className="absolute inset-0">
            {visual_data.symbolMap.map((symbol, index) => (
              <div
                key={index}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-float"
                style={{
                  left: `${symbol.x}%`,
                  top: `${symbol.y}%`,
                  animationDelay: `${index * 0.2}s`,
                }}
              >
                <div
                  className="rounded-full flex items-center justify-center shadow-lg border-2 border-white/20 backdrop-blur-sm cursor-pointer hover:scale-110 transition-transform group relative"
                  style={{
                    width: `${symbol.size}px`,
                    height: `${symbol.size}px`,
                    backgroundColor: `${symbol.color}40`,
                    borderColor: symbol.color,
                  }}
                >
                  <span className="text-white text-xs font-medium">
                    {symbol.symbol.slice(0, 3)}
                  </span>
                  <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-900 text-white text-xs py-2 px-3 rounded-lg whitespace-nowrap z-10">
                    {symbol.symbol}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          {interpretation.symbols.slice(0, 8).map((symbol, index) => (
            <div
              key={index}
              className="bg-white/5 rounded-xl p-3 border-l-4 hover:bg-white/10 transition-colors"
              style={{ borderLeftColor: symbol.color }}
            >
              <div className="text-white font-medium text-sm mb-1">{symbol.name}</div>
              <div className="text-blue-200 text-xs">{symbol.meaning}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-xl rounded-3xl p-8 border border-purple-400/30 shadow-2xl">
        <h3 className="text-2xl font-light text-white mb-6">Key Insights</h3>
        <div className="space-y-4">
          {interpretation.insights.map((insight, index) => (
            <div
              key={index}
              className="flex gap-4 items-start bg-white/5 rounded-2xl p-5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                {index + 1}
              </div>
              <p className="text-blue-100 leading-relaxed pt-1">{insight}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-600/30 to-purple-600/30 backdrop-blur-xl rounded-3xl p-10 border border-blue-400/30 shadow-2xl text-center">
        <div className="mb-6">
          <div className="text-7xl font-bold text-white mb-3">
            {visual_data.lucidScore}%
          </div>
          <div className="text-xl text-blue-200 font-light">Lucid Dream Potential</div>
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="h-4 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full transition-all duration-1000"
              style={{ width: `${visual_data.lucidScore}%` }}
            />
          </div>
          <p className="text-blue-200 mt-4 leading-relaxed">
            {visual_data.lucidScore >= 70
              ? 'High potential for lucid dreaming! Your dream shows strong self-awareness.'
              : visual_data.lucidScore >= 40
              ? 'Moderate lucid potential. With practice, you can enhance dream awareness.'
              : 'Begin your lucid dreaming journey by setting intentions before sleep.'}
          </p>
        </div>
      </div>

      <div className="flex gap-4 justify-center">
        <button
          onClick={handleDownload}
          className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-lg font-medium rounded-2xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
        >
          <Download className="w-5 h-5" />
          Download Dream Journal
        </button>
        <button
          onClick={onNewDream}
          className="flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-xl text-white text-lg font-medium rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-[1.02] transition-all duration-300"
        >
          <Sparkles className="w-5 h-5" />
          Interpret New Dream
        </button>
      </div>
    </div>
  );
}
