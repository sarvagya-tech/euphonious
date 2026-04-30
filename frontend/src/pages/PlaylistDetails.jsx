import React from 'react';
import { Link } from 'react-router-dom';

const PlaylistDetails = () => {
  return (
    <div className="font-body-md text-on-surface bg-surface-container-lowest overflow-hidden min-h-screen">
      {/* Main Content Canvas */}
      <main className="w-full h-screen overflow-y-auto relative pb-32">
        {/* Top Navigation Bar */}
        <header className="sticky top-0 z-40 bg-[#050505]/80 backdrop-blur-lg flex items-center justify-between px-8 h-16 w-full border-b border-white/10">
          <div className="flex items-center gap-8">
            <Link to="/dashboard" className="text-xl font-black text-white font-headline-lg flex flex-col hover:text-cyan-400 transition-colors">
              Sonic Noir
              <span className="text-[10px] font-normal text-zinc-500 tracking-[0.2em] leading-none">PREMIUM</span>
            </Link>
            <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-full w-96">
              <span className="material-symbols-outlined text-zinc-400" data-icon="search">search</span>
              <input className="bg-transparent border-none focus:ring-0 text-sm text-white w-full outline-none" placeholder="Search artists, songs, or mood..." type="text"/>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6 mr-4">
              <Link to="/dashboard" className="text-white font-medium hover:text-[#00E5FF] transition-colors">Home</Link>
              <Link to="#" className="text-zinc-400 hover:text-white transition-colors">Explore</Link>
              <Link to="#" className="text-zinc-400 hover:text-white transition-colors">Library</Link>
            </nav>
            <button className="text-zinc-400 hover:text-white transition-colors scale-95 active:scale-90 duration-200">
              <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
            </button>
            <button className="text-zinc-400 hover:text-white transition-colors scale-95 active:scale-90 duration-200">
              <span className="material-symbols-outlined" data-icon="settings">settings</span>
            </button>
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-[#00E5FF] to-[#59feac] p-[1px]">
              <img alt="User profile" className="h-full w-full object-cover rounded-full" data-alt="Close up portrait of a stylish person with neon lighting reflecting on their face, high fashion aesthetic" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoFSryVIPYsFd6RzmqfcPDmrz2hN3ErKUgZOI6_RzFBANQH1uO1Api3rQLNaosWWLnTMLSjth0dNAq0tm_YBICyHgvoz3O_4EUvaWk1cB4xSzHebxlMt-rqUHKmfw09lckc90PV-udGk-L4kllQjFALxVzFXayI04aatXfNbN2Xp8dBR2Ksnmx1pgVDinflx0r0kIDF0y-mM6PeBpWvitoYEOOhvPTrzwrvP3twYeUGuBoz8pp-BNKlgkaybqWq63g2bMMFWLgnvuT"/>
            </div>
          </div>
        </header>
        
        {/* Playlist Hero Section */}
        <section className="relative px-12 pt-12 pb-8 flex flex-col items-center">
          {/* Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#00E5FF]/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
          <div className="relative group">
            {/* Image Halo Shadow */}
            <div className="absolute -inset-4 bg-[#00E5FF]/20 blur-2xl rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative w-72 h-72 rounded-xl overflow-hidden shadow-2xl border border-white/10">
              <img alt="Playlist Cover" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" data-alt="Abstract vibrant digital art with fluid neon cyan and purple shapes flowing like sonic waves, high quality 3d render" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCt0A0QWX-J1xBgTakpOBgE9fkNL8S1URM-fLrOUpXW22GJbblUoPKQUxN5CGhvh_YnkiYLP0-9J858PHYGo3ZfWmvrBDG3wVDrd9MF5sCrgjPpXP2LbUm2y6_cAil-NLzo0OVlW5c1_h4eWrNZ8KRohXp4BVanoOrhYv0Hp2Mgyue7xoP4-FoReh9VZ2jwSNATCL4cUVSUk_de83uODPVPRbTc6cVhpLlbj6I1Ue6VZJC0vE9YrtFGpYpaa2PvBi3n-YjMmoReb5Eh"/>
            </div>
          </div>
          <div className="mt-8 text-center">
            <h1 className="font-headline-xl text-white mb-2 tracking-tighter">Midnight Pulse</h1>
            <p className="text-zinc-400 font-body-md max-w-md mx-auto">Deep rhythms and atmospheric beats for late-night focus and nocturnal exploration.</p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <button className="bg-[#00E5FF] text-[#00363d] px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)]">
                <span className="material-symbols-outlined" data-icon="play_arrow" style={{fontVariationSettings: "'FILL' 1"}}>play_arrow</span>
                Play
              </button>
              <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                <span className="material-symbols-outlined" data-icon="favorite">favorite</span>
              </button>
              <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                <span className="material-symbols-outlined" data-icon="more_horiz">more_horiz</span>
              </button>
            </div>
          </div>
        </section>
        
        {/* Track List Section */}
        <section className="px-12 mt-8 max-w-6xl mx-auto">
          <div className="glass-panel rounded-3xl overflow-hidden bg-black/20 backdrop-blur-md border border-white/5">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-zinc-500 text-xs font-label-sm uppercase">
                  <th className="px-6 py-4 font-semibold">#</th>
                  <th className="px-6 py-4 font-semibold">Song Name</th>
                  <th className="px-6 py-4 font-semibold">Album</th>
                  <th className="px-6 py-4 font-semibold">Released</th>
                  <th className="px-6 py-4 font-semibold text-right">
                    <span className="material-symbols-outlined text-sm" data-icon="schedule">schedule</span>
                  </th>
                </tr>
              </thead>
              <tbody className="font-body-md">
                {/* Track 1 */}
                <tr className="group hover:bg-white/5 transition-colors cursor-pointer border-b border-white/5 last:border-0">
                  <td className="px-6 py-4 w-12 text-zinc-500">
                    <span className="group-hover:hidden">1</span>
                    <span className="material-symbols-outlined hidden group-hover:block text-[#00E5FF]" data-icon="play_arrow" style={{fontVariationSettings: "'FILL' 1"}}>play_arrow</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-zinc-800">
                        <img className="w-full h-full object-cover" data-alt="Microscopic view of sound vibrations on a dark liquid surface with cyan highlights" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDebUQm78WolVRgspL6UuBwuBA7lnG78JY0lhVPOBCb_A40rFK5PZVk0NgT-fLSnYGWc84Cj0o-IzWBgJ6CCXRbVkic1cztFjDSsDWTJBvav0W9fAtIr7z1Xi1ahbqZn_jh2FL4O00rf3HOYWQEFLOkg9FWWxrtes6843ArWafbKZi2uvmpyZmndTZQTY2DMNASmNll7GarjKbOkhtmoMXeBO-fLJXPyWAZC-Tf_nh-tWc5X9mEoifnviyBeVwIXbCzV6CaBGRWkua6"/>
                      </div>
                      <div>
                        <p className="text-white font-medium">Summer High</p>
                        <p className="text-xs text-zinc-500">AP Dhillon</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-zinc-400">Summer High</td>
                  <td className="px-6 py-4 text-zinc-500">24 March 26</td>
                  <td className="px-6 py-4 text-right text-zinc-400">3:24</td>
                </tr>
                {/* Track 2 */}
                <tr className="group hover:bg-white/5 transition-colors cursor-pointer border-b border-white/5 last:border-0">
                  <td className="px-6 py-4 w-12 text-zinc-500">
                    <span className="group-hover:hidden">2</span>
                    <span className="material-symbols-outlined hidden group-hover:block text-[#00E5FF]" data-icon="play_arrow" style={{fontVariationSettings: "'FILL' 1"}}>play_arrow</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-zinc-800">
                        <img className="w-full h-full object-cover" data-alt="Neon blue geometric shapes floating in a black void, modern abstract composition" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDN-blCtO0WgidUMRdHnZuObiJgw5-9wValo5Z36Su-Uj3MADYl8r_27Hfg8eoy8410_9cbLWqOKB6cbR9NVrp1WUQLT-1XDU3iiV0NcpMcWKH1W2XOq4wyawXXXd8PGy4lxAoutTBnGSPnRrCH6vCjLJNWNTA7gBTmDsCzOQCeoMOL7PPOEFB7tWEbK_JcJ1OA12WfjI9lMiLE13JTYwooSEBhTwFgZ8GjsavPA3AMQmzm_l3LeskznbD4OPgkK6sp6RaDY-_lurDK"/>
                      </div>
                      <div>
                        <p className="text-white font-medium">Bawra</p>
                        <p className="text-xs text-zinc-500">Kavita Seth</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-zinc-400">Bawra</td>
                  <td className="px-6 py-4 text-zinc-500">12 Jan 26</td>
                  <td className="px-6 py-4 text-right text-zinc-400">2:45</td>
                </tr>
                {/* Track 3 */}
                <tr className="group hover:bg-white/5 transition-colors cursor-pointer border-b border-white/5 last:border-0">
                  <td className="px-6 py-4 w-12 text-zinc-500">
                    <span className="group-hover:hidden">3</span>
                    <span className="material-symbols-outlined hidden group-hover:block text-[#00E5FF]" data-icon="play_arrow" style={{fontVariationSettings: "'FILL' 1"}}>play_arrow</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-zinc-800">
                        <img className="w-full h-full object-cover" data-alt="Distorted lights at a night concert with intense cyan and teal lens flares" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYJo943_dIshu_OePrSaD-8JBJE68xFtK-CrwCjY0W1bpPxP-jlnbWsP2jnt2zPuED9MfEeFQL6LUllkH6KYn0ScgIykka8JH_SklmuC6uJTT3TkPsV0Xecoag0z1GUFAemhaP8OYymXln3lydvJP_ptAGF_249iOegLSuc4RdsK06LvjPcRkhddzVDInFIg3CGAgwnhFKI3G9ArJjWMLvpQrhlPKIXM2MUYZV_LGPZuSoOntf5FNVHjEVZW-zQtvNPePqK6rtK-cA"/>
                      </div>
                      <div>
                        <p className="text-white font-medium">Nocturnal Waves</p>
                        <p className="text-xs text-zinc-500">Sonic Noir Originals</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-zinc-400">Deep Lounge Vol 1</td>
                  <td className="px-6 py-4 text-zinc-500">05 Feb 26</td>
                  <td className="px-6 py-4 text-right text-zinc-400">4:12</td>
                </tr>
                {/* Track 4 */}
                <tr className="group hover:bg-white/5 transition-colors cursor-pointer border-b border-white/5 last:border-0">
                  <td className="px-6 py-4 w-12 text-zinc-500">
                    <span className="group-hover:hidden">4</span>
                    <span className="material-symbols-outlined hidden group-hover:block text-[#00E5FF]" data-icon="play_arrow" style={{fontVariationSettings: "'FILL' 1"}}>play_arrow</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-zinc-800">
                        <img className="w-full h-full object-cover" data-alt="Dark blue to black gradient with subtle glowing particles like distant stars" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVK_VxH4uqizYy9a5b_AFKoNE5rxGErZZkxFpOPVgTG82kMiFQjmWdEXqKI1fn7xlKc9o7NajNgw7ZsR5906152Pw1EI-Ha8BlgngmEeUgSSqSWcFj6wfiPfyBY1LZcf4OmYZpu5ygoPqp8_SZ9qYmHEyZ2UFAs89aJXIlKnLbwQzp97Pcdewy-Y4HudaRM9Niya-RwB4XWKWNaBtjLT7jJ1iNy5hsYsEDtcek8qa3_XjitfKVQSOj4Sp2n-0y3CAUdLKOyahzDwfA"/>
                      </div>
                      <div>
                        <p className="text-white font-medium">Silent Echo</p>
                        <p className="text-xs text-zinc-500">Lunar Drift</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-zinc-400">Orbit</td>
                  <td className="px-6 py-4 text-zinc-500">18 Dec 25</td>
                  <td className="px-6 py-4 text-right text-zinc-400">3:58</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
      
      {/* Bottom Player Bar (Fixed Anchor) */}
      <footer className="fixed bottom-0 left-0 right-0 h-24 bg-[#050505]/90 backdrop-blur-2xl border-t border-white/5 z-50 flex items-center px-8 justify-between">
        {/* Now Playing Info */}
        <div className="flex items-center gap-4 w-1/3">
          <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
            <img alt="Now Playing" className="w-full h-full object-cover" data-alt="Microscopic view of sound vibrations on a dark liquid surface with cyan highlights" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmvMoq9TsQqtKml2Hr4MB4LZ8DMsGHzvAv3r-4Z49fKjiotMpOTCnnsOjHNa7q3ac_zsrOZBjT3qnBIuoQOKdWFS4f-izrH2ssPCXoNUWjvCsko75GULD08rhMyk2pVH8I4XVWeFgnPNgNs6c5mabG02JmdBG0f3ESOXaue5HREIoYL7PHWMhiuq2fEK-pFlAyWcbLEST7A7PdbWur6k_IJQSysJ9FngQ0eG4TS6as6QGXACrXJlHexaiYQwSwKnwP1_WvcqCdujbF"/>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-white font-medium truncate max-w-[200px]">Summer High</p>
              <span className="material-symbols-outlined text-[#00E5FF] text-xs" data-icon="equalizer">equalizer</span>
            </div>
            <p className="text-xs text-zinc-500">AP Dhillon</p>
          </div>
          <button className="text-zinc-500 hover:text-white ml-4">
            <span className="material-symbols-outlined text-xl" data-icon="favorite">favorite</span>
          </button>
        </div>
        
        {/* Player Controls */}
        <div className="flex flex-col items-center gap-2 w-1/3">
          <div className="flex items-center gap-6">
            <button className="text-zinc-500 hover:text-white transition-colors">
              <span className="material-symbols-outlined text-2xl" data-icon="shuffle">shuffle</span>
            </button>
            <button className="text-white hover:text-[#00E5FF] transition-colors">
              <span className="material-symbols-outlined text-3xl" data-icon="skip_previous">skip_previous</span>
            </button>
            <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black hover:scale-110 active:scale-95 transition-all">
              <span className="material-symbols-outlined text-4xl" data-icon="play_arrow" style={{fontVariationSettings: "'FILL' 1"}}>play_arrow</span>
            </button>
            <button className="text-white hover:text-[#00E5FF] transition-colors">
              <span className="material-symbols-outlined text-3xl" data-icon="skip_next">skip_next</span>
            </button>
            <button className="text-zinc-500 hover:text-white transition-colors">
              <span className="material-symbols-outlined text-2xl" data-icon="repeat">repeat</span>
            </button>
          </div>
          <div className="w-full flex items-center gap-3">
            <span className="text-[10px] text-zinc-500 font-mono">1:24</span>
            <div className="flex-1 h-1 bg-white/10 rounded-full relative group cursor-pointer">
              <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-gradient-to-r from-[#00E5FF] to-[#59feac] rounded-full"></div>
              <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>
            </div>
            <span className="text-[10px] text-zinc-500 font-mono">3:24</span>
          </div>
        </div>
        
        {/* Volume & Extras */}
        <div className="flex items-center justify-end gap-4 w-1/3">
          <button className="text-zinc-500 hover:text-white">
            <span className="material-symbols-outlined text-xl" data-icon="lyrics">lyrics</span>
          </button>
          <button className="text-zinc-500 hover:text-white">
            <span className="material-symbols-outlined text-xl" data-icon="queue_music">queue_music</span>
          </button>
          <div className="flex items-center gap-2 group w-32">
            <span className="material-symbols-outlined text-zinc-500 text-xl" data-icon="volume_up">volume_up</span>
            <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="w-3/4 h-full bg-[#00E5FF]"></div>
            </div>
          </div>
          <button className="text-zinc-500 hover:text-white">
            <span className="material-symbols-outlined text-xl" data-icon="open_in_full">open_in_full</span>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default PlaylistDetails;
