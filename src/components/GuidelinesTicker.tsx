export default function GuidelinesTicker() {
  const guidelines = [
    { text: "Prepare 3 resumes: Product based, Service based, Startup companies.", highlight: false },
    { text: "No company sends WhatsApp messages before selection.", highlight: false },
    { text: "Never pay money for internships.", highlight: true },
    { text: "Avoid internships that ask for payment.", highlight: true },
    { text: "If the deadline is over, applications get terminated.", highlight: false },
    { text: "Include at least 4 projects in your resume.", highlight: false },
    { text: "2 projects can be practice projects but you must understand at least 50%.", highlight: false },
    { text: "2 projects must be fully understood end-to-end.", highlight: false },
    { text: "Optimize your LinkedIn profile.", highlight: false },
    { text: "Maintain an active GitHub profile.", highlight: false },
    { text: "Referrals can increase your chances.", highlight: false },
    { text: "Companies may conduct AI interviews or one-to-one interviews.", highlight: false },
    { text: "AI interviews are usually easier.", highlight: false },
    { text: "Students with backlogs can sometimes get internships but jobs usually require no backlogs.", highlight: false },
    { text: "Some stipends are fixed, some are performance-based.", highlight: false },
    { text: "Selected candidates receive an Offer Letter then a Joining Letter.", highlight: false },
    { text: "Always clarify stipend details before accepting offers.", highlight: false },
    { text: "Never share personal credentials with unknown recruiters.", highlight: true }
  ];

  return (
    <div className="w-full bg-blue-900 border-b border-blue-800 text-white z-50">
      <div className="ticker-container w-full max-w-7xl mx-auto px-4">
        <div className="ticker-content py-4 gap-6">
          {guidelines.map((item, index) => (
            <div 
              key={index} 
              className={`flex items-start gap-3 ${item.highlight ? 'text-red-400 font-bold bg-red-950/30 p-2 rounded-lg' : 'text-blue-50'}`}
            >
              <div className="mt-1 flex-shrink-0">
                {item.highlight ? (
                  <span className="text-red-500 text-lg leading-none">⚠️</span>
                ) : (
                  <span className="w-2 h-2 rounded-full bg-blue-500 inline-block opacity-60"></span>
                )}
              </div>
              <span className="text-sm md:text-base leading-relaxed tracking-wide">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
