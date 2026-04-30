import React from 'react';
import { Link } from 'react-router-dom';

const ChatRoom = () => {
  return (
    <div className="font-body-md text-on-surface antialiased overflow-hidden min-h-screen bg-[#050505]">
      {/* SideNavBar Shell */}
      <aside className="fixed left-0 top-0 h-full flex flex-col py-8 bg-[#121214] w-64 border-r border-white/5 shadow-2xl font-headline-lg tracking-tight z-50">
        <div className="px-6 mb-10">
          <Link to="/dashboard" className="text-xl font-bold text-white tracking-widest uppercase mb-1 hover:text-cyan-400 transition-colors block">Sonic Noir</Link>
          <p className="text-[10px] text-gray-500 tracking-[0.2em] uppercase">Premium Lounge</p>
        </div>
        <nav className="flex-1 space-y-2">
          <Link to="/dashboard" className="flex items-center px-6 py-3 text-gray-500 hover:text-gray-300 hover:bg-white/5 transition-all duration-200 ease-out group">
            <span className="material-symbols-outlined mr-4" data-icon="home">home</span>
            <span className="font-medium">Home</span>
          </Link>
          <Link to="#" className="flex items-center px-6 py-3 text-gray-500 hover:text-gray-300 hover:bg-white/5 transition-all duration-200 ease-out group">
            <span className="material-symbols-outlined mr-4" data-icon="explore">explore</span>
            <span className="font-medium">Explore</span>
          </Link>
          {/* Active Tab: Rooms */}
          <Link to="/chat" className="flex items-center px-6 py-3 text-white border-l-4 border-[#00E5FF] bg-gradient-to-r from-[#00E5FF]/10 to-transparent transition-all duration-200 ease-out">
            <span className="material-symbols-outlined mr-4 text-[#00E5FF]" data-icon="forum">forum</span>
            <span className="font-medium">Rooms</span>
          </Link>
          <Link to="#" className="flex items-center px-6 py-3 text-gray-500 hover:text-gray-300 hover:bg-white/5 transition-all duration-200 ease-out group">
            <span className="material-symbols-outlined mr-4" data-icon="library_music">library_music</span>
            <span className="font-medium">Library</span>
          </Link>
          <Link to="#" className="flex items-center px-6 py-3 text-gray-500 hover:text-gray-300 hover:bg-white/5 transition-all duration-200 ease-out group">
            <span className="material-symbols-outlined mr-4" data-icon="settings">settings</span>
            <span className="font-medium">Settings</span>
          </Link>
        </nav>
        <div className="px-6 mt-auto">
          <button className="w-full py-3 px-4 rounded-lg border-2 border-primary-container/30 text-primary-container font-semibold text-sm hover:bg-primary-container/10 hover:border-primary-container transition-all scale-[0.98] active:scale-95 flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-sm" data-icon="add">add</span>
            New Session
          </button>
          <div className="mt-8 flex items-center gap-3">
            <img alt="User profile" className="w-10 h-10 rounded-full border border-white/10 object-cover" data-alt="A close-up high-fashion portrait of a young man with a focused expression, softly lit by cool-toned ambient light reflecting the nocturnal music lounge aesthetic. The background is a blurred obsidian black with subtle cyan light leaks, maintaining a premium and sophisticated atmosphere consistent with a high-fidelity audio app user profile." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBvajbAuTC7T5NrwhrBtzUnB1U8ZonfaZdxia9ppXPZnP1-MFLYUK0e2L5ff4YlkPpPLKZDLEcMLlr3RX4j3Zk9u9h3jvYGnZaEUGS3fncSs5yDt7uSkxyYZlH4EpcAd6o5sZ0cjc-QOwo_uQFWkhORPmwhpRoSxK6eb91dviVqMnGtMfee4pMl7oxF8QhLELbUompGh--_q1GcqsTCBVZ30yY3GYyo9w7-4GY_Q1cxxcTkKeIKJPLuzVedpnI_BjzzrL7IMThlArf"/>
            <div>
              <p className="text-sm font-semibold text-white">Alex Volkov</p>
              <p className="text-[10px] text-[#00E5FF]">Audiophile Elite</p>
            </div>
          </div>
        </div>
      </aside>
      
      {/* Main Content Area */}
      <main className="ml-64 flex flex-col h-screen bg-[#050505]">
        {/* TopAppBar */}
        <header className="flex justify-between items-center px-6 h-16 bg-[#050505]/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-40 font-headline-lg font-medium">
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-white leading-tight">Lounge Chat</span>
            <span className="text-[10px] text-[#00E5FF] tracking-widest uppercase">Midnight Chill Lounge</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative hidden lg:block">
              <input className="bg-surface-container-low border border-white/10 rounded-full py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:border-[#00E5FF]/50 w-64 transition-colors text-white placeholder-gray-500" placeholder="Search track or user..." type="text"/>
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" data-icon="search">search</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-gray-400 hover:text-white transition-colors opacity-80 hover:opacity-100">
                <span className="material-symbols-outlined" data-icon="group">group</span>
              </button>
              <button className="text-gray-400 hover:text-white transition-colors opacity-80 hover:opacity-100">
                <span className="material-symbols-outlined" data-icon="info">info</span>
              </button>
            </div>
          </div>
        </header>
        
        {/* Room Header / Members */}
        <section className="px-gutter pt-8 pb-4 flex items-end justify-between">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-white mb-2">Midnight Chill Lounge</h2>
            <p className="font-body-md text-on-surface-variant max-w-xl">A place to relax and share deep beats. Late night frequencies only.</p>
          </div>
          <div className="flex items-center -space-x-3 mb-1">
            <img className="w-10 h-10 rounded-full border-2 border-surface object-cover relative z-30" data-alt="A portrait of a woman with a serene expression, bathed in soft neon cyan lighting that complements the dark nocturnal lounge aesthetic. The style is high-contrast and minimalist, evoking a sense of premium membership in an exclusive digital music community." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvWnwQRyTdFvU_3rI-yYmvtTEOH6u6IYFUz7ucj5on3F5Vzlok3V-AxcU_WvDDFmt67HqNf1swZNdzDvNr_izxkBKm3m4B-8G9oCg7nR18I3K6Ld5e627Xn-H2z6gZsnl1M0m1GCLXMzjJY1TBcXfY3xdCyMiC_bqjfTg79eEaSXoLjqCGqBrf-1Ijbf0UEFWaaCc-aAN3YY58c9swNw4GCXHg163zr_rcicMgcD52Qd4NftLbFaHUEayMVA7KfY_YA8psn4krwFyQ"/>
            <img className="w-10 h-10 rounded-full border-2 border-surface object-cover relative z-20" data-alt="A professional headshot of a creative professional in a dark studio setting, with subtle rim lighting in neon green shades. The image maintains the sophisticated, rhythmic, and nocturnal mood of the Sonic Noir brand, featuring deep shadows and sharp focus." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSbcpoZYPgNUYespPkJpLTlced_mAV1_gjYKChclQc4yV4xZpAUKf6GuiBlAha-FX0VAGnpRYX8TapaOeqAkGw73HX7w_NBLQWWrKxt6iQ0JxCF7xNQmIRURFEZtf_QcfIq2KLfBX7iHQ3zmsSh0AIKwOdPhpnQg3g0zE5NTfERpihZdspN4FCWohJKfFikBk6z9XN06Gi7pJ5KewD9yIJYxhgt0BRB1p7710vC_o9W8wkhgYdXf9BmfvbulZYMNUzHNOlX9KkDjLu"/>
            <img className="w-10 h-10 rounded-full border-2 border-surface object-cover relative z-10" data-alt="A young man looking thoughtfully away from the camera, illuminated by low-key, atmospheric lighting with blue and teal highlights. The setting suggests a premium music lounge environment, dark and immersive with a minimalist high-tech aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkohT3zykBvSJL9Ko2JZfj5gvzKbozJfRPNq-GxuRlTgpk1vgXe-JNjcr_ueggMBw7-4Uj-wqZoVnX_aYRD2ddyRuFKcC-RYjXEliAGPLiEy3Sgg-z7LeaOFsmDFxt5filQpsgAJWLerBoWtgRqQoJ4sbF2tWDpqxFAsNJnjtqRqpvUGfwbyykw9cGeaAwmygWzk-6FF762TWI0fdIB6Lzwf_ckyIZmclrTHM8ip4UZGIoXmfSQ-qaFjgMwrINCuWl0JUwPJaLcHMN"/>
            <div className="w-10 h-10 rounded-full border-2 border-surface bg-surface-container-high flex items-center justify-center text-[10px] font-bold text-[#00E5FF] relative z-0">
              +24
            </div>
          </div>
        </section>
        
        {/* Layout Grid: Chat + Queue */}
        <div className="flex-1 grid grid-cols-12 gap-gutter px-gutter pb-32 overflow-hidden">
          {/* Chat Interface */}
          <div className="col-span-12 lg:col-span-8 flex flex-col bg-surface-container-low/30 rounded-xl border border-white/5 backdrop-blur-sm overflow-hidden">
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar scrollbar-thin scrollbar-thumb-primary-container/20 hover:scrollbar-thumb-primary-container/40">
              {/* Message Other */}
              <div className="flex items-start gap-4">
                <img className="w-8 h-8 rounded-full object-cover" data-alt="A stylish woman with headphones around her neck, lit by vibrant, low-key lighting in shades of purple and deep obsidian. The aesthetic is sophisticated and rhythmic, capturing the essence of a nocturnal music curator in a premium digital environment." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXvlo1nJqZkUX50VFgPnBLYw9UqpX3Q7ZeomNQAnb-2TgzcBGFc1RUVD4VNzjFbO3nVHvjc6-Gyt7eg7Kmt1DQq_1_7-5gppT7NzV7hr7rIk10awx00K-HLxZjN_3L_6rhdKJN16h3cea_pCn5ewpPGdNmSUfHgaYTyjZTeDy81UiJmRgBw4ueyd_QUNxEW1pgHcTrCH_ca0uMsRVpT24uePb9q4uoqwNKA1Qs97iObIxPt7E5yNKb-_W2pXR69xpu38R7ccMeeD_F"/>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 mb-1">Mina S. <span className="font-normal ml-2 opacity-50">22:04</span></p>
                  <div className="bg-white/5 border border-white/5 rounded-2xl rounded-tl-none px-4 py-3 text-sm max-w-md text-on-surface">
                    That last bassline from the Burial track was incredible. Who added it?
                  </div>
                </div>
              </div>
              
              {/* Message Me */}
              <div className="flex items-start gap-4 justify-end">
                <div className="text-right">
                  <p className="text-[10px] font-bold text-[#00E5FF] mb-1">You <span className="font-normal ml-2 text-gray-500">22:05</span></p>
                  <div className="bg-primary-container/10 border border-primary-container/20 rounded-2xl rounded-tr-none px-4 py-3 text-sm max-w-md text-white">
                    Glad you liked it! It's from his latest EP. Pure nocturnal vibes.
                  </div>
                </div>
                <img className="w-8 h-8 rounded-full object-cover" data-alt="User avatar close-up portrait with dark obsidian background and soft cyan lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvaoSDQBuq0OSwAJ38o9v6hVrlIAw7T_2GY58o3nJX8MZr_3zlObaKV9JHPSjBcESl5oBV34YcjiLiQ2-JjvDPLvmMzkIzXeOyvYJ95sEUt8vhQMZzIgE75_D1zjsVt1HF6IwvIZ9d9j_HTqiJ1Wt1HWYN0q_7zHIx_e3_kOQlV1Z3HbS02p2QB-dIrT6GnPC_GtUWzuXgpnuU_Bui8PDk-d1SAxSx1plso99at8ZaM63mZ9JmthvcZSX2JdN9R6AWFoqLWHKsOklE"/>
              </div>
              
              {/* System Event */}
              <div className="flex justify-center">
                <span className="text-[10px] uppercase tracking-widest text-gray-600 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                  Marcus just added "Night City" to the queue
                </span>
              </div>
              
              {/* Message Other */}
              <div className="flex items-start gap-4">
                <img className="w-8 h-8 rounded-full object-cover" data-alt="A bearded man with a serene expression, illuminated by neon mint green rim light against a pitch-black background. The mood is calm and deep, perfectly fitting for an audiophile lounge chat participant." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3s95n0ZlmxYyVzfzrlawWZwJt7oDjSX_TYKfv15tF4FY55_IVRoTsTe0jI62JLWhoq8Rt9USbZg56rpvFlDqsZledmFNGt25OTPGnc1tIsRwBKpYEnUTCFo4IFdwvjDn4ti4v2dTiZzr1etECI2S84qd6ANNcO3zOsa4EVz7OkugiQPeEITZkm_nV0tuJWZTXkegL9gZ34RbN0DAOm5Cbk6kU3iFMtj_lM1YbhF4xtchaGVoMscNxw4fDbc6Q_1763fWzqFF1aWq-"/>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 mb-1">Marcus <span className="font-normal ml-2 opacity-50">22:07</span></p>
                  <div className="bg-white/5 border border-white/5 rounded-2xl rounded-tl-none px-4 py-3 text-sm max-w-md text-on-surface">
                    Adding some synth-wave textures to keep the flow going. Check this out.
                  </div>
                </div>
              </div>
              
              {/* Message Me */}
              <div className="flex items-start gap-4 justify-end">
                <div className="text-right">
                  <p className="text-[10px] font-bold text-[#00E5FF] mb-1">You <span className="font-normal ml-2 text-gray-500">22:08</span></p>
                  <div className="bg-primary-container/10 border border-primary-container/20 rounded-2xl rounded-tr-none px-4 py-3 text-sm max-w-md text-white">
                    Perfect transition.
                  </div>
                </div>
                <img className="w-8 h-8 rounded-full object-cover" data-alt="User avatar close-up portrait with dark obsidian background and soft cyan lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAk6EUarC2LHSMxkzQt__fnilOXXLe_G9sTGD6-RzqWOH6NrqkWTNYA7GeKYPEya9BashHd_o3G3EZHbh1y9KUx6ilS-k3zyztCjDGBw2DgYzYZSIJfXT13NTWfbqlzmyhbfRA2G6xAt-XeJtIkUSnBGN6rnD4tWMoxODeMDMN2uJWwH5Bc8XS_NUuM-ZEMg063JbLUU3B7kD06O36kEfVywbSboTHrwkbBieqpqlZG-_OVrs9afWzjRoSfTT6hfzXSK6sikrJpFayB"/>
              </div>
            </div>
            
            {/* Chat Input */}
            <div className="p-6 bg-surface-container-low border-t border-white/5">
              <div className="relative flex items-center">
                <input className="w-full bg-[#050505] border border-white/10 rounded-xl py-4 pl-6 pr-16 text-sm text-white focus:outline-none focus:border-primary-container/50 transition-all placeholder:text-gray-600 outline-none" placeholder="Type here..." type="text"/>
                <div className="absolute right-4 flex items-center gap-2">
                  <button className="p-2 text-gray-500 hover:text-white transition-colors">
                    <span className="material-symbols-outlined" data-icon="mood">mood</span>
                  </button>
                  <button className="p-2 bg-primary-container text-on-primary rounded-lg flex items-center justify-center active:scale-95 transition-transform hover:opacity-90">
                    <span className="material-symbols-outlined" data-icon="send">send</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Side Panel: Shared Queue */}
          <div className="hidden lg:block lg:col-span-4 space-y-6">
            <div className="bg-[#121214] rounded-xl border border-white/5 p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold text-white tracking-widest uppercase">Shared Queue</h3>
                <span className="text-[10px] text-primary-container font-semibold">12 Tracks</span>
              </div>
              <div className="space-y-1 flex-1 overflow-y-auto custom-scrollbar pr-2 scrollbar-thin scrollbar-thumb-primary-container/20 hover:scrollbar-thumb-primary-container/40">
                {/* Queue Item Active */}
                <div className="group flex items-center gap-4 p-3 rounded-lg bg-white/5 border border-[#00E5FF]/20 relative overflow-hidden">
                  <div className="absolute left-0 top-0 w-1 h-full bg-[#00E5FF]"></div>
                  <img className="w-10 h-10 rounded-md object-cover" data-alt="Abstract digital album art featuring deep indigo and neon cyan waves, pulsating like visual frequencies. The style is minimalist and high-fidelity, designed to glow against a dark charcoal background as a representation of ambient electronic music." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkVdYLICpJYFq6hYeNkAAKY54e3PBidC3Sq_tYGNs6rnV9sSl4jNNc49sKfw1Hyh3QHDvq6nlvK0fP5XGXzr4bVvY8OeHhqY7pgImrvlNHIG08gVkhG_FvLkaqySH_-3t7RQb4ClIUOlgQUzPWEaR_WsbrfhqLykk5yNQ6_sEpEfbtq3XSracwZACNl-WPoaIRoNXsUy51iqzGm6bnKvKLwIGjEIdi0Rb59GZM393W7hCILxFPGX1YzkHVt1W1sYuxGGScvIVosgc7"/>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-xs font-bold text-white truncate">Untrue (2007)</p>
                    <p className="text-[10px] text-gray-500 truncate">Burial</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-primary-container" data-icon="equalizer" style={{fontVariationSettings: "'FILL' 1"}}>equalizer</span>
                  </div>
                </div>
                
                {/* Queue Item */}
                <div className="group flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-all cursor-pointer">
                  <img className="w-10 h-10 rounded-md object-cover opacity-60 group-hover:opacity-100 transition-opacity" data-alt="Album cover with grainy, minimalist photography of a foggy city street at night, illuminated by a single warm orange streetlamp. The mood is melancholic and cinematic, fitting for late-night listening lounge vibes with a dark obsidian color palette." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrqUJNr4Q5H0Agm8Lldg5PVdoQpsWnI2trKFFb2h7xn7UpbfU9sN3oCBXE5uu_rZtFmMU5-FGbWxIdQjV2FZju2xAcqmfu4wKXWS2lsNUkvB_p1Nb51eqWb0f8ChySVSAjXZ2zqojMsnzrnI_G9DH55Gq0Y-6nhmgWOzr3phw4gxwAYovjTaGn1LkoA8rv5g09NF5aONsYnvPNdctZxtayWsA0IynwUYbFWEfiR5PZ2qFhvhk7JO1emaMmJZShJJ9qZwxgrohtV4C4"/>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-xs font-bold text-gray-400 group-hover:text-white truncate">Night City</p>
                    <p className="text-[10px] text-gray-600 group-hover:text-gray-400 truncate">Vantablack</p>
                  </div>
                  <span className="text-[10px] text-gray-600 group-hover:text-gray-400">3:42</span>
                </div>
                
                {/* Queue Item */}
                <div className="group flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-all cursor-pointer">
                  <img className="w-10 h-10 rounded-md object-cover opacity-60 group-hover:opacity-100 transition-opacity" data-alt="Digital art piece showing geometric obsidian shards reflecting neon green light. The background is a deep charcoal grey with high-contrast details, evoking a sense of rhythmic motion and high-fidelity sound quality in a minimalist style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCV6JRI6IfbxKmoinodqdIYkgeePuKPzafDUOwZpySb163Y83ERp6ep7VLhlsqI8kFIg0RnfVxIxVWhNeGWOokiopNMnclQIiKG-GSNMz571ixUY9Nk7xs7gDjrQgsIm5b0gowolbhNJFeFYBhlgA1qHifzYzfor8_Dwr3cqTLacPjT0UgjN3ViJf2OfPJBnr9AYuKNBQNP11srmGJaYZh2W6tV9rN7CFRe6c2tV35kC40SZYIPStXynkv_5gKlROgc_lHOwduu841q"/>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-xs font-bold text-gray-400 group-hover:text-white truncate">Echoes of Silence</p>
                    <p className="text-[10px] text-gray-600 group-hover:text-gray-400 truncate">The Void</p>
                  </div>
                  <span className="text-[10px] text-gray-600 group-hover:text-gray-400">5:18</span>
                </div>
                
                {/* Queue Item */}
                <div className="group flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-all cursor-pointer">
                  <img className="w-10 h-10 rounded-md object-cover opacity-60 group-hover:opacity-100 transition-opacity" data-alt="Minimalist album art featuring a singular neon pink line cutting through a field of deep black and grey textures. The lighting is low-key and moody, focusing on the sophisticated nocturnal aesthetic of a premium music lounge interface." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXIJhEuHablPjGSEZqIEItIGtA74CkLmp_svDFeuD2wY2_N6AKmLJXRL5UrGrtjc8RBXDglwgTKRJwL9tIDllj0GJlMafGIApC5fF7fK8cXIlF5czzCZh2ZJ_ivWlk4qeoN3P6itqSQ_hKCPPGJiyxvIagRU4PTViLIKL8VTlocs0bI1TyFCg7kYLDQu18ZFuTwoRDbawCPgwpic3GPo_4uej_GcR8DAOr1JRDztzrkapad5cuCohsbUMNn0dbd00QAr-aC53BKOUn"/>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-xs font-bold text-gray-400 group-hover:text-white truncate">Subsurface</p>
                    <p className="text-[10px] text-gray-600 group-hover:text-gray-400 truncate">Deep Pulse</p>
                  </div>
                  <span className="text-[10px] text-gray-600 group-hover:text-gray-400">4:05</span>
                </div>
              </div>
              <button className="mt-6 w-full py-3 rounded-lg bg-surface-container-high text-xs font-bold text-white hover:bg-white/10 transition-all border border-white/5 flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-sm" data-icon="add_circle">add_circle</span>
                Suggest Track
              </button>
            </div>
          </div>
        </div>
      </main>
      
      {/* Bottom Player Shell (BottomNavBar) */}
      <footer className="fixed bottom-0 left-0 w-full z-50 flex justify-between items-center px-12 bg-[#121214]/80 backdrop-blur-xl h-20 border-t border-[#00E5FF]/20 shadow-[0_-4px_20px_rgba(0,229,255,0.1)]">
        {/* Track Info */}
        <div className="flex items-center gap-4 w-1/4">
          <img className="w-12 h-12 rounded-lg object-cover shadow-lg border border-white/10" data-alt="Small thumbnail of the active album art, featuring glowing cyan waves against an obsidian background, pulsing with digital rhythm." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6OhT1-x7LbMYzxLFRFrnbOlNbieu2TBQFjnaaioCsTKkjAgHJCAj8ws330iXCfQvg5KiRqVXL8oTzstvUGttIX_j2EPXF3mphz55VSwh7e0_HqW2XYVsqET-bXGKrzXVwVqH7ImPvi6e30JnPyQGLnaIzpCxQOt1ObR3yu58V8qUse74PMGvgr1jy_qOcgpDwYXMbuOj9ZvZsjlUvsLG78GRmFZs_KzwNLXFpbCvq1acORKHOQo_QgpD5ANtuDPdmz0sS2S9HUw48"/>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-white truncate">Untrue (2007)</p>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-[#00E5FF] uppercase tracking-widest">Burial</span>
              <span className="w-1 h-1 rounded-full bg-gray-600"></span>
              <span className="material-symbols-outlined text-[12px] text-[#00E5FF]" data-icon="equalizer" style={{fontVariationSettings: "'FILL' 1"}}>equalizer</span>
            </div>
          </div>
        </div>
        
        {/* Controls */}
        <div className="flex flex-col items-center gap-2 w-1/2">
          <div className="flex items-center gap-8">
            <button className="text-gray-500 hover:text-white transition-colors"><span className="material-symbols-outlined" data-icon="shuffle">shuffle</span></button>
            <button className="text-gray-500 hover:text-white transition-colors"><span className="material-symbols-outlined" data-icon="skip_previous">skip_previous</span></button>
            <button className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
              <span className="material-symbols-outlined" data-icon="pause" style={{fontVariationSettings: "'FILL' 1"}}>pause</span>
            </button>
            <button className="text-gray-500 hover:text-white transition-colors"><span className="material-symbols-outlined" data-icon="skip_next">skip_next</span></button>
            <button className="text-gray-500 hover:text-white transition-colors"><span className="material-symbols-outlined" data-icon="repeat">repeat</span></button>
          </div>
          <div className="w-full max-w-md flex items-center gap-3">
            <span className="text-[10px] text-gray-500 font-mono">1:45</span>
            <div className="flex-1 h-[4px] bg-white/10 rounded-full overflow-hidden relative group cursor-pointer">
              <div className="absolute left-0 top-0 h-full w-[45%] bg-gradient-to-r from-[#00E5FF] to-secondary-container"></div>
            </div>
            <span className="text-[10px] text-gray-500 font-mono">6:12</span>
          </div>
        </div>
        
        {/* Navigation Clusters (JSON BottomNavBar Labels) */}
        <div className="flex items-center gap-8 w-1/4 justify-end">
          <div className="flex flex-col items-center gap-1 cursor-pointer text-white drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]">
            <span className="material-symbols-outlined" data-icon="play_circle">play_circle</span>
            <span className="font-headline-lg text-[10px] uppercase tracking-widest">Now Playing</span>
          </div>
          <div className="flex flex-col items-center gap-1 cursor-pointer text-gray-500 hover:scale-110 transition-transform">
            <span className="material-symbols-outlined" data-icon="queue_music">queue_music</span>
            <span className="font-headline-lg text-[10px] uppercase tracking-widest">Queue</span>
          </div>
          <div className="flex flex-col items-center gap-1 cursor-pointer text-gray-500 hover:scale-110 transition-transform">
            <span className="material-symbols-outlined" data-icon="mic_external_on">mic_external_on</span>
            <span className="font-headline-lg text-[10px] uppercase tracking-widest">Lyrics</span>
          </div>
          <div className="flex flex-col items-center gap-1 cursor-pointer text-gray-500 hover:scale-110 transition-transform">
            <span className="material-symbols-outlined" data-icon="devices">devices</span>
            <span className="font-headline-lg text-[10px] uppercase tracking-widest">Devices</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ChatRoom;
