import React, { useState, useEffect } from "react";
import { fetchClimbById, fetchClimbs } from "~/lib/climbService";
interface Climb {
  id: number;
  name: string;
  description: string;
  grade: string;
  hold_ids: string[];
}

interface searchProps {
  setClimb: React.Dispatch<React.SetStateAction<Climb | null>>;
  climb: Climb | null;
}

export const Search: React.FC<searchProps> = ({ climb, setClimb }) => {
  const [climbs, setClimbs] = useState<Climb[] | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    async function getClimbs() {
      try {
        const data = await fetchClimbs();
        setClimbs(data);
      } catch (error) {
        console.error("Error fetching climb:", error);
      }
    }
    getClimbs();
  }, []);

  const handleRowClick = async (climb: Climb) => {
    const data = await fetchClimbById(climb.id);
    setClimb(data);
    console.log("climb from search:", JSON.stringify(data));
  };

  return (
    <div className="h-full">
      <input
        className="flex flex-row w-full mt-3"
        type="text"
        placeholder="Search climbs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className="flex flex-col pt-6 h-[85%]  ">
        <thead>
          <tr className="flex flex-row justify-between px-2">
            <th>Name</th>
            <th>Grade</th>
          </tr>
        </thead>

        <tbody className="scrollBar ">
          {climbs
            ?.filter((c) =>
              c.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((c) => (
              <tr
                key={c.id}
                className={`flex flex-row justify-between text-lg cursor-pointer p-2 rounded-md ${
                  climb?.id === c.id ? "bg-gray-200" : "hover:bg-gray-100"
                }`}
                role="row"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && handleRowClick(c)}
                onClick={() => handleRowClick(c)}
              >
                <td>{c.name}</td>
                <td>{c.grade}</td>
              </tr>
            )) ?? (
            <tr>
              <td colSpan={2}>No climbs available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
