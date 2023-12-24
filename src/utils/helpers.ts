import { WineData } from "../mock/modal";

// Function to calculate mean
const calculateMean = (data: (number)[]): number => {
  const sum = data.reduce((acc, value) => Number(acc) + Number(value), 0);
  return sum / data.length;
};

// Function to calculate median
const calculateMedian = (data: (number | string)[]): number => {
  const sortedData = [...data].sort((a, b) => Number(a) - Number(b));
  const middle = Math.floor(sortedData.length / 2);

  if (sortedData.length % 2 === 0) {
    return (Number(sortedData[middle - 1]) + Number(sortedData[middle])) / 2;
  } else {
    return Number(sortedData[middle]);
  }
};

// Function to calculate mode
const calculateMode = (data: (string | number)[]): string | number => {
  const frequencyMap: Record<string | number, number> = {};
  data.forEach((value) => {
    frequencyMap[value.toString()] = (frequencyMap[value.toString()] || 0) + 1;
  });

  let mode: string | number = 0;
  let maxFrequency = 0;

  Object.entries(frequencyMap).forEach(([key, value]) => {
    if (value > maxFrequency) {
      mode = key;
      maxFrequency = value;
    }
  });

  return mode;
};

// Function to calculate class-wise statistics for a given property
const calculateClassWiseStatistics = (
  dataset: WineData[],
  property: string,
  propertyValues: (string | number)[] | null = null
): Record<string, { mean: number; median: number; mode: string | number }> => {
  const classWiseData: Record<string, (string | number)[]> = {};

  dataset.forEach((item, index) => {
    const className = item.Alcohol.toString();
    const value = propertyValues ? propertyValues[index] : (item[property as keyof WineData] as string | number); // Type assertion
    classWiseData[className] = classWiseData[className] || [];
    classWiseData[className].push(value);
  });

  const statistics: Record<string, { mean: number; median: number; mode: string | number }> = {};

  Object.entries(classWiseData).forEach(([className, values]) => {
    const mean = calculateMean(values.map(Number));
    const median = calculateMedian(values.map(Number));
    const mode = calculateMode(values.map(Number));

    statistics[className] = { mean, median, mode };
  });

  return statistics;
};

// Function to calculate "Gamma" property and its class-wise statistics
const calculateGammaStatistics = (dataset: WineData[]): Record<string, { mean: number; median: number; mode: number | string }> => {
  const gammaValues = dataset.map((item) => {
    const gamma = (parseFloat(item.Ash.toString()) * parseFloat(item.Hue.toString())) / parseFloat(item.Magnesium.toString());
    return gamma;
  });

  const statistics = calculateClassWiseStatistics(dataset, 'Gamma', gammaValues);

  return statistics;
};

export { calculateClassWiseStatistics, calculateGammaStatistics };
