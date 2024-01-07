const randInt = (n: number) => {
  // 0-n
  return Math.floor(Math.random() * n);
};

const createRandomDateRange = () => {
  const startDate = new Date(`202${randInt(5)}-01-01`);

  // 1-30days
  const randomDays = Math.floor(Math.random() * 30) + 1;

  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + randomDays);

  const formattedStartDate = startDate.toISOString().split("T")[0];
  const formattedEndDate = endDate.toISOString().split("T")[0];

  return { startDate: formattedStartDate, endDate: formattedEndDate };
};

const artNames = [
  "Starry Night",
  "Mona Lisa",
  "The Persistence of Memory",
  "Guernica",
  "The Scream",
  "The Birth of Venus",
  "Girl with a Pearl Earring",
  "Water Lilies",
  "American Gothic",
  "The Last Supper",
  "Sunflowers",
  "The Kiss",
  "Nighthawks",
  "Les Demoiselles d'Avignon",
  "The Great Wave off Kanagawa",
  "The Thinker",
  "Self-Portrait with Cropped Hair",
  "Whistler's Mother",
  "Birth of Venus",
  "The Raft of the Medusa",
];

interface DataType {
  _id: number;
  key: string;
  artName: string;
  category: string;
  startDate: string;
  endDate: string;
  status: boolean;
}

const data: DataType[] = [];

for (let i = 0; i < 20; i++) {
  const { startDate, endDate } = createRandomDateRange();
  const art = {
    _id: i,
    key: String(i),
    artName: artNames[i],
    category: ["Painting", "Literature", "Media"][randInt(3)],
    startDate: startDate,
    endDate: endDate,
    status: Math.random() < 0.7,
  };
  data.push(art);
}

export default data;
