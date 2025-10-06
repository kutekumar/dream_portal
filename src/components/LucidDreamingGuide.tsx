import { Moon, Eye, Brain, CheckCircle, ExternalLink } from 'lucide-react';

export function LucidDreamingGuide() {
  const techniques = [
    {
      title: 'Reality Checks',
      icon: Eye,
      color: 'from-blue-500 to-cyan-500',
      steps: ['Check time twice', 'Try to push finger through palm', 'Question your reality', 'Look at text twice'],
      description: 'Perform throughout the day to build awareness',
    },
    {
      title: 'MILD Technique',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      steps: ['Wake after 5 hours', 'Recall your dream', 'Return to sleep', 'Repeat "I will lucid dream"'],
      description: 'Mnemonic Induction of Lucid Dreams',
    },
    {
      title: 'WBTB Method',
      icon: Moon,
      color: 'from-indigo-500 to-purple-500',
      steps: ['Sleep 5-6 hours', 'Wake for 20-30 min', 'Stay mentally active', 'Return to sleep'],
      description: 'Wake Back To Bed technique',
    },
  ];

  const resources = [
    { title: 'Exploring the World of Lucid Dreaming by Stephen LaBerge', url: 'https://www.goodreads.com/book/show/316781.Exploring_the_World_of_Lucid_Dreaming' },
    { title: 'Reddit Lucid Dreaming Community', url: 'https://www.reddit.com/r/LucidDreaming/' },
    { title: 'The Lucidity Institute', url: 'https://www.lucidity.com/' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
          <Moon className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-5xl font-light text-white mb-4 tracking-wide">Lucid Dreaming Guide</h1>
        <p className="text-xl text-blue-200 font-light">Awaken within your dreams and explore infinite possibilities</p>
      </div>

      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
        <h2 className="text-3xl font-light text-white mb-6">What is Lucid Dreaming?</h2>
        <p className="text-lg text-blue-100 leading-relaxed mb-4">
          Lucid dreaming is the extraordinary experience of becoming aware that you are dreaming while still in the dream state.
          This awareness grants you the ability to consciously navigate, influence, and explore your dream world with intention and clarity.
        </p>
        <p className="text-lg text-blue-100 leading-relaxed">
          With practice, you can learn to fly, visit imaginary places, meet dream characters, solve problems, enhance creativity,
          overcome nightmares, and unlock profound insights about your consciousness.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {techniques.map((technique, index) => {
          const Icon = technique.icon;
          return (
            <div key={index} className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl hover:bg-white/15 transition-all">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${technique.color} flex items-center justify-center mb-6`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-medium text-white mb-3">{technique.title}</h3>
              <p className="text-blue-200 mb-6 text-sm italic">{technique.description}</p>
              <div className="space-y-3">
                {technique.steps.map((step, stepIndex) => (
                  <div key={stepIndex} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">
                      {stepIndex + 1}
                    </div>
                    <p className="text-blue-100 text-sm leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-xl rounded-3xl p-8 border border-purple-400/30 shadow-2xl">
        <h2 className="text-3xl font-light text-white mb-8">The Lucid Dreaming Journey</h2>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-purple-500 to-pink-500" />
          <div className="space-y-6 ml-12">
            {[
              { phase: 'Preparation', desc: 'Keep a dream journal, improve dream recall, practice reality checks daily' },
              { phase: 'Recognition', desc: 'Notice dream signs, question reality, develop critical awareness' },
              { phase: 'Stabilization', desc: 'Stay calm when lucid, engage senses, spin or touch objects to maintain lucidity' },
              { phase: 'Control', desc: 'Set intentions, practice flying, summon objects, explore freely' },
              { phase: 'Mastery', desc: 'Extended lucid dreams, complex scenarios, spiritual exploration' },
            ].map((stage, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-14 top-2 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg border-2 border-white/20">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <h3 className="text-xl font-medium text-white mb-2">{stage.phase}</h3>
                  <p className="text-blue-200 leading-relaxed">{stage.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
        <h2 className="text-3xl font-light text-white mb-6">Essential Tips</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            'Write dreams immediately upon waking',
            'Sleep 7-9 hours for optimal REM cycles',
            'Avoid screens 1 hour before bed',
            'Create a consistent sleep schedule',
            'Meditate to enhance awareness',
            'Stay patient - it takes practice',
            'Set clear intentions before sleep',
            'Use affirmations: "I will know I\'m dreaming"',
          ].map((tip, index) => (
            <div key={index} className="flex items-center gap-3 bg-white/5 rounded-xl p-4 border border-white/10">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
              <span className="text-blue-100">{tip}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
        <h2 className="text-3xl font-light text-white mb-6 flex items-center gap-3">
          <ExternalLink className="w-7 h-7 text-purple-300" />
          Learn More
        </h2>
        <div className="space-y-3">
          {resources.map((resource, index) => (
            <a
              key={index}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-5 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-purple-400/50 transition-all group"
            >
              <span className="text-blue-100 group-hover:text-white transition-colors">{resource.title}</span>
              <ExternalLink className="w-5 h-5 text-purple-300 group-hover:text-purple-200 transition-colors" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
