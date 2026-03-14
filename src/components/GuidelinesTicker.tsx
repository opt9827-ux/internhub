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
    <div className="guidelines-sidebar">
      <div className="ticker-content">
        {guidelines.map((item, index) => (
          <div 
            key={index} 
            className={`flex items-start gap-3 p-3 rounded-lg border ${item.highlight ? 'bg-red-50 border-red-100' : 'bg-white border-gray-100 shadow-sm'}`}
          >
            <div className="mt-1 flex-shrink-0">
              {item.highlight ? (
                <span className="text-red-500 text-lg leading-none">⚠️</span>
              ) : (
                <span className="w-2 h-2 rounded-full bg-blue-500 inline-block opacity-60"></span>
              )}
            </div>
            <span className={`text-sm leading-relaxed tracking-wide ${item.highlight ? 'text-red-700 font-semibold' : 'text-gray-700'}`}>
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
