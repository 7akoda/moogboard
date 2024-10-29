
const basePath = "../holds/";


const holdArray = Array.from({ length: 18 }, (_, rowIndex) => {
  const rowNumber = rowIndex + 1;
  return Array.from({ length: 11 }, (_, holdIndex) => {
    const holdLetter = String.fromCharCode(97 + holdIndex); // 'a' to 'k'
    return `${basePath}row-${rowNumber}/hold-${holdLetter}-${rowNumber}.svg`;
  });
});

export default holdArray