import { useMemo, useState } from 'react';
import { ArrowLeft, BookOpen, Check, ChevronRight, Fish, Leaf, MessageCircle, Plus, Search, Trash2, Wheat, X } from 'lucide-react';
import type { ChatConversation } from '../types/index.ts';
import { searchConversations } from '../utils/petRules.ts';
import { playPop } from '../utils/audioEffects.ts';
import { Dialog } from './ui/Dialog.tsx';
import '../styles/secondary.css';

interface RiwayatChatScreenProps {
  conversations: ChatConversation[];
  activeConversationId: string | null;
  onBackToChat: () => void;
  onSelectConversation: (conversation: ChatConversation) => void;
  onDeleteConversation: (id: string) => void;
  onNewChat: () => void;
}

const sections: { key: ChatConversation['dateCategory']; label: string }[] = [
  { key: 'hari_ini', label: 'Hari ini' },
  { key: 'kemarin', label: 'Kemarin' },
  { key: 'minggu_ini', label: '7 hari terakhir' },
  { key: 'lebih_lama', label: 'Sebelumnya' },
];

function TopicIcon({ title }: { title: string }) {
  const text = title.toLocaleLowerCase('id-ID');
  if (text.includes('ikan') || text.includes('kolam')) return <Fish size={23} />;
  if (text.includes('ayam') || text.includes('kandang')) return <Wheat size={23} />;
  if (text.includes('daun') || text.includes('tanam') || text.includes('pupuk') || text.includes('cabai')) return <Leaf size={23} />;
  return <MessageCircle size={23} />;
}

export function RiwayatChatScreen({ conversations, activeConversationId, onBackToChat, onSelectConversation, onDeleteConversation, onNewChat }: RiwayatChatScreenProps) {
  const [query, setQuery] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<ChatConversation | null>(null);
  const filtered = useMemo(() => searchConversations(conversations, query), [conversations, query]);

  return (
    <div className="sc-screen sc-history">
      <header className="sc-header"><button type="button" className="sc-icon-button" onClick={onBackToChat} aria-label="Kembali ke Tanya Tani"><ArrowLeft size={23} /></button><div><h1>Riwayat konsultasi</h1><p>{conversations.length} percakapan di perangkat ini</p></div></header>
      <main className="sc-main">
        <button type="button" className="sc-button sc-button-primary sc-history-new" onClick={() => { playPop(); onNewChat(); }}><Plus size={20} />Mulai pertanyaan baru</button>
        <div className="sc-history-search"><label htmlFor="sc-history-search">Cari percakapan</label><div className="sc-input-wrap"><Search size={20} aria-hidden="true" /><input id="sc-history-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari tanaman atau topik" /></div>{query && <button type="button" className="sc-search-clear" onClick={() => setQuery('')}>Hapus pencarian<X size={15} /></button>}</div>

        {filtered.length === 0 ? <section className="sc-empty-state" aria-labelledby="sc-history-empty-title">
          <span className="sc-empty-icon" aria-hidden="true">{conversations.length ? <Search size={32} /> : <BookOpen size={32} />}</span>
          <h2 id="sc-history-empty-title">{conversations.length ? 'Percakapan belum ditemukan' : 'Belum ada percakapan'}</h2>
          <p>{conversations.length ? 'Coba cari dengan nama tanaman, hewan, atau kata lain.' : 'Jawaban dari Tanya Tani akan tersimpan di sini agar mudah dibaca lagi.'}</p>
          {conversations.length > 0 && <button type="button" className="sc-button sc-button-light" onClick={() => setQuery('')}>Lihat semua percakapan</button>}
        </section> : <div className="sc-history-sections">{sections.map(({ key, label }) => {
          const items = filtered.filter((conversation) => conversation.dateCategory === key);
          if (!items.length) return null;
          return <section className="sc-history-section" key={key} aria-labelledby={`sc-history-${key}`}><h2 id={`sc-history-${key}`}>{label}</h2><div className="sc-history-list">{items.map((conversation) => <article key={conversation.id} className={`sc-conversation ${conversation.id === activeConversationId ? 'is-selected' : ''}`}>
            <button type="button" className="sc-conversation-open" onClick={() => { playPop(); onSelectConversation(conversation); }} aria-label={`Buka percakapan ${conversation.title}`}>
              <span className="sc-conversation-icon" aria-hidden="true"><TopicIcon title={conversation.title} /></span>
              <span className="sc-conversation-copy"><strong>{conversation.title}</strong><span>{conversation.snippet}</span><small>{conversation.dateLabel}{conversation.timestamp ? ` · ${conversation.timestamp}` : ''}{conversation.id === activeConversationId && <><Check size={13} />Terakhir dibuka</>}</small></span><ChevronRight size={17} aria-hidden="true" />
            </button>
            <button type="button" className="sc-delete-conversation" onClick={() => setDeleteTarget(conversation)} aria-label={`Hapus percakapan ${conversation.title}`}><Trash2 size={18} /><span>Hapus</span></button>
          </article>)}</div></section>;
        })}</div>}
        <p className="sc-history-storage"><BookOpen size={16} aria-hidden="true" />Riwayat tersimpan di browser ini, belum tersinkron ke perangkat lain.</p>
      </main>

      {deleteTarget && <Dialog onClose={() => setDeleteTarget(null)} labelledBy="sc-delete-conversation-title" className="sc-dialog"><div className="sc-dialog-heading"><h2 id="sc-delete-conversation-title">Hapus percakapan?</h2><button type="button" className="sc-icon-button" onClick={() => setDeleteTarget(null)} aria-label="Tutup konfirmasi hapus"><X size={21} /></button></div><p>“{deleteTarget.title}” akan dihapus dari riwayat pada browser ini.</p><div className="sc-dialog-actions"><button type="button" className="sc-button sc-button-light" onClick={() => setDeleteTarget(null)}>Batal</button><button type="button" className="sc-button sc-button-danger" onClick={() => { onDeleteConversation(deleteTarget.id); setDeleteTarget(null); }}>Ya, hapus</button></div></Dialog>}
    </div>
  );
}
