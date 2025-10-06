import { useState, useRef } from 'react';
import { Sparkles, Mic, MicOff } from 'lucide-react';

interface DreamInputProps {
  onSubmit: (dreamText: string) => void;
  isLoading: boolean;
}

export function DreamInput({ onSubmit, isLoading }: DreamInputProps) {
  const [dreamText, setDreamText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dreamText.trim()) {
      onSubmit(dreamText);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks: Blob[] = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        stream.getTracks().forEach(track => track.stop());
        setDreamText(prev => prev + ' [Audio recording captured - transcription would require additional API]');
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Could not access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <img src="https://image2url.com/images/1759735629445-be8b808c-2b2e-4c2e-8319-d69f43108809.png" alt="Dream Portal Logo" className="w-20 h-20 mb-6 mx-auto" />
        <h1 className="text-5xl font-light text-white mb-4 tracking-wide font-cinzel">Dream Portal</h1>
        <p className="text-xl text-blue-200 font-light">Enter your dream and unlock its hidden meanings</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
          <label className="block text-white text-lg font-light mb-4">
            Your Dream
          </label>
          <textarea
            value={dreamText}
            onChange={(e) => setDreamText(e.target.value)}
            placeholder="I was walking through a forest of crystalline trees, when suddenly..."
            className="w-full h-48 px-6 py-4 bg-white/90 backdrop-blur-sm rounded-2xl border-2 border-white/30 focus:border-purple-400 focus:ring-4 focus:ring-purple-400/20 outline-none transition-all resize-none text-gray-800 placeholder-gray-400 text-lg leading-relaxed"
            disabled={isLoading}
          />

          <div className="flex items-center gap-4 mt-4">
            <button
              type="button"
              onClick={isRecording ? stopRecording : startRecording}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                isRecording
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
              disabled={isLoading}
            >
              {isRecording ? (
                <>
                  <MicOff className="w-5 h-5" />
                  Stop Recording
                </>
              ) : (
                <>
                  <Mic className="w-5 h-5" />
                  Record Audio
                </>
              )}
            </button>
            {isRecording && (
              <div className="flex items-center gap-2 text-red-300">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                Recording...
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !dreamText.trim()}
          className="w-full py-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-xl font-medium rounded-2xl hover:shadow-2xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-3">
              <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
              Interpreting your dream...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-3">
              <Sparkles className="w-6 h-6" />
              Unlock Dream Meaning
            </span>
          )}
        </button>
      </form>
    </div>
  );
}
