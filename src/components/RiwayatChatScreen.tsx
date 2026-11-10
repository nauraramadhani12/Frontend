import React, { useState } from 'react';
import { ChatConversation } from '../types/index.ts';
import { searchConversations } from '../utils/petRules.ts';
import { playPop } from '../utils/audioEffects.ts';

interface RiwayatChatScreenProps {
  onBackToChat: () => void;
  onSelectConversation: (convo: ChatConversation) => void;
  onNewChat: () => void;
}

const INITIAL_CONVERSATIONS: ChatConversation[] = [
  {
    id: 'c1',
    title: 'Daun padi menguning bercak cokelat',
    snippet: 'Bercak cokelat berbentuk belah ketupat mengindikasikan penyakit blas padi...',
    dateCategory: 'hari_ini',
    dateLabel: 'Hari Ini',
    timestamp: '14:20',
    isActive: true,
    messages: [],
  },
  {
    id: 'c2',
    title: 'Daun cabai menguning di polybag',
    snippet: 'Kekurangan nitrogen atau penyiraman berlebih pada media polybag...',
    dateCategory: 'hari_ini',
    dateLabel: 'Hari Ini',
    timestamp: '09:15',
    messages: [],
  },
  {
    id: 'c3',
    title: 'Ikan koki berenang mengapung lemas',
    snippet: 'Periksa gangguan gelembung renang dan kurangi pakan pelet mengapung...',
    dateCategory: 'kemarin',
    dateLabel: 'Kemarin',
    timestamp: 'Kemarin',
    messages: [],
  },
  {
    id: 'c4',
    title: 'Ayam pucat dan kurang nafsu makan',
    snippet: 'Periksa suhu kandang dan berikan elektrolit serta vitamin larut air...',
    dateCategory: 'kemarin',
    dateLabel: 'Kemarin',
    timestamp: 'Kemarin',
    messages: [],
  },
  {
    id: 'c5',
    title: 'Dosis pupuk organik cair pada padi',
    snippet: 'Takaran 2 tutup botol per tangki semprot 14 liter seminggu sekali...',
    dateCategory: 'minggu_ini',
    dateLabel: '7 Hari Terakhir',
    timestamp: '4 Mei',
    messages: [],
  },
  {
    id: 'c6',
    title: 'Pakan tepat untuk ikan nila & lele',
    snippet: 'Pelet protein 30% cocok untuk pertumbuhan optimal benih kolam...',
    dateCategory: 'minggu_ini',
    dateLabel: '7 Hari Terakhir',
    timestamp: '2 Mei',
    messages: [],
  },
  {
    id: 'c7',
    title: 'Pencegahan hama wereng cokelat',
    snippet: 'Semprotkan ekstrak daun mimba secara teratur menjelang fase bunting...',
    dateCategory: 'lebih_lama',
    dateLabel: 'Lebih Lama',
    timestamp: '24 Apr',
    messages: [],
  },
];

export const RiwayatChatScreen: React.FC<RiwayatChatScreenProps> = ({
  onBackToChat,
  onSelectConversation,
  onNewChat,
}) => {
  const [conversations, setConversations] = useState<ChatConversation[]>(INITIAL_CONVERSATIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [swipedId, setSwipedId] = useState<string | null>('c4');

  const filtered = searchConversations(conversations, searchQuery);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playPop();
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (swipedId === id) setSwipedId(null);
  };

  const getTopicIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('ikan') || t.includes('kolam')) return '🐟';
    if (t.includes('ayam') || t.includes('kandang')) return '🐔';
    if (t.includes('padi') || t.includes('pupuk')) return '🌾';
    if (t.includes('cabai') || t.includes('daun')) return '🌿';
    return '🌱';
  };

  const sections: { key: ChatConversation['dateCategory']; label: string }[] = [
    { key: 'hari_ini', label: 'Hari Ini' },
    { key: 'kemarin', label: 'Kemarin' },
    { key: 'minggu_ini', label: '7 Hari Terakhir' },
    { key: 'lebih_lama', label: 'Lebih Lama' },
  ];

  return (
    <div className="flex-1 flex flex-col relative w-full pb-32 bg-[#fff8f5] select-none">
      {/* 1. Header Bar */}
      <header className="fixed top-0 inset-x-0 z-40 bg-[#fff8f5]/95 backdrop-blur-md border-b border-[#ffe4d6] shadow-xs">
        <div className="h-16 px-4 flex items-center justify-between max-w-md mx-auto">
          <button
            onClick={() => {
              playPop();
              onBackToChat();
            }}
            aria-label="Kembali ke Chat"
            className="w-10 h-10 rounded-full bg-[#ffeadb] flex items-center justify-center text-[#2b1704] shadow-[0_2px_0_0_#fad3b3] active:translate-y-0.5 transition-transform shrink-0 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[22px]">arrow_back</span>
          </button>
          <div className="flex flex-col items-center">
            <h1 className="font-extrabold text-[17px] text-[#002110] tracking-tight">
              Catatan Konsultasi Tani
            </h1>
            <span className="text-[10px] text-[#0E8551] font-bold">
              {conversations.length} Topik Tersimpan
            </span>
          </div>
          <div className="w-10 h-10 shrink-0"></div>
        </div>
      </header>

      {/* 2. Main Content */}
      <main className="flex-1 flex flex-col pt-16 px-4 max-w-md mx-auto w-full gap-4">
        {/* Search Bar */}
        <div className="relative w-full mt-3">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6e7a70]">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari topik atau masalah tani..."
            className="w-full h-12 pl-11 pr-9 bg-white text-[#2b1704] placeholder:text-[#6e7a70] text-sm rounded-full border border-[#ffe4d6] shadow-xs focus:outline-none focus:ring-2 focus:ring-[#006a3e]/30 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              <span className="material-symbols-outlined text-sm">cancel</span>
            </button>
          )}
        </div>

        {/* Empty State if No Match */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center p-8 bg-white rounded-3xl border border-[#ffeadb] text-center mt-4">
            <span className="text-4xl mb-2">🌾</span>
            <h3 className="font-extrabold text-sm text-[#2b1704]">Tidak Ada Catatan yang Cocok</h3>
            <p className="text-xs text-[#6e7a70] mt-1">Coba kata kunci lain atau mulai sesi tanya baru</p>
          </div>
        )}

        {/* Categorized Lists */}
        <div className="flex flex-col gap-5 mt-1 pb-16">
          {sections.map((sec) => {
            const items = filtered.filter((c) => c.dateCategory === sec.key);
            if (items.length === 0) return null;

            return (
              <section key={sec.key} className="flex flex-col gap-2">
                <div className="flex items-center gap-1.5 px-1">
                  <span className="w-2 h-2 rounded-full bg-[#006a3e]"></span>
                  <h2 className="font-extrabold text-[12px] text-[#6e7a70] tracking-wider uppercase">
                    {sec.label}
                  </h2>
                </div>
                <div className="flex flex-col gap-2.5">
                  {items.map((item) => {
                    const isSwiped = swipedId === item.id;
                    const isOpen = item.isActive;

                    return (
                      <div
                        key={item.id}
                        className="relative overflow-hidden rounded-2xl shadow-xs cursor-pointer group"
                        onClick={() => {
                          playPop();
                          onSelectConversation(item);
                          onBackToChat();
                        }}
                      >
                        {/* Slide Delete Container */}
                        <div
                          className={`p-3.5 rounded-2xl border transition-all duration-300 flex items-start gap-3 ${
                            isOpen
                              ? 'bg-[#eaf5ec] border-green-300 shadow-sm'
                              : 'bg-white border-[#ffe4d6] hover:bg-[#fff1e8]'
                          } ${isSwiped ? '-translate-x-20' : 'translate-x-0'}`}
                        >
                          <div className="w-10 h-10 rounded-xl bg-[#fff8f5] border border-[#ffeadb] flex items-center justify-center text-lg flex-shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                            {getTopicIcon(item.title)}
                          </div>
                          <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                            <div className="flex items-center justify-between gap-1">
                              <span className="font-extrabold text-[14px] text-[#2b1704] truncate">
                                {item.title}
                              </span>
                              <span className="text-[11px] text-[#6e7a70] font-semibold shrink-0">
                                {item.timestamp}
                              </span>
                            </div>
                            <p className="text-xs text-[#3e4941] line-clamp-1 leading-snug">{item.snippet}</p>
                            {isOpen && (
                              <div className="inline-flex items-center gap-1 mt-1 text-[10px] font-extrabold text-[#006a3e]">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                <span>Sesi Aktif</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Red Delete Button for swiped item */}
                        {isSwiped && (
                          <button
                            onClick={(e) => handleDelete(item.id, e)}
                            aria-label="Hapus percakapan"
                            className="absolute right-0 top-0 bottom-0 px-4 bg-rose-600 hover:bg-rose-700 text-white rounded-r-2xl flex items-center justify-center gap-1 font-bold text-xs shadow-sm transition-colors cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[16px]">delete</span>
                            <span>Hapus</span>
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        {/* Floating "+ Chat Baru" button */}
        <div className="fixed bottom-16 inset-x-0 z-40 px-4 flex justify-center pointer-events-none max-w-md mx-auto">
          <button
            onClick={() => {
              playPop();
              onNewChat();
              onBackToChat();
            }}
            className="pointer-events-auto h-12 px-6 w-full max-w-sm bg-[#0E8551] hover:bg-[#0b6e43] text-white rounded-full font-extrabold text-sm shadow-[0_4px_0_0_#00522f] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">add_circle</span>
            <span>+ Tanya Sesi Baru</span>
          </button>
        </div>
      </main>
    </div>
  );
};