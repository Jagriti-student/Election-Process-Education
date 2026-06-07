import React, { useState, useEffect } from 'react';
import { voteStorage, CANDIDATES } from '../services/voteStorage';
import { VotePanel } from './VotePanel';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions
} from 'chart.js';
import { BarChart3, Users, Award, RotateCcw, Sparkles } from 'lucide-react';
import '../styles/components.css';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const LiveElectionDashboard: React.FC = () => {
  const [votes, setVotes] = useState<Record<string, number>>({});

  useEffect(() => {
    // Initial vote counts
    setVotes(voteStorage.getVotes());

    // Subscribe to real-time changes
    const unsubscribe = voteStorage.subscribe((newVotes) => {
      setVotes(newVotes);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const totalVotes = Object.values(votes).reduce((sum, count) => sum + count, 0);

  // Calculate stats for each candidate
  const candidateStats = CANDIDATES.map((candidate) => {
    const count = votes[candidate.id] || 0;
    const percentage = totalVotes > 0 ? ((count / totalVotes) * 100).toFixed(1) : '0.0';
    return {
      ...candidate,
      count,
      percentage: parseFloat(percentage)
    };
  });

  // Determine the leading candidate
  const leadingCandidate = [...candidateStats]
    .filter(c => c.id !== '4') // Exclude NOTA from the winner list
    .reduce((prev, current) => (prev.count > current.count ? prev : current), candidateStats[0]);

  // Chart configuration
  const chartData = {
    labels: candidateStats.map((c) => c.name),
    datasets: [
      {
        label: 'Votes Cast',
        data: candidateStats.map((c) => c.count),
        backgroundColor: candidateStats.map((c) => c.color),
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  };

  const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1E293B',
        titleColor: '#FFF',
        bodyColor: '#94A3B8',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#94A3B8',
          font: {
            family: 'Inter, sans-serif',
            size: 11,
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        ticks: {
          color: '#94A3B8',
          precision: 0,
          font: {
            family: 'Inter, sans-serif',
            size: 11,
          },
        },
      },
    },
  };

  const handleResetAllVotes = () => {
    if (window.confirm('Are you sure you want to reset all candidate votes to zero?')) {
      voteStorage.resetVotes();
    }
  };

  const handleLoadDemoVotes = () => {
    voteStorage.resetToDefaultVotes();
  };

  return (
    <div className="dashboard-view animate-in fade-in duration-500">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <BarChart3 size={32} className="text-indigo-400" />
            Live Election Dashboard
          </h1>
          <p className="text-slate-400">Real-time simulation results and educational voting analytics.</p>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" role="list" aria-label="Live Voting Summary">
        <div className="glass-panel p-6 flex items-center gap-4 group hover:border-white/20 transition-all" role="listitem" aria-label={`Total Votes: ${totalVotes}`}>
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400" aria-hidden="true">
            <Users size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Total Votes Cast</p>
            <p className="text-2xl font-bold">{totalVotes}</p>
          </div>
        </div>

        <div className="glass-panel p-6 flex items-center gap-4 group hover:border-white/20 transition-all" role="listitem" aria-label={`Leading Candidate: ${leadingCandidate.name}`}>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400" aria-hidden="true">
            <Award size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Current Leader</p>
            <p className="text-xl font-bold truncate max-w-[180px]">
              {leadingCandidate.count > 0 ? leadingCandidate.name : 'No Votes Yet'}
            </p>
          </div>
        </div>

        <div className="glass-panel p-6 flex items-center gap-4 group hover:border-white/20 transition-all" role="listitem" aria-label={`Leader Percentage: ${leadingCandidate.percentage}%`}>
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400" aria-hidden="true">
            <Sparkles size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Highest Share</p>
            <p className="text-2xl font-bold">
              {leadingCandidate.count > 0 ? `${leadingCandidate.percentage}%` : '0.0%'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Chart & Vote Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Columns - Chart & Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Chart Display */}
          <section className="glass-panel p-6" aria-label="Votes Visualization Chart">
            <h3 className="text-lg font-bold mb-4">Candidate Vote Tally</h3>
            <div className="h-[300px] relative w-full">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </section>

          {/* Detailed Progress Bars */}
          <section className="glass-panel p-6" aria-label="Detailed Vote Percentages">
            <h3 className="text-lg font-bold mb-4">Vote Breakdown & Distribution</h3>
            <div className="space-y-5">
              {candidateStats.map((candidate) => (
                <div key={candidate.id} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: candidate.color }}></span>
                      {candidate.name} ({candidate.party})
                    </span>
                    <span className="font-mono text-slate-300">
                      {candidate.count} votes ({candidate.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-800/80 h-2.5 rounded-full overflow-hidden border border-white/5">
                    <div 
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ 
                        width: `${candidate.percentage}%`, 
                        backgroundColor: candidate.color 
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column - Voting Panel & Controls */}
        <div className="space-y-6">
          <VotePanel />

          {/* Demo Settings Card (Hackathon Ready) */}
          <section className="glass-panel p-6 bg-slate-900/40 border-slate-800" aria-label="Dashboard Demo Tools">
            <h3 className="text-md font-bold mb-4 flex items-center gap-1.5 text-slate-300">
              <RotateCcw size={16} className="text-indigo-400" />
              Developer & Demo Controls
            </h3>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Use these tools to control votes in real-time. Ideal for demonstrating how the dashboard reacts instantly to updates.
            </p>
            <div className="grid grid-cols-1 gap-2.5">
              <button
                onClick={handleLoadDemoVotes}
                className="py-2.5 px-4 bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/30 border border-indigo-500/20 hover:border-indigo-500/40 rounded-lg text-xs font-bold transition-all text-center"
              >
                Reset to Default Mock Votes
              </button>
              <button
                onClick={handleResetAllVotes}
                className="py-2.5 px-4 bg-rose-600/10 text-rose-400 hover:bg-rose-600/20 border border-rose-500/10 hover:border-rose-500/30 rounded-lg text-xs font-bold transition-all text-center"
              >
                Clear All Votes (Set to Zero)
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
export default LiveElectionDashboard;
