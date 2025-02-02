import React, { useState, useEffect } from "react";
import { fetchClimbById, fetchClimbs } from "~/lib/climbService";
interface Climbs {
  id: number;
  name: string;
  description: string;
  grade: string;
  hold_ids: string[];
}
export const Search = () => {
  const [climbs, setClimbs] = useState<Climbs[] | null>(null);
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
              <tr className="flex flex-row justify-between" key={climb.id}>
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
