import React from "react";
import { RoomCounter } from "./RoomCounter";

interface RoomSelectionProps {
    register: any;
    setValue: any;
    watch: any;
}

export const RoomSelection = ({ register, setValue, watch }: RoomSelectionProps) => {
    const singleRooms = watch('singleRooms') || 0;
    const doubleRooms = watch('doubleRooms') || 0;
    const twinRooms = watch('twinRooms') || 0;

    const totalRooms = singleRooms + doubleRooms + twinRooms;

    return (
        <div>
            <RoomCounter
                title="Single Occupancy"
                subtitle="1 adult"
                value={singleRooms}
                onChange={(value) => setValue('singleRooms', value)}
            />

            <RoomCounter
                title="Double Occupancy"
                subtitle="2 adults"
                value={doubleRooms}
                onChange={(value) => setValue('doubleRooms', value)}
            />

            <RoomCounter
                title="Twin"
                subtitle="2 adults"
                value={twinRooms}
                onChange={(value) => setValue('twinRooms', value)}
            />

            <div className="flex justify-between items-center mt-6 pt-4 border-t">
                <span className="text-xl font-semibold">Total:</span>
                <span className="text-xl">{totalRooms} rooms</span>
            </div>
        </div>
    );
};