import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, DiagnosisDetails } from '../types/index.ts';
import { playPop, playSparkle } from '../utils/audioEffects.ts';

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
  disclaimer: 'Ini rekomendasi cerdas AI Dewi Sri. Jika kondisi makin parah, tanyakan ke penyuluh pertanian setempat.',
};

export const ChatAIScreen: React.FC<ChatAIScreenProps> = ({ onOpenHistory, onNewChat }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'assistant',
      text: 'Halo Sobat Tani! 🌿 Ada yang bisa Dewi bantu untuk merawat tanaman atau ternakmu hari ini? Kamu juga bisa kirim foto tanamanmu untuk diagnosis cepat!',
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
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [showScannerHUD, setShowScannerHUD] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isScanning]);

  const categoryChips = [
    { label: '📸 Diagnosa Foto', action: () => setShowAttachSheet(true) },
    { label: '🌱 Hama & Wereng', prompt: 'Bagaimana cara mencegah hama wereng padi?' },
    { label: '💧 Jadwal Siram', prompt: 'Berapa kali sebaiknya menyiram tanaman dalam sehari?' },
    { label: '🌾 Pupuk Organik', prompt: 'Rekomendasi takaran pupuk organik untuk tanaman sayur' },
    { label: '🐟 Kolam Ikan', prompt: 'Cara menjaga air kolam ikan lele dan nila tetap bersih' },
    { label: '🐔 Kandang Ayam', prompt: 'Perawatan ayam petelur agar rajin bertelur' },
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputVal.trim();
    if (!text) return;

    playPop();
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

    // AI intelligent answer simulation
    setTimeout(() => {
      let aiReply = '';
      const lower = text.toLowerCase();
      if (lower.includes('siram') || lower.includes('air')) {
        aiReply =
          'Siram tanaman saat lapisan tanah 2 cm teratas terasa agak kering. Waktu terbaik adalah pagi hari pukul 06.00-08.00 agar air diserap optimal sebelum terik siang!';
      } else if (lower.includes('pupuk')) {
        aiReply =
          'Gunakan pupuk kandang matang atau kompos organik untuk dasar tanah. Pada fase vegetatif, beri NPK dengan rasio seimbang (16-16-16) dilarutkan ke air siraman.';
      } else if (lower.includes('ikan') || lower.includes('kolam')) {
        aiReply =
          'Beri pakan ikan 2-3 kali sehari secukupnya (habis dalam 3 menit). Rutin ganti 20-30% air kolam seminggu sekali untuk menjaga kadar oksigen dan kejernihan.';
      } else if (lower.includes('ayam') || lower.includes('kandang')) {
        aiReply =
          'Pastikan sirkulasi udara kandang lancar dan alas sekam selalu kering. Beri jagung giling, dedak halus, dan air minum yang dicampur probiotik alami.';
      } else if (lower.includes('wereng') || lower.includes('hama')) {
        aiReply =
          'Pencegahan hama wereng: semprotkan pestisida nabati dari ekstrak daun mimba atau daun sirsak. Jaga jarak tanam dan hindari genangan air berlebih di sawah.';
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
      playSparkle();
    }, 700);
  };

  const handleStartCameraScan = () => {
    setShowAttachSheet(false);
    setShowScannerHUD(true);
    playPop();
    setTimeout(() => {
      setShowScannerHUD(false);
      executePhotoDiagnosis();
    }, 2200);
  };

  const executePhotoDiagnosis = () => {
    const time = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    const photoUserMsg: ChatMessage = {
      id: 'photo_u_' + Date.now(),
      sender: 'user',
      text: 'Mohon bantuannya Kak Dewi, daun cabai di pot menguning dan layu sejak kemarin.',
      timestamp: time,
      photoUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCJgxf1xaroQEUEhsHJckRG9hSEbxmWE4Vl9evY9KImD90Boe3dA8UBlMtn6gH8ec_c0W5EEk8cDGkh9EXic0GPE0H1Gf8i9Jphoq2obrloyMSNnRgVNO9087g8p6MXcNwlWMJnC9zPeOTDz_PCLsAXQILUFkuTPtgEfyEtPWtDNzeRL5-o33_81OnGxVi0GxK4ubrgZeVZluDnzEN7aMSpxb2AUcFOD7BkIaL7LLZk',
      photoName: 'Daun_Cabai_Klorosis.jpg',
    };

    setMessages((prev) => [...prev, photoUserMsg]);
    setIsScanning(true);

    setTimeout(() => {
      setIsScanning(false);
      const diagnosisMsg: ChatMessage = {
        id: 'diag_a_' + Date.now(),
        sender: 'assistant',
        text: 'Analisis foto selesai oleh Dewi Sri.',
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        diagnosis: SAMPLE_DIAGNOSIS,
      };
      setMessages((prev) => [...prev, diagnosisMsg]);
      playSparkle();
    }, 1200);
  };

  const handleSimulatePhotoDiagnosis = () => {
    handleStartCameraScan();
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopyFeedback('Tersalin ke clipboard! 📋');
    setTimeout(() => setCopyFeedback(null), 1800);
  };

  return (
    <div className="flex-1 flex flex-col relative w-full pb-32 bg-[#fff8f5] select-none">
      {/* 1. Header Bar */}
      <header className="fixed top-0 inset-x-0 z-40 bg-[#fff8f5]/95 backdrop-blur-md border-b border-[#ffe4d6] shadow-xs">
        <div className="h-[72px] px-4 flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0 bg-emerald-100 ring-2 ring-emerald-300 shadow-sm">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSsihJ83KjPipbgxv4Lr4tH8mKC48u6QWmZ0XoqI8FcfOBNe9eZWu8skuid08r2BaDrakDpQk2P0pZQCFOYmxELKRGrSFpTJKuEZ4KyhDBSM2kiHNnCbR9ar-AlyRVAhvch7mbgtgEHGexPQk1Ii84bw9jUDqRUhca4aO91EMo1pOtaU8mInrTCh4STeb5aSteFrqz_h2JUj2gbhePF4q5OFqrQRhJJpcpNOzpRxCc"
                  alt="Avatar Dewi Sri"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white animate-pulse"></span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-base font-extrabold text-[#1E3A2F] leading-tight flex items-center gap-1">
                Asisten Dewi Sri
                <span className="material-symbols-outlined text-xs text-amber-500 filled-icon">verified</span>
              </h1>
              <p className="text-[11px] text-emerald-800 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Agronom Digital Siap Membantu
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playPop();
                onOpenHistory();
              }}
              title="Riwayat Chat"
              aria-label="Riwayat Chat"
              className="w-10 h-10 rounded-full bg-[#FFE6D6] hover:bg-[#fad3b3] text-[#0E8551] flex items-center justify-center transition-transform active:scale-95 shadow-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">history</span>
            </button>
            <button
              onClick={() => {
                playPop();
                onNewChat();
                setMessages([
                  {
                    id: 'm_init_' + Date.now(),
                    sender: 'assistant',
                    text: 'Halo Sobat Tani! Sesi baru telah dimulai. Ada tanaman atau ternak yang ingin dikonsultasikan hari ini? 🌾',
                    timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
                  },
                ]);
              }}
              title="Chat Baru"
              aria-label="Chat Baru"
              className="w-10 h-10 rounded-full bg-[#0E8551] text-white flex items-center justify-center transition-transform active:scale-95 shadow-xs cursor-pointer hover:bg-[#0b6e43]"
            >
              <span className="material-symbols-outlined text-[20px]">add_comment</span>
            </button>
          </div>
        </div>
      </header>

      {/* Copy Feedback Toast */}
      {copyFeedback && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-1.5 bg-[#0E8551] text-white font-extrabold text-xs rounded-full shadow-lg animate-bounce">
          {copyFeedback}
        </div>
      )}

      {/* 2. Messages Stream */}
      <main className="flex-1 flex flex-col pt-20 px-3 max-w-md mx-auto w-full gap-4">
        {/* Time separator */}
        <div className="flex items-center justify-center my-1">
          <span className="px-3.5 py-1 rounded-full bg-[#ffe3ce] text-[#3e4941] text-[11px] font-bold shadow-2xs">
            Hari ini • Konsultasi Cerdas Tani
          </span>
        </div>

        {/* Category Prompt Chips */}
        <div className="w-full overflow-x-auto no-scrollbar py-1">
          <div className="flex items-center gap-2 pl-1 flex-nowrap">
            {categoryChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (chip.action) chip.action();
                  else if (chip.prompt) handleSendMessage(chip.prompt);
                }}
                className="flex-shrink-0 px-3.5 h-8 rounded-full bg-white border border-[#ffeadb] text-[#0E8551] font-bold text-[12px] shadow-xs active:scale-95 transition-all hover:bg-[#e8f7ee] hover:border-emerald-300 cursor-pointer flex items-center gap-1"
              >
                <span>{chip.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Message Items */}
        {messages.map((msg) => (
          <div key={msg.id} className="flex flex-col gap-1 w-full animate-pop-in">
            {msg.sender === 'user' ? (
              <div className="flex flex-col items-end self-end max-w-[85%] gap-1">
                <div className="bg-gradient-to-br from-[#0E8551] to-[#00522f] text-white rounded-2xl rounded-tr-sm p-3.5 shadow-md text-sm leading-relaxed">
                  {msg.photoUrl && (
                    <div className="relative w-full rounded-xl overflow-hidden mb-2 bg-black/10 border border-white/20">
                      <img src={msg.photoUrl} alt="Foto Tanaman" className="w-full h-44 object-cover" />
                      <div className="absolute top-2 right-2 bg-black/60 text-white backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">photo_camera</span>
                        <span>{msg.photoName || 'Foto_Tanaman.jpg'}</span>
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
              <div className="flex items-start gap-2.5 max-w-[95%]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSsihJ83KjPipbgxv4Lr4tH8mKC48u6QWmZ0XoqI8FcfOBNe9eZWu8skuid08r2BaDrakDpQk2P0pZQCFOYmxELKRGrSFpTJKuEZ4KyhDBSM2kiHNnCbR9ar-AlyRVAhvch7mbgtgEHGexPQk1Ii84bw9jUDqRUhca4aO91EMo1pOtaU8mInrTCh4STeb5aSteFrqz_h2JUj2gbhePF4q5OFqrQRhJJpcpNOzpRxCc"
                  alt="Dewi Sri"
                  className="w-9 h-9 rounded-full object-cover flex-shrink-0 mt-1 ring-2 ring-emerald-300 shadow-sm"
                />
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  {msg.diagnosis ? (
                    /* Structured AI Diagnosis Card */
                    <div className="bg-white rounded-3xl rounded-tl-sm p-4 shadow-md border border-[#ffeadb] flex flex-col gap-3">
                      {/* Status pill */}
                      <div className="flex items-center gap-1.5 self-start bg-emerald-100 text-[#006a3e] px-3 py-1 rounded-full text-xs font-extrabold border border-emerald-200">
                        <span className="material-symbols-outlined text-sm text-[#0E8551]">check_circle</span>
                        <span>Analisis Foto Selesai oleh Dewi Sri</span>
                      </div>

                      {/* Diagnosis Header */}
                      <div className="bg-gradient-to-br from-[#0e8551] to-[#00522f] text-white rounded-2xl p-3.5 shadow-sm">
                        <div className="flex items-center gap-1.5 text-xs font-bold opacity-90 mb-1">
                          <span className="material-symbols-outlined text-sm">psychology</span>
                          <span>Hasil Diagnosis AI Agronomi</span>
                        </div>
                        <h2 className="text-base font-extrabold leading-tight">{msg.diagnosis.title}</h2>
                        <p className="text-xs text-emerald-100 mt-0.5">{msg.diagnosis.subtitle}</p>
                      </div>

                      {/* Explanation */}
                      <div className="bg-[#fff1e8] rounded-2xl p-3.5 border border-[#ffeadb]">
                        <div className="flex items-center gap-1 text-xs font-extrabold text-[#0E8551] mb-1">
                          <span className="material-symbols-outlined text-sm">description</span>
                          <span>Penjelasan Gejala</span>
                        </div>
                        <p className="text-xs text-[#2b1704] leading-relaxed">{msg.diagnosis.explanation}</p>
                      </div>

                      {/* Steps */}
                      <div>
                        <div className="flex items-center gap-1 text-xs font-extrabold text-[#2b1704] mb-2">
                          <span className="material-symbols-outlined text-sm text-[#0E8551]">healing</span>
                          <span>Rekomendasi Tindakan Cepat</span>
                        </div>
                        <div className="flex flex-col gap-2">
                          {msg.diagnosis.steps.map((step, idx) => (
                            <div key={idx} className="flex items-start gap-2.5 bg-[#fff8f5] p-3 rounded-xl border border-[#ffeadb]">
                              <div className="w-5 h-5 rounded-full bg-[#0E8551] text-white flex items-center justify-center text-[10px] font-extrabold flex-shrink-0 mt-0.5 shadow-2xs">
                                {idx + 1}
                              </div>
                              <p className="text-xs text-[#2b1704] leading-relaxed">{step}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tips Dewi Sri */}
                      <div className="bg-[#feda5a] text-[#745f00] rounded-2xl p-3.5 shadow-xs border border-amber-300">
                        <div className="flex items-center gap-1.5 text-xs font-extrabold mb-1">
                          <span className="material-symbols-outlined text-base">lightbulb</span>
                          <span>Tips Petani Dewi Sri</span>
                        </div>
                        <p className="text-xs leading-relaxed font-semibold">{msg.diagnosis.tips}</p>
                      </div>

                      {/* Disclaimer & Action */}
                      <div className="pt-2 border-t border-[#ffeadb] flex items-center justify-between text-[11px] text-[#6e7a70]">
                        <span className="leading-tight pr-2">{msg.diagnosis.disclaimer}</span>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleCopy(`${msg.diagnosis?.title}\n${msg.diagnosis?.explanation}`)}
                            title="Salin Diagnosis"
                            className="w-8 h-8 rounded-full bg-[#fff1e8] hover:bg-emerald-100 flex items-center justify-center text-[#2b1704] cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-xs">content_copy</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Regular text response */
                    <div className="bg-white rounded-3xl rounded-tl-sm p-4 shadow-sm border border-[#ffeadb] text-[#2b1704] text-sm leading-relaxed whitespace-pre-line relative group">
                      <p>{msg.text}</p>
                      <button
                        onClick={() => handleCopy(msg.text)}
                        title="Salin Teks"
                        className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 right-2 w-6 h-6 rounded-full bg-[#fff1e8] text-[#006a3e] flex items-center justify-center cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[13px]">content_copy</span>
                      </button>
                    </div>
                  )}
                  <span className="text-[10px] font-semibold text-[#6e7a70] ml-1">{msg.timestamp}</span>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* AI Scanner Simulation */}
        {isScanning && (
          <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-emerald-200 shadow-sm animate-pulse ml-8">
            <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center animate-spin">
              <span className="material-symbols-outlined text-xs">hourglass_empty</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#006a3e]">Dewi Sri sedang memindai foto daun...</span>
              <span className="text-[10px] text-[#6e7a70]">Mencocokkan tanda penyakit &amp; klorosis tanaman</span>
            </div>
          </div>
        )}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-[#6e7a70] pl-10">
            <span className="w-2 h-2 rounded-full bg-[#0E8551] animate-ping"></span>
            <span className="font-bold text-[#0E8551]">Dewi Sri sedang merangkai saran...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      {/* 3. Bottom Input Bar */}
      <div className="fixed bottom-16 inset-x-0 z-30 px-3 max-w-md mx-auto pointer-events-none">
        <div className="bg-white/95 backdrop-blur-xl shadow-[0_8px_25px_rgba(43,23,4,0.1)] rounded-full p-1.5 flex items-center gap-2 border border-[#ffeadb] pointer-events-auto">
          {/* Attach Button */}
          <button
            onClick={() => {
              playPop();
              setShowAttachSheet(true);
            }}
            title="Lampirkan Foto Tanaman"
            aria-label="Lampirkan Berkas atau Foto"
            className="w-11 h-11 rounded-full bg-[#FFE6D6] hover:bg-emerald-100 flex items-center justify-center transition-all active:scale-95 flex-shrink-0 cursor-pointer text-[#0E8551]"
          >
            <span className="material-symbols-outlined text-[20px]">photo_camera</span>
          </button>

          {/* Text Input */}
          <div className="flex-1 relative flex items-center min-w-0">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Tulis pertanyaanmu seputar tani..."
              className="w-full bg-transparent px-2 py-2 text-[#2b1704] placeholder:text-[#6e7a70] text-sm focus:outline-none"
            />
          </div>

          {/* Send Button */}
          <button
            onClick={() => handleSendMessage()}
            aria-label="Kirim Pesan"
            className="w-11 h-11 rounded-full bg-[#0E8551] hover:bg-[#0b6e43] text-white flex items-center justify-center shadow-md active:translate-y-0.5 transition-all flex-shrink-0 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">send</span>
          </button>
        </div>
      </div>

      {/* 4. Bottom Sheet: Photo Attachment / Diagnosis */}
      {showAttachSheet && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex flex-col justify-end p-3 animate-fade-in">
          <div className="bg-[#fff8f5] rounded-3xl p-5 shadow-2xl border border-[#ffeadb] max-w-md mx-auto w-full flex flex-col gap-4 animate-slide-up">
            <div className="w-10 h-1 bg-[#bdcabe] rounded-full mx-auto"></div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-[#2b1704]">Konsultasi Foto Tanaman</h3>
                <p className="text-xs text-[#6e7a70]">Dewi Sri akan menganalisis penyakit dari foto</p>
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
                className="flex flex-col items-center justify-center p-4 rounded-2xl bg-[#0E8551] text-white shadow-md active:translate-y-1 transition-all cursor-pointer group hover:bg-[#0b6e43]"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-700 text-white flex items-center justify-center mb-2 shadow-inner group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-2xl">photo_camera</span>
                </div>
                <span className="font-extrabold text-xs text-center leading-tight">Ambil Foto Langsung</span>
                <span className="text-[10px] opacity-80 mt-0.5">Kamera Handphone</span>
              </button>

              <button
                onClick={handleSimulatePhotoDiagnosis}
                className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white text-[#2b1704] shadow-md border border-[#ffeadb] active:translate-y-1 transition-all cursor-pointer group hover:bg-neutral-50"
              >
                <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mb-2 shadow-inner group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-2xl">collections</span>
                </div>
                <span className="font-extrabold text-xs text-center leading-tight">Pilih dari Galeri</span>
                <span className="text-[10px] text-[#6e7a70] mt-0.5">Media &amp; Album Foto</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};