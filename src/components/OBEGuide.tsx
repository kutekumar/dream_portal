import { Sparkles, Layers, Zap, AlertCircle, ExternalLink } from 'lucide-react';

export function OBEGuide() {
  const techniques = [
    {
      title: 'Rope Technique',
      icon: Layers,
      color: 'from-cyan-500 to-blue-500',
      description: 'Visualize climbing an invisible rope above you',
      steps: [
        'Lie down in a comfortable position',
        'Relax your entire body deeply',
        'Visualize a rope hanging above you',
        'Imagine pulling yourself up the rope',
        'Feel the sensation of upward movement',
        'Maintain focus until separation occurs',
      ],
    },
    {
      title: 'Roll-Out Method',
      icon: Zap,
      color: 'from-purple-500 to-pink-500',
      description: 'Roll your astral body out of your physical body',
      steps: [
        'Achieve deep physical relaxation',
        'Enter a hypnagogic state',
        'Visualize rolling to your side',
        'Imagine the sensation of rolling',
        'Don\'t move your physical body',
        'Continue until you feel separation',
      ],
    },
    {
      title: 'Vibrational State',
      icon: Sparkles,
      color: 'from-indigo-500 to-purple-500',
      description: 'Use energy vibrations to separate consciousness',
      steps: [
        'Meditate to a deeply relaxed state',
        'Notice subtle body vibrations',
        'Amplify the vibrational sensation',
        'Guide vibrations through your body',
        'Visualize lifting out at peak intensity',
        'Separate with calm intention',
      ],
    },
  ];

  const safetyGuidelines = [
    'Practice in a safe, quiet environment',
    'Never attempt while under influence',
    'Start with short sessions (10-20 min)',
    'Always set positive intentions',
    'Ground yourself after experiences',
    'Keep a journal of your experiences',
    'Respect your mental limits',
    'Discontinue if you feel uncomfortable',
  ];

  const resources = [
    { title: 'Journeys Out of the Body by Robert Monroe', url: 'https://www.goodreads.com/book/show/187919.Journeys_Out_of_the_Body' },
    { title: 'The Monroe Institute', url: 'https://www.monroeinstitute.org/' },
    { title: 'Astral Projection Research', url: 'https://www.reddit.com/r/AstralProjection/' },
    { title: 'Scientific Studies on OBEs', url: 'https://www.frontiersin.org/articles/10.3389/fpsyg.2014.01390/full' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-5xl font-light text-white mb-4 tracking-wide">Out-of-Body Experiences</h1>
        <p className="text-xl text-blue-200 font-light">Explore consciousness beyond physical boundaries</p>
      </div>

      <div className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 backdrop-blur-xl rounded-3xl p-8 border border-yellow-400/30 shadow-2xl">
        <div className="flex items-start gap-4">
          <AlertCircle className="w-8 h-8 text-yellow-300 flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-2xl font-medium text-white mb-3">Important Notice</h2>
            <p className="text-blue-100 leading-relaxed mb-3">
              Out-of-body experiences are profound altered states of consciousness. While many report positive transformative experiences,
              scientific understanding is still evolving. These techniques are shared for educational and exploratory purposes.
            </p>
            <p className="text-blue-100 leading-relaxed">
              If you have any mental health concerns, please consult with a healthcare professional before attempting these practices.
              Always approach with respect, curiosity, and healthy skepticism.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
        <h2 className="text-3xl font-light text-white mb-6">What are OBEs?</h2>
        <p className="text-lg text-blue-100 leading-relaxed mb-4">
          An out-of-body experience is a phenomenon where consciousness appears to separate from the physical body,
          allowing awareness to exist independently and perceive the environment from a different perspective.
        </p>
        <p className="text-lg text-blue-100 leading-relaxed mb-4">
          Throughout history, these experiences have been reported across cultures and are described in mystical traditions,
          modern parapsychology, and even some neuroscientific research. Whether interpreted as literal astral travel,
          vivid hallucinations, or altered states of consciousness, OBEs remain fascinating explorations of human awareness.
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
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">
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

      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
        <h2 className="text-3xl font-light text-white mb-8">Preparation Process</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-white mb-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-400" />
              Physical Preparation
            </h3>
            {[
              'Find a quiet, comfortable space',
              'Lie down in a relaxed position',
              'Wear loose, comfortable clothing',
              'Ensure comfortable room temperature',
              'Minimize external disturbances',
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3 bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                <span className="text-blue-100">{item}</span>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-white mb-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-400" />
              Mental Preparation
            </h3>
            {[
              'Meditate for 10-15 minutes',
              'Clear your mind of distractions',
              'Set clear, positive intentions',
              'Cultivate curiosity and openness',
              'Release fear and expectations',
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3 bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                <span className="text-blue-100">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-red-600/20 to-pink-600/20 backdrop-blur-xl rounded-3xl p-8 border border-red-400/30 shadow-2xl">
        <h2 className="text-3xl font-light text-white mb-6 flex items-center gap-3">
          <AlertCircle className="w-7 h-7 text-red-300" />
          Safety Guidelines
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {safetyGuidelines.map((guideline, index) => (
            <div key={index} className="flex items-center gap-3 bg-white/5 rounded-xl p-4 border border-white/10">
              <AlertCircle className="w-5 h-5 text-red-300 flex-shrink-0" />
              <span className="text-blue-100">{guideline}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
        <h2 className="text-3xl font-light text-white mb-6">Common Sensations</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { sensation: 'Vibrations', desc: 'Intense energy waves through body' },
            { sensation: 'Paralysis', desc: 'Temporary inability to move (normal)' },
            { sensation: 'Floating', desc: 'Sensation of weightlessness' },
            { sensation: 'Buzzing', desc: 'Electrical-like sounds or feelings' },
            { sensation: 'Separation', desc: 'Feeling of lifting or rolling out' },
            { sensation: 'Clarity', desc: 'Heightened awareness and perception' },
          ].map((item, index) => (
            <div key={index} className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-5 border border-white/10">
              <h3 className="text-lg font-medium text-white mb-2">{item.sensation}</h3>
              <p className="text-blue-200 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
        <h2 className="text-3xl font-light text-white mb-6 flex items-center gap-3">
          <ExternalLink className="w-7 h-7 text-cyan-300" />
          Further Reading
        </h2>
        <div className="space-y-3">
          {resources.map((resource, index) => (
            <a
              key={index}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-5 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-cyan-400/50 transition-all group"
            >
              <span className="text-blue-100 group-hover:text-white transition-colors">{resource.title}</span>
              <ExternalLink className="w-5 h-5 text-cyan-300 group-hover:text-cyan-200 transition-colors" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
