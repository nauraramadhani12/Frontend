import React, { useState } from 'react';
import { ChatMessage, DiagnosisDetails } from '../types/index.ts';

interface ChatAIScreenProps {
  onOpenHistory: () => void;
  onNewChat: () => void;
}

const SAMPLE_DIAGNOSIS: DiagnosisDetails = {
  title: 'Klorosis Daun',
  subtitle: 'Kekurangan Nitrogen & Kelembapan Berlebih',
  explanation:
    'Jaringan daun kekurangan klorofil akibat akar tergenang air terlalu lama dan minim aerasi tanah, menghambat penyerapan hara makro penting.',
  steps: [
    'Gemburkan media tanam perlahan di sekitar pangkal batang untuk membuka sirkulasi udara akar.',
    'Hentikan penyiraman selama 2 hari ke depan hingga media tanam terasa lembap normal (tidak becek).',
    'Semprotkan pupuk daun organik terlarut kaya nitrogen di pagi hari (pukul 07.00 - 08.30 WIB).',
  ],
  tips: 'Gunakan pot dengan lubang drainase cukup dan jangan biarkan air menggenang di tatakan pot setelah hujan ya!',
  disclaimer: 'Ini perkiraan AI. Jika kondisi makin parah, tanyakan ke penyuluh pertanian.',
};

export const ChatAIScreen: React.FC<ChatAIScreenProps> = ({ onOpenHistory, onNewChat }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'assistant',
      text: 'Halo Sobat Tani! Ada yang bisa Dewi bantu untuk merawat tanaman atau ternakmu hari ini?',
      timestamp: '09:41',
    },
    {
      id: 'm2',
      sender: 'user',
      text: 'Daun tanamanku menguning, kenapa ya?',
      timestamp: '09:42',
    },
    {
      id: 'm3',
      sender: 'assistant',
      text: 'Daun yang menguning biasanya terjadi karena kelebihan air atau kurang nutrisi nitrogen. Berikut langkah penanganannya:\n\n1. Kurangi frekuensi penyiraman dan pastikan drainase pot lancar.\n2. Berikan pupuk organik atau NPK dosis rendah secara berkala.\n3. Letakkan tanaman di tempat yang mendapat sinar matahari pagi cukup (4–6 jam).',
      timestamp: '09:43',
    },
  ]);

  const [inputVal, setInputVal] = useState('');
  const [showAttachSheet, setShowAttachSheet] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const suggestionPrompts = [
    'Cara menyiram tanaman',
    'Pupuk yang bagus',
    'Makanan ikan yang tepat',
    'Cara merawat ayam',
    'Pencegahan hama wereng',
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputVal.trim();
    if (!text) return;

    const time = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: 'u_' + Date.now(),
      sender: 'user',
      text,
      timestamp: time,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    // AI intelligent answer
    setTimeout(() => {
      let aiReply = '';
      const lower = text.toLowerCase();
      if (lower.includes('siram') || lower.includes('air')) {
        aiReply =
          'Siram tanaman saat lapisan tanah 2 cm teratas terasa kering. Waktu terbaik adalah pagi hari pukul 06.00-08.00 agar air diserap optimal sebelum terik siang!';
      } else if (lower.includes('pupuk')) {
        aiReply =
          'Gunakan pupuk kandang matang atau kompos organik untuk dasar tanah. Pada fase vegetatif, beri NPK dengan rasio seimbang (16-16-16) dilarutkan ke air siraman.';
      } else if (lower.includes('ikan') || lower.includes('kolam')) {
        aiReply =
          'Beri pakan ikan 2-3 kali sehari secukupnya (habis dalam 3 menit). Rutin ganti 20-30% air kolam seminggu sekali untuk menjaga kadar oksigen dan kejernihan.';
      } else if (lower.includes('ayam') || lower.includes('kandang')) {
        aiReply =
          'Pastikan sirkulasi udara kandang lancar dan alas sekam selalu kering. Beri jagung giling, dedak halus, dan air minum yang dicampur probiotik alami.';
      } else {
        aiReply = `Terima kasih pertanyaannya, Sobat Tani! Mengenai "${text}", kunci utamanya adalah menjaga keseimbangan kelembapan, nutrisi harian, dan pencegahan dini. Dewi Sri siap memantau kemajuan kebun dan ternakmu! 🌱`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: 'a_' + Date.now(),
          sender: 'assistant',
          text: aiReply,
          timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsTyping(false);
    }, 800);
  };

  const handleSimulatePhotoDiagnosis = () => {
    setShowAttachSheet(false);
    const time = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

    const photoUserMsg: ChatMessage = {
      id: 'photo_u_' + Date.now(),
      sender: 'user',
      text: 'Mohon bantuannya Kak Dewi, daunnya seperti ini menguning dan layu sejak kemarin.',
      timestamp: time,
      photoUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCJgxf1xaroQEUEhsHJckRG9hSEbxmWE4Vl9evY9KImD90Boe3dA8UBlMtn6gH8ec_c0W5EEk8cDGkh9EXic0GPE0H1Gf8i9Jphoq2obrloyMSNnRgVNO9087g8p6MXcNwlWMJnC9zPeOTDz_PCLsAXQILUFkuTPtgEfyEtPWtDNzeRL5-o33_81OnGxVi0GxK4ubrgZeVZluDnzEN7aMSpxb2AUcFOD7BkIaL7LLZk',
      photoName: 'Daun_Cabai.jpg',
    };

    setMessages((prev) => [...prev, photoUserMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const diagnosisMsg: ChatMessage = {
        id: 'diag_a_' + Date.now(),
        sender: 'assistant',
        text: 'Analisis foto selesai oleh Dewi Sri.',
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        diagnosis: SAMPLE_DIAGNOSIS,
      };
      setMessages((prev) => [...prev, diagnosisMsg]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col relative w-full pb-28 bg-[#fff8f5]">
      {/* 1. Header Bar */}
      <header className="fixed top-0 inset-x-0 z-40 bg-[#fff8f5] border-b border-[#ffe4d6] shadow-sm">
        <div className="h-[72px] px-4 flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0 bg-emerald-100 ring-2 ring-emerald-200">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSsihJ83KjPipbgxv4Lr4tH8mKC48u6QWmZ0XoqI8FcfOBNe9eZWu8skuid08r2BaDrakDpQk2P0pZQCFOYmxELKRGrSFpTJKuEZ4KyhDBSM2kiHNnCbR9ar-AlyRVAhvch7mbgtgEHGexPQk1Ii84bw9jUDqRUhca4aO91EMo1pOtaU8mInrTCh4STeb5aSteFrqz_h2JUj2gbhePF4q5OFqrQRhJJpcpNOzpRxCc"
                alt="Avatar Dewi Sri"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-base font-extrabold text-[#1E3A2F] leading-tight">Asisten Dewi Sri</h1>
              <p className="text-xs text-gray-500 leading-snug">Tanya seputar tanaman &amp; ternakmu</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenHistory}
              aria-label="Riwayat Chat"
              className="w-10 h-10 rounded-full bg-[#FFE6D6] text-[#0E8551] flex items-center justify-center transition-transform active:scale-95 shadow-sm cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </button>
            <button
              onClick={() => {
                onNewChat();
                setMessages([
                  {
                    id: 'm_init',
                    sender: 'assistant',
                    text: 'Halo Sobat Tani! Dewi Sri siap membantu sesi tanya jawab baru seputar tanaman dan ternakmu.',
                    timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
                  },
                ]);
              }}
              aria-label="Chat Baru"
              className="w-10 h-10 rounded-full bg-[#FFE6D6] text-[#0E8551] flex items-center justify-center transition-transform active:scale-95 shadow-sm cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Messages Stream */}
      <main className="flex-1 flex flex-col pt-20 px-3 max-w-md mx-auto w-full gap-4">
        {/* Time separator */}
        <div className="flex items-center justify-center my-1">
          <span className="px-3.5 py-1 rounded-full bg-[#ffe3ce] text-[#3e4941] text-[11px] font-bold">
            Hari ini • 09:41 WIB
          </span>
        </div>

        {/* Suggestion Chips */}
        <div className="w-full overflow-x-auto no-scrollbar py-1">
          <div className="flex items-center gap-2 pl-2 flex-nowrap">
            {suggestionPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSendMessage(prompt)}
                className="flex-shrink-0 px-3.5 h-9 rounded-full bg-[#FFE6D6] text-[#0E8551] font-bold text-[13px] shadow-sm active:scale-95 transition-transform hover:bg-emerald-100 cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Message Items */}
        {messages.map((msg) => (
          <div key={msg.id} className="flex flex-col gap-1 w-full">
            {msg.sender === 'user' ? (
              <div className="flex flex-col items-end self-end max-w-[85%] gap-1">
                <div className="bg-[#0E8551] text-white rounded-2xl rounded-tr-sm p-3.5 shadow-sm text-sm leading-relaxed">
                  {msg.photoUrl && (
                    <div className="relative w-full rounded-xl overflow-hidden mb-2 bg-black/10">
                      <img src={msg.photoUrl} alt="Foto Tanaman" className="w-full h-40 object-cover" />
                      <div className="absolute top-2 right-2 bg-black/60 text-white backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">photo_camera</span>
                        {msg.photoName || 'Foto_Tanaman.jpg'}
                      </div>
                    </div>
                  )}
                  <p>{msg.text}</p>
                </div>
                <div className="flex items-center gap-1 mr-1">
                  <span className="text-[10px] font-semibold text-[#6e7a70]">{msg.timestamp}</span>
                  <span className="material-symbols-outlined text-xs text-[#0E8551]">done_all</span>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-2 max-w-[95%]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSsihJ83KjPipbgxv4Lr4tH8mKC48u6QWmZ0XoqI8FcfOBNe9eZWu8skuid08r2BaDrakDpQk2P0pZQCFOYmxELKRGrSFpTJKuEZ4KyhDBSM2kiHNnCbR9ar-AlyRVAhvch7mbgtgEHGexPQk1Ii84bw9jUDqRUhca4aO91EMo1pOtaU8mInrTCh4STeb5aSteFrqz_h2JUj2gbhePF4q5OFqrQRhJJpcpNOzpRxCc"
                  alt="Dewi Sri"
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0 mt-1 ring-1 ring-emerald-300"
                />
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  {msg.diagnosis ? (
                    /* Structured AI Diagnosis Card (Image 17/18 & 27/28) */
                    <div className="bg-white rounded-2xl rounded-tl-sm p-4 shadow-md border border-[#ffeadb] flex flex-col gap-3">
                      {/* Status pill */}
                      <div className="flex items-center gap-1.5 self-start bg-[#cfe5ff] text-[#004a78] px-3 py-1 rounded-full text-xs font-bold">
                        <span className="material-symbols-outlined text-sm text-[#0E8551]">check_circle</span>
                        <span>Analisis foto selesai oleh Dewi</span>
                      </div>

                      {/* Diagnosis Header */}
                      <div className="bg-[#0e8551] text-white rounded-xl p-3 shadow-sm">
                        <div className="flex items-center gap-1.5 text-xs font-bold opacity-90 mb-0.5">
                          <span className="material-symbols-outlined text-sm">psychology</span>
                          <span>Hasil Diagnosis AI</span>
                        </div>
                        <h2 className="text-base font-extrabold leading-tight">{msg.diagnosis.title}</h2>
                        <p className="text-xs opacity-90 mt-0.5">{msg.diagnosis.subtitle}</p>
                      </div>

                      {/* Explanation */}
                      <div className="bg-[#fff1e8] rounded-xl p-3">
                        <div className="flex items-center gap-1 text-xs font-bold text-[#0E8551] mb-1">
                          <span className="material-symbols-outlined text-sm">description</span>
                          <span>Penjelasan Gejala</span>
                        </div>
                        <p className="text-xs text-[#2b1704] leading-relaxed">{msg.diagnosis.explanation}</p>
                      </div>

                      {/* Steps */}
                      <div>
                        <div className="flex items-center gap-1 text-xs font-bold text-[#2b1704] mb-2">
                          <span className="material-symbols-outlined text-sm text-[#0E8551]">healing</span>
                          <span>Rekomendasi Tindakan Cepat</span>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          {msg.diagnosis.steps.map((step, idx) => (
                            <div key={idx} className="flex items-start gap-2 bg-[#fff1e8]/60 p-2.5 rounded-lg">
                              <div className="w-5 h-5 rounded-full bg-[#0E8551] text-white flex items-center justify-center text-[10px] font-extrabold flex-shrink-0 mt-0.5">
                                {idx + 1}
                              </div>
                              <p className="text-xs text-[#2b1704] leading-snug">{step}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tips Dewi Sri */}
                      <div className="bg-[#feda5a] text-[#745f00] rounded-xl p-3 shadow-sm">
                        <div className="flex items-center gap-1 text-xs font-bold mb-1">
                          <span className="material-symbols-outlined text-sm">lightbulb</span>
                          <span>Tips Dewi Sri</span>
                        </div>
                        <p className="text-xs leading-relaxed font-medium">{msg.diagnosis.tips}</p>
                      </div>

                      <div className="pt-1 border-t border-[#ffeadb] flex items-center justify-between text-[11px] text-[#6e7a70]">
                        <span>{msg.diagnosis.disclaimer}</span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => alert('Terima kasih atas tanggapan positifmu!')}
                            aria-label="Bermanfaat"
                            className="w-7 h-7 rounded-full bg-[#fff1e8] flex items-center justify-center text-[#2b1704] hover:bg-emerald-100"
                          >
                            <span className="material-symbols-outlined text-xs">thumb_up</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Regular text response */
                    <div className="bg-white rounded-2xl rounded-tl-sm p-3.5 shadow-sm border border-[#ffeadb] text-[#2b1704] text-sm leading-relaxed whitespace-pre-line">
                      {msg.text}
                    </div>
                  )}
                  <span className="text-[10px] font-semibold text-[#6e7a70] ml-1">{msg.timestamp}</span>
                </div>
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-[#6e7a70] pl-10">
            <span className="w-2 h-2 rounded-full bg-[#0E8551] animate-ping"></span>
            <span>Dewi Sri sedang menganalisis diagnosis...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      {/* 3. Bottom Input Bar */}
      <div className="fixed bottom-16 inset-x-0 z-30 px-3 max-w-md mx-auto pointer-events-none">
        <div className="bg-white shadow-xl rounded-full p-1.5 flex items-center gap-2 border border-[#ffeadb] pointer-events-auto">
          <button
            onClick={() => setShowAttachSheet(true)}
            aria-label="Lampirkan Berkas atau Foto"
            className="rounded-full flex items-center justify-center transition-transform active:scale-95 flex-shrink-0 cursor-pointer"
            style={{ width: '44px', height: '44px', backgroundColor: '#FFE6D6', color: '#0E8551' }}
          >
            <svg className="w-5 h-5 -rotate-45" fill="none" stroke="#0E8551" strokeWidth="2.2" viewBox="0 0 24 24">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
            </svg>
          </button>
          <div className="flex-1 relative flex items-center min-w-0">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Tulis pertanyaanmu..."
              className="w-full bg-transparent px-2 py-2 text-[#2b1704] placeholder:text-[#6e7a70] text-sm focus:outline-none"
            />
          </div>
          <button
            onClick={() => handleSendMessage()}
            aria-label="Kirim Pesan"
            className="rounded-full flex items-center justify-center text-white shadow-md active:translate-y-0.5 transition-all flex-shrink-0 cursor-pointer"
            style={{ width: '44px', height: '44px', backgroundColor: '#0E8551' }}
          >
            <span className="material-symbols-outlined text-white text-[20px]">send</span>
          </button>
        </div>
      </div>

      {/* 4. Bottom Sheet: Photo Attachment / Diagnosis (Image 27 & 28) */}
      {showAttachSheet && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex flex-col justify-end p-3 animate-fade-in">
          <div className="bg-[#fff8f5] rounded-3xl p-5 shadow-2xl border border-[#ffeadb] max-w-md mx-auto w-full flex flex-col gap-4 animate-slide-up">
            <div className="w-10 h-1 bg-[#bdcabe] rounded-full mx-auto"></div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-[#2b1704]">Lampirkan Foto Tanaman</h3>
                <p className="text-xs text-[#6e7a70]">Pilih metode pengambilan diagnosis visual</p>
              </div>
              <button
                onClick={() => setShowAttachSheet(false)}
                aria-label="Tutup Lampiran"
                className="w-8 h-8 rounded-full bg-[#ffeadb] text-[#2b1704] flex items-center justify-center active:scale-95 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleSimulatePhotoDiagnosis}
                className="flex flex-col items-center justify-center p-4 rounded-2xl bg-[#0E8551] text-white shadow-md active:translate-y-1 transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-700 text-white flex items-center justify-center mb-2 shadow-inner group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-2xl">photo_camera</span>
                </div>
                <span className="font-extrabold text-xs text-center leading-tight">Ambil Foto Langsung</span>
                <span className="text-[10px] opacity-80 mt-0.5">Kamera Handphone</span>
              </button>

              <button
                onClick={handleSimulatePhotoDiagnosis}
                className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white text-[#2b1704] shadow-md border border-[#ffeadb] active:translate-y-1 transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mb-2 shadow-inner group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-2xl">collections</span>
                </div>
                <span className="font-extrabold text-xs text-center leading-tight">Pilih dari Galeri</span>
                <span className="text-[10px] text-[#6e7a70] mt-0.5">Media &amp; Album</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
