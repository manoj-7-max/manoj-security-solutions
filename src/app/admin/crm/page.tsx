"use client";

import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Plus, MoreVertical, Search, FileText } from "lucide-react";

export default function CRMLayout() {
    const initialColumns = {
        new: { name: "New Lead", items: [] as any[] },
        site_visit: { name: "Site Visit Scheduled", items: [] as any[] },
        quote: { name: "Quote Sent", items: [] as any[] },
        won: { name: "Won / Closed", items: [] as any[] },
        lost: { name: "Lost", items: [] as any[] }
    };

    const [columns, setColumns] = useState(initialColumns);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeads = async () => {
            try {
                const res = await fetch("/api/leads");
                const data = await res.json();

                const cols = {
                    new: { ...initialColumns.new, items: [] as any[] },
                    site_visit: { ...initialColumns.site_visit, items: [] as any[] },
                    quote: { ...initialColumns.quote, items: [] as any[] },
                    won: { ...initialColumns.won, items: [] as any[] },
                    lost: { ...initialColumns.lost, items: [] as any[] }
                };

                data.leads.forEach((lead: any) => {
                    const status = lead.status as keyof typeof cols;
                    if (cols[status]) {
                        cols[status].items.push({
                            id: lead._id,
                            name: lead.name,
                            req: lead.requirement,
                            phone: lead.phone
                        });
                    }
                });

                setColumns(cols);
            } catch (error) {
                console.error("Failed to fetch leads", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLeads();
    }, []);

    const onDragEnd = async (result: any) => {
        if (!result.destination) return;
        const { source, destination, draggableId } = result;

        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId as keyof typeof columns];
            const destColumn = columns[destination.droppableId as keyof typeof columns];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);

            setColumns({
                ...columns,
                [source.droppableId]: { ...sourceColumn, items: sourceItems },
                [destination.droppableId]: { ...destColumn, items: destItems }
            });

            // Update Database
            try {
                await fetch(`/api/leads/${draggableId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ status: destination.droppableId }),
                });
            } catch (e) { console.error("Update failed", e); }

        } else {
            const column = columns[source.droppableId as keyof typeof columns];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);

            setColumns({
                ...columns,
                [source.droppableId]: { ...column, items: copiedItems }
            });
        }
    };

    return (
        <div className="flex flex-col h-full bg-[#050505]">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-display font-medium">Sales Pipeline</h2>
                <div className="flex gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input type="text" placeholder="Search leads..." className="pl-10 pr-4 py-2 bg-[#111] border border-white/10 rounded-xl focus:border-[#d4af37]/50 focus:outline-none text-white text-sm" />
                    </div>
                    <button className="bg-[#d4af37] text-black font-bold px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-yellow-500 transition-colors shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                        <Plus className="w-5 h-5" /> New Lead
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-x-auto pb-4">
                {loading ? (
                    <div className="flex items-center justify-center h-40 text-zinc-500 font-mono tracking-widest text-sm uppercase">Loading Pipeline...</div>
                ) : (
                    <DragDropContext onDragEnd={onDragEnd}>
                        <div className="flex gap-6 min-w-full h-full">
                            {Object.entries(columns).map(([columnId, column]) => (
                                <div key={columnId} className="flex flex-col w-[320px] shrink-0 bg-[#0a0a0a] border border-white/5 rounded-2xl">
                                    <div className="p-4 border-b border-white/5 flex justify-between items-center bg-[#111] rounded-t-2xl">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-sm tracking-wider uppercase text-zinc-300">{column.name}</h3>
                                            <span className="bg-[#d4af37]/20 text-[#d4af37] text-xs px-2 py-0.5 rounded-full font-bold">{column.items.length}</span>
                                        </div>
                                        <MoreVertical className="w-4 h-4 text-zinc-500 cursor-pointer" />
                                    </div>

                                    <Droppable droppableId={columnId}>
                                        {(provided, snapshot) => (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                className={`flex-1 p-4 flex flex-col gap-3 min-h-[150px] transition-colors ${snapshot.isDraggingOver ? 'bg-white/5' : 'bg-transparent'}`}
                                            >
                                                {column.items.map((item, index) => (
                                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                                        {(provided, snapshot) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                className={`p-4 rounded-xl border ${snapshot.isDragging ? 'bg-[#222] border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.2)] z-50' : 'bg-[#151515] border-white/10'} hover:border-white/20 transition-colors cursor-grab`}
                                                            >
                                                                <div className="flex justify-between items-start mb-2">
                                                                    <h4 className="font-medium text-white text-sm">{item.name}</h4>
                                                                    <div className="text-[10px] text-zinc-500 px-2 py-0.5 rounded bg-white/5 border border-white/10">B2B</div>
                                                                </div>
                                                                <p className="text-zinc-500 text-xs mb-4">{item.req}</p>

                                                                <div className="flex justify-between items-center border-t border-white/5 pt-3 mt-auto">
                                                                    <p className="text-xs text-[#d4af37] font-mono tracking-wider">{item.phone}</p>
                                                                    <button className="text-zinc-600 hover:text-white transition-colors">
                                                                        <FileText className="w-4 h-4" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </div>
                            ))}
                        </div>
                    </DragDropContext>
                )}
            </div>
        </div>
    );
}
