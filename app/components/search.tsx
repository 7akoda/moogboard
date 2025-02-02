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
    console.log("climbid from: search " + climb.id);
  };

  return (
    <div className="">
      <input
        type="text"
        placeholder="Search climbs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="flex flex-col pt-6">
        <thead>
          <tr className="flex flex-row justify-between">
            <th>Name</th>
            <th>Grade</th>
          </tr>
        </thead>

        <tbody>
          {climbs
            ?.filter((climb) =>
              climb.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((climb) => (
              <tr
                className="flex flex-row justify-between"
                key={climb.id}
                role="row"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && handleRowClick(climb)}
                onClick={() => handleRowClick(climb)}
                style={{ cursor: "pointer" }}
              >
                <td>{climb.name}</td>
                <td>{climb.grade}</td>
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
