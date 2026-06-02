import { useState, useEffect } from "react";
import { motion } from "motion/react";

const DeveloperActivity = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredCell, setHoveredCell] = useState(null);

  useEffect(() => {
    // For local dev, we might mock this if the API is not available,
    // but we expect Vercel to serve /api/activity.
    // In Vite dev, we can fallback to the test script if needed,
    // but assuming Vercel or proxy is configured.
    const fetchData = async () => {
      try {
        const response = await fetch("/api/activity");
        if (!response.ok) {
          throw new Error("Failed to fetch activity data");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getIntensityColor = (total) => {
    if (total === 0) return "bg-white/10 border border-white/5";
    if (total <= 2) return "bg-[#7a57db]/40 border border-[#7a57db]/30";
    if (total <= 5) return "bg-[#7a57db]/80 border border-[#7a57db]/50";
    if (total <= 8) return "bg-[#a688f5] border border-[#a688f5]";
    return "bg-[#c3adff] border border-[#c3adff] shadow-[0_0_10px_rgba(195,173,255,0.8)]";
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <section className="c-space section-spacing" id="activity">
      <div className="flex flex-col items-center justify-center mb-12 text-center">
        <h2 className="text-heading">Developer Activity</h2>
        <p className="mt-4 subtext max-w-2xl">
          A visual record of my coding journey across projects and problem solving.
        </p>
      </div>

      <div className="flex flex-col items-center max-w-5xl mx-auto">
        <div className="w-full p-6 border shadow-lg bg-gradient-to-b from-storm to-indigo rounded-2xl border-white/10">
          
          {/* Stats Bar */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8 md:justify-around">
            <div className="flex flex-col items-center">
              <span className="text-sm font-medium text-neutral-400">🔥 Current Streak</span>
              <span className="text-2xl font-bold text-white">
                {loading ? "-" : data?.stats?.currentStreak || 0} Days
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-sm font-medium text-neutral-400">📅 Active Days This Year</span>
              <span className="text-2xl font-bold text-white">
                {loading ? "-" : data?.stats?.activeDaysThisYear || 0}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-sm font-medium text-neutral-400">⚡ Total Contributions</span>
              <span className="text-2xl font-bold text-white">
                {loading ? "-" : data?.stats?.totalContributions || 0}
              </span>
            </div>
          </div>

          {/* Heatmap Area */}
          <div className="relative w-full overflow-x-auto custom-scrollbar pb-0">
            {loading ? (
              <div className="flex items-center justify-center w-full h-[150px]">
                <div className="w-8 h-8 rounded-full border-2 border-lavender border-t-transparent animate-spin"></div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center w-full h-[150px] text-red-400">
                Failed to load activity graph.
              </div>
            ) : (
              <div className="min-w-max flex justify-center relative mx-auto pt-2">
                {/* Month labels would typically go here, simplifying for now */}
                <div className="grid grid-rows-7 gap-2 grid-flow-col w-fit h-fit pb-2">
                  {data?.contributions?.map((day, idx) => (
                    <motion.div
                      key={day.date}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.001, duration: 0.2 }}
                      className={`w-4 h-4 rounded-[4px] transition-transform duration-200 hover:scale-125 hover:z-10 cursor-pointer ${getIntensityColor(
                        day.total
                      )}`}
                      onMouseEnter={() => setHoveredCell(day)}
                      onMouseLeave={() => setHoveredCell(null)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Premium Tooltip */}
          <div className="flex items-center justify-center h-8 mt-2 mb-2">
            {hoveredCell ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-4 px-6 py-2 text-sm border rounded-full bg-midnight/50 border-white/5 backdrop-blur-md"
              >
                <span className="font-medium text-white">{formatDate(hoveredCell.date)}</span>
                <div className="w-px h-4 bg-white/20"></div>
                <span className="text-neutral-300">
                  GitHub: <strong className="text-white">{hoveredCell.gh}</strong>
                </span>
                <span className="text-neutral-300">
                  LeetCode: <strong className="text-white">{hoveredCell.lc}</strong>
                </span>
                <div className="w-px h-4 bg-white/20"></div>
                <span className="text-lavender">
                  Total: <strong className="font-bold text-white">{hoveredCell.total}</strong>
                </span>
              </motion.div>
            ) : (
              <div className="text-sm text-neutral-500">
                Hover over a cell to see activity details
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default DeveloperActivity;
