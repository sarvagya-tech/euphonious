import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="bg-surface text-on-surface music-wave-bg min-h-screen selection:bg-primary-container selection:text-on-primary-container overflow-hidden">
      {/* Subtle Wave Background Element */}
      <div className="fixed inset-0 pointer-events-none opacity-40">
        <div className="wave-layer" style={{ top: '20%', transform: 'rotate(-5deg)' }}></div>
        <div className="wave-layer" style={{ top: '50%', transform: 'rotate(3deg)', opacity: 0.6 }}></div>
      </div>

      {/* Sidebar Navigation */}
      <aside className="fixed left-0 top-0 h-full w-64 z-50 bg-zinc-950/90 backdrop-blur-lg flex flex-col pt-8 pb-4 border-r border-zinc-800/50 shadow-2xl shadow-cyan-900/10">
        <div className="px-6 mb-10">
          <h1 className="text-2xl font-black text-cyan-400 mb-1 font-headline-xl">Aura</h1>
          <p className="text-zinc-500 font-label-sm tracking-widest uppercase">Premium Sound</p>
        </div>
        <nav className="flex-1 space-y-1">
          <div className="flex items-center gap-3 text-white border-l-2 border-cyan-400 bg-cyan-400/10 py-3 px-6 font-body-md cursor-pointer transition-all duration-200">
            <span className="material-symbols-outlined text-cyan-400">home</span>
            <span>Home</span>
          </div>
          <div className="flex items-center gap-3 text-zinc-500 py-3 px-6 font-body-md cursor-pointer hover:text-cyan-200 hover:bg-zinc-900/50 transition-all duration-200 hover:translate-x-1">
            <span className="material-symbols-outlined">explore</span>
            <span>Explore</span>
          </div>
          <div className="flex items-center gap-3 text-zinc-500 py-3 px-6 font-body-md cursor-pointer hover:text-cyan-200 hover:bg-zinc-900/50 transition-all duration-200 hover:translate-x-1">
            <span className="material-symbols-outlined">library_music</span>
            <span>Library</span>
          </div>
          <div className="flex items-center gap-3 text-zinc-500 py-3 px-6 font-body-md cursor-pointer hover:text-cyan-200 hover:bg-zinc-900/50 transition-all duration-200 hover:translate-x-1">
            <span className="material-symbols-outlined">radio</span>
            <span>Stations</span>
          </div>
          <div className="flex items-center gap-3 text-zinc-500 py-3 px-6 font-body-md cursor-pointer hover:text-cyan-200 hover:bg-zinc-900/50 transition-all duration-200 hover:translate-x-1">
            <span className="material-symbols-outlined">favorite</span>
            <span>Favorites</span>
          </div>
          {/* Playlists Section */}
          <div className="pt-8 px-6">
            <h3 className="text-zinc-400 font-label-sm uppercase tracking-widest mb-4">Your's Playlist</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between text-zinc-400 hover:text-cyan-400 transition-colors duration-200 group">
                <span className="font-body-md">Liked Songs</span>
                <span className="material-symbols-outlined text-sm group-hover:scale-110">favorite</span>
              </button>
              <button className="w-full flex items-center justify-between text-zinc-400 hover:text-cyan-400 transition-colors duration-200 group">
                <span className="font-body-md">Late Night Chill</span>
                <span className="material-symbols-outlined text-sm">queue_music</span>
              </button>
              <button className="w-full flex items-center justify-between text-zinc-400 hover:text-cyan-400 transition-colors duration-200 group">
                <span className="font-body-md">Cyberpunk Beats</span>
                <span className="material-symbols-outlined text-sm">queue_music</span>
              </button>
            </div>
            <button className="mt-8 w-full border-2 border-secondary-container text-secondary-container rounded-xl py-3 font-label-sm flex items-center justify-center gap-2 hover:bg-secondary-container/10 transition-all duration-300 shadow-lg shadow-secondary-container/5">
              <span className="material-symbols-outlined">add</span>
              Create Playlist
            </button>
          </div>
        </nav>
        <div className="mt-auto px-6 pt-4">
          <div className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-800">
            <p className="text-xs text-zinc-500 mb-2">Upgrade to Pro</p>
            <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-cyan-400 w-3/4"></div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <main className="ml-64 pb-player-height h-screen overflow-y-auto custom-scrollbar">
        {/* Top App Bar */}
        <header className="fixed top-0 left-64 right-0 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50 flex justify-between items-center h-16 px-8">
          <div className="flex items-center flex-1 max-w-xl">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"></span>
              <input className="w-full bg-zinc-900/50 border-none rounded-full py-2 pl-10 pr-4 text-zinc-200 font-body-md focus:ring-1 focus:ring-cyan-400 transition-all" placeholder="Search for music, artists, or moods..." type="text" />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="border-2 border-secondary-container text-secondary-container px-5 py-1.5 rounded-full font-label-sm hover:bg-secondary-container/10 transition-all duration-300 active:scale-95">
              Create Room
            </button>
            <div className="flex items-center gap-4 text-zinc-400">
              <span className="material-symbols-outlined cursor-pointer hover:text-cyan-400 transition-colors">notifications</span>
              <span className="material-symbols-outlined cursor-pointer hover:text-cyan-400 transition-colors">settings</span>
              <div className="w-10 h-10 rounded-full border-2 border-zinc-800 overflow-hidden cursor-pointer hover:border-cyan-400 transition-all">
                <img className="w-full h-full object-cover" data-alt="Portrait of a stylish person in low light studio photography with neon highlights" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6HEJqSJt35iAyy7vzNae-foAiHsy-AnKFuOQyr7UFrGyEZZ2Mo6YixiwQyXh50o7Q3bjCvclOpsddhqaoXqkOaoQRx6vQtBvNoLW5HZKzrQUQojTHPJLhpQhWM5WY0DPAUDSkWSXrZLDN0gHvepj8pgn1znA3l9bv8n_No0Y152W6BhQHuHe8ybH599VfIKR2FNqxXHxaxQ-Lq96TkZWYpZmzh0mMEZSGioukw7LyLfNy4B-CU13J6ep9vNn6qbBGDAr3jBinxnlL" />
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="pt-24 px-8 space-y-12">
          {/* Trending Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-headline-lg font-headline-lg text-white">Trending Now</h2>
              <button className="text-cyan-400 font-label-sm hover:underline">View All</button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-gutter">
              {/* Trending Card 1 */}
              <div className="group cursor-pointer">
                <div className="relative aspect-square rounded-xl overflow-hidden mb-4 shadow-2xl transition-transform duration-300 group-hover:-translate-y-2">
                  <img className="w-full h-full object-cover" data-alt="Vibrant abstract music album cover with flowing neon cyan and green shapes on a dark background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFRFtrKuFzyQ5WErS9aqyJj1ChIsc18fSWo1N_ziR2CVcwbBD0oFyNoJiHPPlHZXb5ID11VOQBNCUr5iY7wFMJqIkgZQs4vZo17-5vsMvhQVQxSNqxuK1xPpyIfOnaxkUzPUs1xxXtr3DCzJRSntT6aJTk4MHpOMslYrST61pX-VM7fooXjIGeU25cyqYw9fTVTQPfQxWLcyV6XGGetti0f5rFlBW9j08wMwtQV2g4mC2-CrTcKcLTeCiGM6FKiSVXuGFhTKEf-bKV" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
                  </div>
                </div>
                <h4 className="text-white font-headline-md text-body-md truncate">Midnight Pulse</h4>
                <p className="text-zinc-500 font-body-md text-sm">Neon Circuit</p>
              </div>
              {/* Trending Card 2 */}
              <div className="group cursor-pointer">
                <div className="relative aspect-square rounded-xl overflow-hidden mb-4 shadow-2xl transition-transform duration-300 group-hover:-translate-y-2">
                  <img className="w-full h-full object-cover" data-alt="Atmospheric landscape of a futuristic city at night with blue and green glowing lights and mist" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2LEbeNRk_OEOAOplhPgMHxc_TSXwzNDx-6mPtl3wHrGT1A1FPMZpr_OE47QmCIKFOZoJFkjFy6OOza3io2aqizmElvAQx2gIyspowaANZNmDyeNuPY7NlzfXIAwIlN60oXs7ZJHnJqvHQd4R9bxEBTM6qeSwYtzwtJcP1MGBvYEfrJDbSU9fd7zWv2jtBbFE3I0jee6l11NhSgAjiXm-5LqZdHv2l4u3z7H7NsWWX1bSdL1NK8BhEcKWmVgjW55kvySQhCexFj9tW" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
                  </div>
                </div>
                <h4 className="text-white font-headline-md text-body-md truncate">Urban Echoes</h4>
                <p className="text-zinc-500 font-body-md text-sm">Synthetic Dreams</p>
              </div>
              {/* Trending Card 3 */}
              <div className="group cursor-pointer">
                <div className="relative aspect-square rounded-xl overflow-hidden mb-4 shadow-2xl transition-transform duration-300 group-hover:-translate-y-2">
                  <img className="w-full h-full object-cover" data-alt="Close up of a DJ controller in a dark club with sharp turquoise lighting and shallow depth of field" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2X1kWTqKNvVG70XBeIqchLPYSStweqhQaBF3TWs2Xp3befXwHHtztjh9zByxof7ZpZRZ3a7Kq5xJK1KtQGyB6onsRfT4hQEpIX4O9Z5f7SZNJhC8ujIPJQNwumRPWXewvTqa399mqi4we9XqH6Orbti_90a_1Ie7r8AdHlWkgpgSiJ2Nf3RYMLhs1KUi30KqkWdVO0Z3l-ukMRb1TykSUBM_LdXGzPTFyyTmnVG6WwSQXmTsEBhG4J_ttUxeq3pj35V2CEFQey1zR" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
                  </div>
                </div>
                <h4 className="text-white font-headline-md text-body-md truncate">Void Walker</h4>
                <p className="text-zinc-500 font-body-md text-sm">The Architect</p>
              </div>
              {/* Trending Card 4 */}
              <div className="group cursor-pointer">
                <div className="relative aspect-square rounded-xl overflow-hidden mb-4 shadow-2xl transition-transform duration-300 group-hover:-translate-y-2">
                  <img className="w-full h-full object-cover" data-alt="Explosion of colorful neon powder against a black background with dramatic movement" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDC4FerEG_LiS6D1JZoZGo_ce2Jp1Qf2ApWCI1neExvFG0agsMRXj-OCZh9JnyUaHrwIBcpoLX-UC_trMxjXO8WKYVP_Ms4vlL0Alp-nuDlVT6JMHp0BCXwI7PbQfF8zDox_uuFUvAo7qglZV8xsRr2HZ84quFvV16q7OMyvyrYM4M0NWgBJG1d1ucLBzoEftt26E3glfJiAF2XScFuss2QAYwzOtElf4mcO9EEi-yA3O2EnsBQlTkfzxmxXmCXV8wRPcNwAwWHhM-l" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
                  </div>
                </div>
                <h4 className="text-white font-headline-md text-body-md truncate">Glitch Horizon</h4>
                <p className="text-zinc-500 font-body-md text-sm">Frequency</p>
              </div>
              {/* Trending Card 5 */}
              <div className="group cursor-pointer">
                <div className="relative aspect-square rounded-xl overflow-hidden mb-4 shadow-2xl transition-transform duration-300 group-hover:-translate-y-2">
                  <img className="w-full h-full object-cover" data-alt="Abstract macro shot of glass and light reflections creating a prism effect with cyan and mint tones" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDo2oTyzY0q04hBKteAFpkTkLHv980RLa8gPFAWrnfVEiOFShsW5cVBWdlBYgBDArGYFXFayez9_3Xo1P15vKuXugo8lrhwSWaMv6TCnOHU5Hc_bRdoBdhZvEHrA-Ym9CxjKPy_4bf8An3TU_BAkOuPuFlfvZRrlkSmXXeZMfc1phryepKspHPIe2-mb0M-8G7UCl9qplVUJXfgpcuXViRaFuyuWKKtaOyX1l7Wk3j1MZ39TsUjqnMNgLeBmCpqEH-D3en61aiSyCjv" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
                  </div>
                </div>
                <h4 className="text-white font-headline-md text-body-md truncate">Crystal Flow</h4>
                <p className="text-zinc-500 font-body-md text-sm">Sub-Zero</p>
              </div>
            </div>
          </section>

          {/* Artists Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-headline-lg font-headline-lg text-white">Favorite Artists</h2>
              <button className="text-cyan-400 font-label-sm hover:underline">Discovery</button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-gutter">
              {/* Artist 1 */}
              <div className="text-center group cursor-pointer">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 ring-2 ring-transparent group-hover:ring-cyan-400 ring-offset-4 ring-offset-surface transition-all duration-300">
                  <img className="w-full h-full object-cover" data-alt="Professional headshot of a electronic music artist with intense gaze and cinematic shadows" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0ScQOyv7Lq_ddCAsIHufT1_vz7AQ2qLJwbEGUETsohSD_kOXDa_q4qsKqo1C7gWmVQNFe7PH5tfLXOKgCxpGIgkWBkRW_NVPhwOomsKFXY9792dbklNTQU88TTRm_7JBaOSr-J1sJtBVKulyQTy94-G3lxzIAy7Rx1oIo8DnK8C1UT8RzkRzW5jg22T8QsaCSi_wqJ8Vm6U6C8sjsTMBMx0fc09x0tABQU0y7sMTtNywn5yAAvU9QMthlRcWh8jBTU7QyfDM0hKnJ" />
                </div>
                <h5 className="text-white font-body-md">Kairos</h5>
              </div>
              {/* Artist 2 */}
              <div className="text-center group cursor-pointer">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 ring-2 ring-transparent group-hover:ring-cyan-400 ring-offset-4 ring-offset-surface transition-all duration-300">
                  <img className="w-full h-full object-cover" data-alt="Minimalist portrait of a musician in profile against a dark monochromatic background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-15v9UG-wF2-VDYKYWl1DbQl6CX_Lp4mu5sK2cT_iHi17wvhGBdU7holCySAxitgn819SpMwgDmtyLhF8UbtIAjVichgcfsoMZ5_-Uwr9sjQPdABxsYYpnE4pa3juDHMJeLPs6BIRsihBClnzLP_pYhLfFql3Jk3cTPkw3dD4ULJYmxm-3Y65QEjj2QBTtQlgHOFDpT9fU2aOvCI1fUADLgMJd_VyNqN_iVg-uPApLUGUfGWWqdI8h4k6eu0CLhrlj4jFnNzgGozb" />
                </div>
                <h5 className="text-white font-body-md">Luna Sol</h5>
              </div>
              {/* Artist 3 */}
              <div className="text-center group cursor-pointer">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 ring-2 ring-transparent group-hover:ring-cyan-400 ring-offset-4 ring-offset-surface transition-all duration-300">
                  <img className="w-full h-full object-cover" data-alt="Musician playing an electric guitar in a moody dimly lit studio with blue rim lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBE8AgiWE3ikqL_E1WG92p4ZeciDEBy29XtmA_N6QeKQSMr_XpuktiSGzYDHYS1cs6cCbbz1JNOSFhgY4G0poMkUKnTiT-1QCN543aiUOoGpMLAEUupGfDkoZnVw9Nyj0_fW0z3zHwR4zTvR0Tw9kyzAn8bgZtsdvZ0oUZEokpGUwGWRXlIykwo2Yy-VIlXKO0YVJh6ZLNqMX-UK7VRLFYeMsNMLgXyTpuUFONP9qCYTRuYhl_l4OC9m-6mpV5My437PRQxM5WGDicE" />
                </div>
                <h5 className="text-white font-body-md">Echo Bloom</h5>
              </div>
              {/* Artist 4 */}
              <div className="text-center group cursor-pointer">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 ring-2 ring-transparent group-hover:ring-cyan-400 ring-offset-4 ring-offset-surface transition-all duration-300">
                  <img className="w-full h-full object-cover" data-alt="Artistic portrait of a producer wearing headphones in a neon lit creative studio space" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIuD3LIeYRrtWT6neDMzP5yAa-2nq-lTWWv_140x9b2jme5qNZogRGZ19WSeXtWSYTLuPQi8e9TpajdpmBRpV2Z6uGO-VFJyme9b5zo7JjV03JDVfI-I1NV4Pjszw1_MIZf7CEGTZ48QhYsbDCVjROBf9XEefmQhM5GIZxe8kqj_cTeb-6iiKRd0N68QUSuZj3ZNvMTiophJuiiiWqze4Jy7Qqtk7gfaHW7VOgIED9oTVbXELmsm0nzE2RYwg0zjpgx1L1XEOCcjyJ" />
                </div>
                <h5 className="text-white font-body-md">Vela</h5>
              </div>
              {/* Artist 5 */}
              <div className="text-center group cursor-pointer">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 ring-2 ring-transparent group-hover:ring-cyan-400 ring-offset-4 ring-offset-surface transition-all duration-300">
                  <img className="w-full h-full object-cover" data-alt="Candid shot of a jazz singer performing with a vintage microphone in soft spotlight" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8EEji9p2bVbK1rWFHhznyaIDQqpmjjjsVcx-M4Vy-eDo5p1KmpqnN0HwPat2TUFWxi6je0DEKdJ1VDGlkrpIbOBmQhs2osVf3gbXa7wLcIVKCqPvkhitI-sxaOT6NtDTrmh44a-QMO7mAPw2zLef5S2f0G3DJxx9JCbg1GOweyvMEEDOuUHolEOoKvsCLpuAGqOjY4PrMi4UmT7vIInkdKFzBv0W-ZNaV8NeqrYUt1cW8aoYkHNfgMAN8A3vIhrOJz7xiT9rPQoRW" />
                </div>
                <h5 className="text-white font-body-md">Mara</h5>
              </div>
              {/* Artist 6 */}
              <div className="text-center group cursor-pointer">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 ring-2 ring-transparent group-hover:ring-cyan-400 ring-offset-4 ring-offset-surface transition-all duration-300">
                  <img className="w-full h-full object-cover" data-alt="Silhouette of a performer on stage with bright green laser beams and heavy fog" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvVRMOm-ZjZQYNMpJesSiDMufkBjTsMloaoVQFGHQkPy7Z2OQLBN96nQrjXb7_LUx3T4KrBP_tTQX94JuIihihvhGAP-afp0m40nWXznoES5KSXsTYmcSlg-b0sBLjdp9jvsBeS37Fi4kxUItPFEff0Rz7lC9DgE_ePO0O-QZXE_l_yx8ZcTXyoSkmOb_wQRwbAer4cJhzXB2c9alNVxv3lIsTiO5dCFg3-RNpBEPiAjrgxbjlNvJj8ylq9b5BLq4zUwqXDiKou0JI" />
                </div>
                <h5 className="text-white font-body-md">Ghost Pulse</h5>
              </div>
            </div>
          </section>

          {/* Create Section (Bento Inspired) */}
          <section className="pb-8">
            <h2 className="text-headline-lg font-headline-lg text-white mb-6">Create &amp; Collaborate</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
              {/* Create Card 1 */}
              <div className="glass-panel rounded-2xl p-8 hover:border-secondary-container/50 transition-all cursor-pointer flex flex-col items-center justify-center text-center group">
                <div className="w-16 h-16 bg-secondary-container/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-secondary-container text-4xl">mic</span>
                </div>
                <h3 className="text-white font-headline-md mb-2">Host Session</h3>
                <p className="text-zinc-500 font-body-md">Invite friends and listen in real-time with zero latency.</p>
              </div>
              {/* Create Card 2 */}
              <div className="glass-panel rounded-2xl p-8 hover:border-primary-container/50 transition-all cursor-pointer flex flex-col items-center justify-center text-center group">
                <div className="w-16 h-16 bg-primary-container/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-primary-container text-4xl">auto_fix_high</span>
                </div>
                <h3 className="text-white font-headline-md mb-2">Smart Mix</h3>
                <p className="text-zinc-500 font-body-md">Let our AI curator build the perfect transition set for your mood.</p>
              </div>
              {/* Create Card 3 */}
              <div className="glass-panel rounded-2xl p-8 hover:border-tertiary-container/50 transition-all cursor-pointer flex flex-col items-center justify-center text-center group">
                <div className="w-16 h-16 bg-tertiary-container/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-tertiary-container text-4xl">podcasts</span>
                </div>
                <h3 className="text-white font-headline-md mb-2">Go Live</h3>
                <p className="text-zinc-500 font-body-md">Broadcast your own radio station to the Aura community.</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Bottom Media Player */}
      <footer className="fixed bottom-0 left-0 right-0 h-player-height glass-panel z-50 px-8 flex items-center justify-between shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        {/* Currently Playing */}
        <div className="flex items-center gap-4 w-1/4">
          <div className="w-14 h-14 rounded-lg overflow-hidden shadow-lg border border-zinc-800">
            <img className="w-full h-full object-cover" data-alt="Album art for Midnight Pulse featuring neon cyan waves" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzbhVRRnH45P60ziOWuWaNlxSP3nCz6NKFRaUvlUn4F0ANLwOASGPB_6jMvNgFS2u6QbTIFtyZEt9ekeSK0zMAVafXsedan1rX8BMFBf3xL_WXw9JyP7elL-vbBaHuU3SwvrEgoYQbupt5lSUdJQm0CAoRfH53u-M7duOJ1tiX59ifOrMCXswvJYDOhiKse2h2y5VM_9m2wEG7pK13feiCJ91ZCO15gk41nlNe61woEk6stilyeR4i6GyM4Q6cxSVDdmvBnmw9ySbR" />
          </div>
          <div>
            <h5 className="text-white font-body-md font-semibold truncate">Midnight Pulse</h5>
            <div className="flex items-center gap-2">
              <p className="text-zinc-400 text-xs font-body-md">Neon Circuit</p>
              <div className="flex gap-0.5 items-end h-3">
                <div className="w-0.5 bg-cyan-400 animate-pulse h-full"></div>
                <div className="w-0.5 bg-cyan-400 animate-pulse h-2/3"></div>
                <div className="w-0.5 bg-cyan-400 animate-pulse h-1/2"></div>
              </div>
            </div>
          </div>
          <span className="material-symbols-outlined text-zinc-500 cursor-pointer hover:text-cyan-400 transition-colors ml-2">favorite</span>
        </div>
        {/* Controls */}
        <div className="flex flex-col items-center flex-1 max-w-2xl px-8">
          <div className="flex items-center gap-8 mb-2">
            <span className="material-symbols-outlined text-zinc-500 cursor-pointer hover:text-white transition-colors">shuffle</span>
            <span className="material-symbols-outlined text-white text-2xl cursor-pointer hover:text-cyan-400 transition-colors">skip_previous</span>
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-all">
              <span className="material-symbols-outlined text-zinc-950 text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
            </div>
            <span className="material-symbols-outlined text-white text-2xl cursor-pointer hover:text-cyan-400 transition-colors">skip_next</span>
            <span className="material-symbols-outlined text-zinc-500 cursor-pointer hover:text-white transition-colors">repeat</span>
          </div>
          <div className="w-full flex items-center gap-3">
            <span className="text-[10px] text-zinc-500 font-label-sm w-8">2:14</span>
            <div className="flex-1 h-1 bg-zinc-800 rounded-full relative group cursor-pointer">
              <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-cyan-400 to-secondary-container w-[65%] rounded-full"></div>
              <div className="absolute left-[65%] top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <span className="text-[10px] text-zinc-500 font-label-sm w-8">3:45</span>
          </div>
        </div>
        {/* Volume & Extras */}
        <div className="flex items-center justify-end gap-4 w-1/4">
          <span className="material-symbols-outlined text-zinc-500 cursor-pointer hover:text-white transition-colors">lyrics</span>
          <span className="material-symbols-outlined text-zinc-500 cursor-pointer hover:text-white transition-colors">queue_music</span>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-zinc-500">volume_up</span>
            <div className="w-24 h-1 bg-zinc-800 rounded-full">
              <div className="h-full bg-zinc-400 w-3/4 rounded-full"></div>
            </div>
          </div>
          <span className="material-symbols-outlined text-zinc-500 cursor-pointer hover:text-white transition-colors">open_in_full</span>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
