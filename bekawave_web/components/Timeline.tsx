"use client";
import React from "react";

interface TimelineProps {
  time: string;
  description: string;
  type: string;
}

const Timeline: React.FC = () => {
    const timeline_content: TimelineProps[] = [
        /*{ time: '2024-07-22 09:00', description: 'Meeting with team', type: 'activity' },
        { time: '2024-07-22 10:00', description: 'Product launch', type: 'sale' },
        { time: '2024-07-22 11:00', description: 'Client call', type: 'activity' },
        { time: '2024-07-22 12:00', description: 'Lunch break', type: 'activity' },
        { time: '2024-07-22 13:00', description: 'Review meeting', type: 'activity' },
        { time: '2024-07-22 14:00', description: 'Code review', type: 'activity' },
        { time: '2024-07-22 15:00', description: 'Sale discussion', type: 'sale' },
        { time: '2024-07-22 16:00', description: 'Team feedback', type: 'activity' },
        { time: '2024-07-22 17:00', description: 'End of day summary', type: 'activity' },
        { time: '2024-07-23 09:00', description: 'Daily standup', type: 'activity' },
        { time: '2024-07-23 10:00', description: 'Client demo', type: 'sale' },
        { time: '2024-07-23 11:00', description: 'Product meeting', type: 'activity' },
        { time: '2024-07-23 12:00', description: 'Lunch with client', type: 'activity' },
        { time: '2024-07-23 13:00', description: 'Sales strategy', type: 'sale' },
        { time: '2024-07-23 14:00', description: 'Development planning', type: 'activity' },
        { time: '2024-07-23 15:00', description: 'Marketing review', type: 'activity' },
        { time: '2024-07-23 16:00', description: 'Team brainstorming', type: 'activity' },
        { time: '2024-07-23 17:00', description: 'Wrap-up meeting', type: 'activity' },
        { time: '2024-07-24 09:00', description: 'Project kickoff', type: 'activity' },
        { time: '2024-07-24 10:00', description: 'Sales pitch', type: 'sale' },*/
    ];

  return (
        <div className="h-full w-full rounded-md flex flex-col py-2 bg-white">
            <div className="py-2 w-full px-6 flex items-center justify-between">
                <span className="text-lg font-semibold">Notifications</span>
                <button className="py-0.5 px-3 hover:bg-red-100 rounded-md">
                    <span className="text-red-600 text-sm font-medium">Clear</span>
                </button>
            </div>
            <div
                style={{scrollbarColor:'#b1afaf', scrollbarWidth:'thin'}}
                className="flex-grow overflow-y-auto px-2">
                {timeline_content.length > 0 ? (
                    timeline_content.map((item, index) => (
                        <div key={index}
                             className="flex items-start py-2">
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold">{item.description}</span>
                                <span className="text-xs text-gray-500">{item.time}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex-grow flex items-center justify-center bg-slate-100 rounded-md h-full w-full">
                        <span className="text-sm text-slate-500">No notifications</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Timeline;
