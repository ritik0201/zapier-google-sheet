import * as Papa from 'papaparse';

const GOOGLE_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/186KORDVuqOW_x6txorTajV2d8dGrKS6dmDCSJg_b_ME/export?format=csv';

interface Product {
  Title: string;
  Inventory: string;
  Price: string;
  Description: string;
}

export default async function Home() {
  const res = await fetch(GOOGLE_SHEET_CSV_URL, { cache: 'no-store' });
  const csvText = await res.text();
  
  const { data } = Papa.parse<Product>(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-8 font-sans selection:bg-blue-500/30">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center space-y-4">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-2 text-sm font-medium tracking-wide text-blue-400 rounded-full bg-blue-500/10 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
            Live Sync
            <span className="relative flex h-2 w-2 ml-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400">
            Store Inventory
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Real-time data fetched directly from Google Sheets. Modern, fast, and always up to date.
          </p>
        </header>

        <div className="flex flex-col space-y-4">
          {data.map((item, idx) => (
            <div 
              key={idx}
              className="bg-gray-800/40 backdrop-blur-xl rounded-xl p-5 border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] group relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="absolute top-0 right-0 w-32 h-full bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-all duration-500 -mr-16"></div>
              
              <div className="relative z-10 flex-grow">
                <h2 className="text-xl font-bold text-gray-100 group-hover:text-indigo-400 transition-colors mb-1">
                  {item.Title}
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.Description}
                </p>
              </div>

              <div className="relative z-10 flex items-center space-x-6 md:space-x-8 min-w-max w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-gray-700/50 pt-4 md:pt-0">
                <div className="flex flex-col items-start md:items-end">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Stock</span>
                  <div className="flex items-center space-x-2">
                    <span className={`h-2 w-2 rounded-full ${Number(item.Inventory) > 100 ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
                    <span className={`font-mono font-bold ${Number(item.Inventory) > 100 ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {item.Inventory}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <span className="bg-indigo-500/10 text-indigo-400 px-4 py-1.5 rounded-full text-sm font-bold border border-indigo-500/20 tabular-nums">
                    ${item.Price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
