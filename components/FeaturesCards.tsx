import {
    SparklesIcon,
    ShieldCheckIcon,
    BoltIcon,
  } from "@heroicons/react/24/outline";
  
  const features = [
    {
      title: "Fast Performance",
      description:
        "Experience blazing speed with our optimized infrastructure that ensures quick load times and smooth operation.",
      icon: BoltIcon,
    },
    {
      title: "Secure & Reliable",
      description:
        "Your data is protected with top-notch security and constant backups for peace of mind.",
      icon: ShieldCheckIcon,
    },
    {
      title: "Modern Aesthetics",
      description:
        "Sleek and minimal design combined with subtle animations to elevate user experience.",
      icon: SparklesIcon,
    },
  ];
  
  const FeaturesCards = () => {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 border-t border-gray-200  mt-8">
        <h2 className="text-center text-4xl font-bold text-gray-900">
          Features
        </h2>
  
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 mt-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="relative rounded-2xl border border-gray-300 bg-white shadow-xl p-6 overflow-hidden"
              >
                {/* Shining line */}
                <div className="absolute left-1/2 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-gray-200 to-transparent animate-pulse-glow z-10"></div>
  
                {/* Soft center glow */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-gray-300/20 blur-2xl opacity-30 z-0"></div>
  
                <div className="relative z-20 text-center">
                  <div className="mx-auto mb-4 w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full border border-gray-300">
                    <Icon className="w-6 h-6 text-gray-700" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  export default FeaturesCards;
  