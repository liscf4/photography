import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const App = () => {
  const [view, setView] = useState('menu');
  const [activeCategory, setActiveCategory] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // --- 이미지 URL 직접 입력 섹션 ---
  // 깃허브에서 복사한 사진 주소(Raw link)들을 아래 배열에 따옴표와 쉼표로 구분해서 넣어주세요.
  const galleryData = {
    people: [
      "https://liscf4.github.io/portfolio-images/surf%20hats%20inside.jpeg",
      "https://raw.githubusercontent.com/YourID/YourRepo/main/people/image2.jpg",
      // 추가 사진 주소를 여기에 계속 붙여넣으세요.
    ],
    sunset: [
      "https://raw.githubusercontent.com/YourID/YourRepo/main/sunset/image1.jpg",
    ],
    beach: [
      "https://raw.githubusercontent.com/YourID/YourRepo/main/beach/image1.jpg",
    ],
    climbing: [
      "https://raw.githubusercontent.com/YourID/YourRepo/main/climbing/image1.jpg",
    ],
  };

  const categories = [
    { id: 'people', label: 'People' },
    { id: 'sunset', label: 'Sunset' },
    { id: 'beach', label: 'Beach' },
    { id: 'climbing', label: 'Climbing' },
  ];

  const handleOpenCategory = (id) => {
    setActiveCategory(id);
    setView('gallery');
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#fcfcfc] text-zinc-900 overflow-hidden font-serif selection:bg-zinc-100">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&display=swap');
        
        body, button, a, span, div, h1, p {
          font-family: 'Cormorant Garamond', serif !important;
          -webkit-font-smoothing: antialiased;
        }

        .vertical-text { writing-mode: vertical-rl; }

        .no-clip {
          overflow: visible !important;
          white-space: nowrap;
        }

        #gallery-container::-webkit-scrollbar { width: 4px; }
        #gallery-container::-webkit-scrollbar-track { background: transparent; }
        #gallery-container::-webkit-scrollbar-thumb { background: #eee; border-radius: 10px; }
      `}</style>

      {/* --- FLOATING UI --- */}
      <div className="fixed top-10 left-10 right-10 flex justify-between items-start z-[60] pointer-events-none">
        <div className="flex flex-col gap-0 pointer-events-auto cursor-pointer" onClick={() => setView('menu')}>
          <h1 className="text-[15px] tracking-tight font-medium text-zinc-900 leading-none no-clip">Archive</h1>
        </div>
        <button 
          onClick={() => setView('contact')}
          className="text-[14px] tracking-tight font-medium text-zinc-400 hover:text-zinc-900 transition-all pointer-events-auto no-clip"
        >
          Contact
        </button>
      </div>

      {/* --- MAIN MENU --- */}
      <main className={`flex-1 flex flex-col justify-center px-12 md:px-24 relative transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="flex flex-col items-start space-y-2 md:space-y-3 max-w-full">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleOpenCategory(cat.id)}
              className="group relative flex items-center py-1 no-clip pr-24 text-left"
            >
              <span className="text-5xl md:text-8xl font-normal tracking-tightest text-zinc-800 group-hover:italic group-hover:translate-x-6 transition-all duration-700 ease-in-out inline-block">
                {cat.label}
              </span>
            </button>
          ))}
        </div>
        
        <div className="absolute left-12 bottom-12 hidden md:block opacity-20">
          <p className="text-[10px] tracking-tight uppercase vertical-text transform -rotate-180 italic font-normal no-clip">
            Visual Narrative
          </p>
        </div>
      </main>

      {/* --- GALLERY OVERLAY --- */}
      {view === 'gallery' && activeCategory && (
        <div className="fixed inset-0 bg-white z-[100] flex flex-col animate-in fade-in duration-700 overflow-hidden text-zinc-900">
          <div className="flex items-center justify-between px-10 py-6 shrink-0 border-b border-zinc-50">
            <div className="flex flex-col gap-0 no-clip">
              <span className="text-[9px] tracking-tight uppercase text-zinc-300 italic font-normal leading-none mb-1">Collection</span>
              <span className="text-2xl font-medium italic tracking-tighter uppercase leading-none">{activeCategory}</span>
            </div>
            <button 
              onClick={() => setView('menu')}
              className="group p-2"
            >
              <X size={22} strokeWidth={1} className="group-hover:rotate-90 transition-transform duration-500 text-zinc-300 group-hover:text-zinc-900" />
            </button>
          </div>

          <div id="gallery-container" className="flex-1 overflow-y-auto px-1 pb-40 scroll-smooth">
            <div className="flex flex-col gap-1">
              {galleryData[activeCategory] && galleryData[activeCategory].length > 0 ? (
                galleryData[activeCategory].map((url, i) => (
                  <div 
                    key={i} 
                    className={`relative overflow-hidden bg-zinc-50 transition-all duration-1000 ${i % 3 === 0 ? 'aspect-[4/5] mx-4' : 'aspect-square'}`}
                  >
                    <img
                      src={url}
                      alt=""
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[2000ms] hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                ))
              ) : (
                <div className="h-64 flex items-center justify-center text-zinc-200 italic">
                  이 카테고리에 사진 주소를 입력해 주세요.
                </div>
              )}
            </div>
            
            <button 
              onClick={() => {
                document.getElementById('gallery-container').scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="mt-24 w-full flex flex-col items-center gap-4 group"
            >
              <div className="w-[1px] h-12 bg-zinc-100 group-hover:h-20 transition-all duration-700"></div>
              <span className="text-[10px] tracking-tight uppercase text-zinc-300 italic font-normal no-clip">Return to Top</span>
            </button>
          </div>
        </div>
      )}

      {/* --- CONTACT OVERLAY --- */}
      {view === 'contact' && (
        <div className="fixed inset-0 bg-white text-zinc-900 z-[150] flex flex-col animate-in slide-in-from-bottom duration-1000 ease-in-out">
          <div className="flex justify-end p-10">
            <button onClick={() => setView('menu')} className="p-2 group">
              <X size={28} strokeWidth={1} className="group-hover:scale-110 transition-transform text-zinc-300 hover:text-zinc-900" />
            </button>
          </div>
          
          <div className="flex-1 flex flex-col justify-center px-12 md:px-24 text-zinc-900">
            <div className="flex flex-col items-start space-y-12 max-w-full">
              <div className="space-y-4 w-full pr-20">
                <p className="text-[12px] uppercase tracking-tight text-zinc-500 italic font-normal no-clip">Connect</p>
                <div className="flex items-center gap-8 mt-2">
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-zinc-900 transition-colors duration-300"
                    title="Instagram"
                  >
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>

                  <a 
                    href="YOUR_KAKAOTALK_LINK_HERE" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-zinc-900 transition-colors duration-300"
                    title="KakaoTalk"
                  >
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 3c-4.97 0-9 3.11-9 6.93 0 2.43 1.64 4.57 4.14 5.83l-1.05 3.86c-.05.18.06.37.23.42.06.02.12.02.18 0l4.51-2.99c.64.08 1.3.12 1.99.12 4.97 0 9-3.11 9-6.93S16.97 3 12 3z"/>
                    </svg>
                  </a>
                </div>
              </div>

              <div className="space-y-4 w-full pr-20">
                <p className="text-[12px] uppercase tracking-tight text-zinc-500 italic font-normal no-clip">Inquiry</p>
                <a 
                  href="mailto:hello@studio-archive.com" 
                  className="block text-xl md:text-3xl font-medium tracking-tight hover:italic transition-all duration-500 ease-in-out no-clip"
                >
                  hello@studio-archive.com
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;