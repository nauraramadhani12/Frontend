import React, { useState } from 'react';
import { ChatConversation } from '../types/index.ts';
import { searchConversations } from '../utils/petRules.ts';

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
    title: 'Daun cabai menguning',
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
    title: 'Ayam pucat dan lemas',
    snippet: 'Periksa suhu kandang dan berikan elektrolit serta vitamin larut air...',
    dateCategory: 'kemarin',
    dateLabel: 'Kemarin',
    timestamp: 'Kemarin',
    messages: [],
  },
  {
    id: 'c5',
    title: 'Dosis pupuk organik cair padi',
    snippet: 'Takaran 2 tutup botol per tangki semprot 14 liter seminggu sekali...',
    dateCategory: 'minggu_ini',
    dateLabel: '7 Hari Terakhir',
    timestamp: '4 Mei',
    messages: [],
  },
  {
    id: 'c6',
    title: 'Makanan ikan yang tepat',
    snippet: 'Pelet ukuran 1mm cocok untuk benih ikan air tawar usia 2 bulan...',
    dateCategory: 'minggu_ini',
    dateLabel: '7 Hari Terakhir',
    timestamp: '2 Mei',
    messages: [],
  },
  {
    id: 'c7',
    title: 'Pencegahan hama wereng',
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
  const [swipedId, setSwipedId] = useState<string | null>('c4'); // Demonstrate swipe on c4 like in screenshot!

  const filtered = searchConversations(conversations, searchQuery);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (swipedId === id) setSwipedId(null);
  };

  const sections: { key: ChatConversation['dateCategory']; label: string }[] = [
    { key: 'hari_ini', label: 'Hari Ini' },
    { key: 'kemarin', label: 'Kemarin' },
    { key: 'minggu_ini', label: '7 Hari Terakhir' },
    { key: 'lebih_lama', label: 'Lebih Lama' },
  ];

  return (
    <div className="flex-1 flex flex-col relative w-full pb-28 bg-[#fff8f5] select-none">
      {/* 1. Header Bar */}
      <header className="fixed top-0 inset-x-0 z-40 bg-[#fff8f5] border-b border-[#ffe4d6] shadow-sm">
        <div className="h-16 px-4 flex items-center justify-between max-w-md mx-auto">
          <button
            onClick={onBackToChat}
            aria-label="Kembali ke Chat"
            className="w-10 h-10 rounded-full bg-[#ffeadb] flex items-center justify-center text-[#2b1704] shadow-[0_2px_0_0_#fad3b3] active:translate-y-0.5 transition-transform shrink-0 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[22px]">arrow_back</span>
          </button>
          <h1 className="font-extrabold text-[18px] text-[#002110] tracking-tight text-center flex-1 pr-1">
            Riwayat Chat
          </h1>
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
            placeholder="Cari percakapan..."
            className="w-full h-12 pl-11 pr-4 bg-white text-[#2b1704] placeholder:text-[#6e7a70] text-sm rounded-full border border-[#ffe4d6] shadow-sm focus:outline-none focus:bg-[#fff1e8] transition-all"
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

        {/* Categorized Lists */}
        <div className="flex flex-col gap-5 mt-1 pb-16">
          {sections.map((sec) => {
            const items = filtered.filter((c) => c.dateCategory === sec.key);
            if (items.length === 0) return null;

            return (
              <section key={sec.key} className="flex flex-col gap-2">
                <h2 className="font-bold text-[12px] text-[#6e7a70] px-1 tracking-wider uppercase">
                  {sec.label}
                </h2>
                <div className="flex flex-col gap-2.5">
                  {items.map((item) => {
                    const isSwiped = swipedId === item.id;
                    const isOpen = item.isActive;

                    return (
                      <div
                        key={item.id}
                        className="relative overflow-hidden rounded-2xl shadow-sm cursor-pointer"
                        onClick={() => {
                          onSelectConversation(item);
                          onBackToChat();
                        }}
                      >
                        {/* Slide Delete Container */}
                        <div
                          className={`p-3.5 rounded-2xl border transition-all duration-300 flex flex-col gap-1 ${
                            isOpen
                              ? 'bg-[#eaf5ec] border-green-200'
                              : 'bg-white border-[#ffe4d6] hover:bg-[#fff1e8]'
                          } ${isSwiped ? '-translate-x-20' : 'translate-x-0'}`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-bold text-[15px] text-[#2b1704] truncate">
                              {item.title}
                            </span>
                            <div className="flex items-center gap-1.5 shrink-0">
                              {isOpen && (
                                <span className="bg-green-100 text-[#006a3e] text-[11px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                                  Sedang dibuka
                                </span>
                              )}
                              <span className="text-[12px] text-[#6e7a70] font-semibold">
                                {item.timestamp}
                              </span>
                            </div>
                          </div>
                          <p className="text-[13px] text-[#3e4941] line-clamp-1">{item.snippet}</p>
                        </div>

                        {/* Red Delete Button for swiped item */}
                        {isSwiped && (
                          <button
                            onClick={(e) => handleDelete(item.id, e)}
                            aria-label="Hapus percakapan"
                            className="absolute right-0 top-0 bottom-0 px-4 bg-red-500 hover:bg-red-600 text-white rounded-r-2xl flex items-center justify-center gap-1.5 font-bold text-sm shadow-sm transition-colors cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[18px]">delete</span>
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
              onNewChat();
              onBackToChat();
            }}
            className="pointer-events-auto h-12 px-6 w-full max-w-sm bg-[#0E8551] hover:bg-emerald-700 text-white rounded-full font-bold text-[15px] shadow-md active:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span>+ Chat Baru</span>
          </button>
        </div>
      </main>
    </div>
  );
};
