import useRoomStore from '../../store/roomStore.js';

const MembersList = () => {
  const { members } = useRoomStore();

  return (
    <div className="bg-bg-secondary border border-border-primary rounded-lg overflow-hidden flex flex-col shadow-premium">
      <div className="px-6 py-4 border-b border-border-primary flex items-center justify-between">
        <h3 className="text-[11px] font-bold uppercase tracking-widest text-text-muted flex items-center gap-2">
          <span className="material-symbols-rounded text-sm">groups</span> Listeners
        </h3>
        <span className="text-[10px] mono-text text-accent bg-accent/10 px-2 py-1 rounded">
          {members.length}
        </span>
      </div>

      <div className="max-h-64 overflow-y-auto p-4 space-y-2 custom-scrollbar">
        {members.length === 0 && (
          <p className="text-[12px] text-text-muted">No listeners yet.</p>
        )}

        {members.map((member) => (
          <div key={member._id} className="flex items-center gap-3 p-2 rounded-md hover:bg-white/[0.03] transition-all group">
            {member.avatar ? (
              <img
                src={member.avatar}
                className="w-9 h-9 rounded-full object-cover border border-border-primary group-hover:border-accent/40 transition-all"
                alt={member.fullname || 'listener avatar'}
              />
            ) : (
              <div className="w-9 h-9 rounded-full border border-border-primary bg-bg-card flex items-center justify-center text-[11px] font-bold text-text-primary">
                {(member.fullname || '?').charAt(0).toUpperCase()}
              </div>
            )}

            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-bold text-text-primary truncate">{member.fullname || 'Unknown User'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembersList;
