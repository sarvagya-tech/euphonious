import React from 'react';

const MembersList = () => {
  
  const members = [
    { name: "Sarah Volkov", status: "online", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0ScQOyv7Lq_ddCAsIHufT1_vz7AQ2qLJwbEGUETsohSD_kOXDa_q4qsKqo1C7gWmVQNFe7PH5tfLXOKgCxpGIgkWBkRW_NVPhwOomsKFXY9792dbklNTQU88TTRm_7JBaOSr-J1sJtBVKulyQTy94-G3lxzIAy7Rx1oIo8DnK8C1UT8RzkRzW5jg22T8QsaCSi_wqJ8Vm6U6C8sjsTMBMx0fc09x0tABQU0y7sMTtNywn5yAAvU9QMthlRcWh8jBTU7QyfDM0hKnJ" },
    { name: "Mike Shinoda", status: "offline", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-15v9UG-wF2-VDYKYWl1DbQl6CX_Lp4mu5sK2cT_iHi17wvhGBdU7holCySAxitgn819SpMwgDmtyLhF8UbtIAjVichgcfsoMZ5_-Uwr9sjQPdABxsYYpnE4pa3juDHMJeLPs6BIRsihBClnzLP_pYhLfFql3Jk3cTPkw3dD4ULJYmxm-3Y65QEjj2QBTtQlgHOFDpT9fU2aOvCI1fUADLgMJd_VyNqN_iVg-uPApLUGUfGWWqdI8h4k6eu0CLhrlj4jFnNzgGozb" },
    { name: "Alex Rivers", status: "online", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBE8AgiWE3ikqL_E1WG92p4ZeciDEBy29XtmA_N6QeKQSMr_XpuktiSGzYDHYS1cs6cCbbz1JNOSFhgY4G0poMkUKnTiT-1QCN543aiUOoGpMLAEUupGfDkoZnVw9Nyj0_fW0z3zHwR4zTvR0Tw9kyzAn8bgZtsdvZ0oUZEokpGUwGWRXlIykwo2Yy-VIlXKO0YVJh6ZLNqMX-UK7VRLFYeMsNMLgXyTpuUFONP9qCYTRuYhl_l4OC9m-6mpV5My437PRQxM5WGDicE" }
  ];

  return (
    <div className="w-80 bg-bg-secondary border border-border-primary rounded-lg overflow-hidden flex flex-col shadow-premium">
      <div className="px-6 py-4 border-b border-border-primary">
        <h3 className="text-[11px] font-bold uppercase tracking-widest text-text-muted flex items-center gap-2">
          <span className="material-symbols-rounded text-sm">groups</span> Listeners (24)
        </h3>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
        {members.map((m, i) => (
          <div key={i} className="flex items-center gap-3 p-2 rounded-md hover:bg-white/[0.03] transition-all cursor-pointer group">
            <div className="relative">
              <img src={m.img} className="w-9 h-9 rounded-full object-cover border border-border-primary group-hover:border-accent/40 transition-all" alt="" />
              <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-bg-secondary ${
                m.status === 'online' ? 'bg-accent shadow-accent-glow' : 'bg-text-muted'
              }`}></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-bold text-text-primary truncate">{m.name}</p>
              <p className={`text-[10px] font-medium uppercase tracking-wider ${
                m.status === 'online' ? 'text-accent/60' : 'text-text-muted'
              }`}>{m.status}</p>
            </div>
            <span className="material-symbols-rounded text-lg text-text-muted opacity-0 group-hover:opacity-100 transition-all">more_vert</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembersList;
