interface GameRecord {
  rows: number;
  columns: number;
  bombs: number;
  time: number;
  timestamp: number;
}

const STORAGE_KEY = 'sapper_records';

export const getRecords = (): GameRecord[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveRecord = (record: Omit<GameRecord, 'timestamp'>): void => {
  const records = getRecords();
  const existingIndex = records.findIndex(
    r => r.rows === record.rows &&
      r.columns === record.columns &&
      r.bombs === record.bombs
  );

  const newRecord = {
    ...record,
    timestamp: Date.now()
  };

  if (existingIndex >= 0) {

    if (record.time < records[existingIndex].time) {
      records[existingIndex] = newRecord;
    }
  } else {
    records.push(newRecord);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
};

export const getBestTime = (rows: number, columns: number, bombs: number): number | null => {
  const records = getRecords();
  const record = records.find(
    r => r.rows === rows &&
      r.columns === columns &&
      r.bombs === bombs
  );
  return record?.time ?? null;
};
