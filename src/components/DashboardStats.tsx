interface DashboardStatsProps {
  stats: {
    totalRooms: number;
    icuCount: number;
    activeCount: number;
    avgLOS: string;
  };
  loading: boolean;
}

export function DashboardStats({ stats, loading }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-gutter">
      <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-inset-stretch">
        <div className="flex items-center justify-between mb-2">
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">
            Total Ruangan
          </span>
          <span className="material-symbols-outlined text-[16px] text-outline">
            meeting_room
          </span>
        </div>
        <div className="font-h1 text-h1 text-on-surface">
          {loading ? "..." : stats.totalRooms}
        </div>
      </div>
      <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-inset-stretch">
        <div className="flex items-center justify-between mb-2">
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">
            ICU
          </span>
          <span className="material-symbols-outlined text-[16px] text-outline">
            monitor_heart
          </span>
        </div>
        <div className="font-h1 text-h1 text-on-surface">
          {loading ? "..." : stats.icuCount}
        </div>
      </div>
      <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-inset-stretch">
        <div className="flex items-center justify-between mb-2">
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">
            Pasien Aktif
          </span>
          <span className="material-symbols-outlined text-[16px] text-primary">
            personal_injury
          </span>
        </div>
        <div className="font-h1 text-h1 text-primary">
          {loading ? "..." : stats.activeCount}
        </div>
      </div>
      <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-inset-stretch">
        <div className="flex items-center justify-between mb-2">
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">
            Rata-rata LOS
          </span>
          <span className="material-symbols-outlined text-[16px] text-outline">
            schedule
          </span>
        </div>
        <div className="font-h1 text-h1 text-on-surface">
          {loading ? "..." : stats.avgLOS}{" "}
          <span className="text-body-sm font-normal text-secondary">hari</span>
        </div>
      </div>
    </div>
  );
}
