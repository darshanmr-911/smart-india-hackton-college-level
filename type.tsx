import React from 'react';
import { Shield, ChevronUp, ChevronDown, Minus } from 'lucide-react';

const Leaderboard = ({ players, currentUserId }) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-md border p-4 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-3 mb-4">
        <div className="flex items-center space-x-2">
          <Shield className="w-8 h-8 text-yellow-500 fill-yellow-400" />
          <div>
            <h2 className="font-bold text-lg text-gray-800">Gold League</h2>
            <p className="text-xs text-gray-500">Top 5 advance to Sapphire League</p>
          </div>
        </div>
        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
          2d 14h left
        </span>
      </div>

      {/* Leaderboard List */}
      <div className="space-y-2">
        {players.map((player, index) => {
          const rank = index + 1;
          const isPromoting = rank <= 5;
          const isDemoting = rank > 25;
          const isCurrentUser = player.id === currentUserId;

          return (
            <div
              key={player.id}
              className={`flex items-center justify-between p-3 rounded-xl transition ${
                isCurrentUser ? 'bg-indigo-50 border-2 border-indigo-500' : 'hover:bg-gray-50'
              } ${isPromoting ? 'border-l-4 border-l-emerald-500' : ''} ${
                isDemoting ? 'border-l-4 border-l-red-500' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="w-6 text-center font-bold text-sm text-gray-500">{rank}</span>
                <img
                  src={player.avatar || '/api/placeholder/40/40'}
                  alt={player.name}
                  className="w-10 h-10 rounded-full border"
                />
                <div>
                  <p className="font-bold text-sm text-gray-800">{player.name}</p>
                  <p className="text-xs text-gray-500">{player.xp} XP</p>
                </div>
              </div>

              {/* Status Indicator Zone */}
              <div>
                {isPromoting && <ChevronUp className="w-5 h-5 text-emerald-500" />}
                {isDemoting && <ChevronDown className="w-5 h-5 text-red-500" />}
                {!isPromoting && !isDemoting && <Minus className="w-4 h-4 text-gray-300" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Leaderboard;