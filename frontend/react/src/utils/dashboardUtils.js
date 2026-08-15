export const isSameDay = (value, day = new Date()) => {
  const compareDate = new Date(value);
  return compareDate instanceof Date && !Number.isNaN(compareDate)
    ? compareDate.getFullYear() === day.getFullYear() &&
        compareDate.getMonth() === day.getMonth() &&
        compareDate.getDate() === day.getDate()
    : false;
};

export const getTodayTopEntries = (items = [], type = 'expense', limit = 3) => {
  const filtered = (items || []).filter((item) => {
    const isToday = isSameDay(item.date || item.createdAt);
    return isToday && (item.type ? item.type === type : type === 'expense' ? true : true);
  });

  const normalized = filtered
    .map((item) => ({
      ...item,
      amount: Number(item.amount || 0),
      label: item.category || item.source || item.description || 'General',
    }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, limit);

  return normalized;
};

export const getTodaySummary = (items = [], type = 'expense') => {
  const todayItems = getTodayTopEntries(items, type, 10);
  const total = todayItems.reduce((sum, item) => sum + Number(item.amount || 0), 0);

  if (!todayItems.length) {
    return {
      total: 0,
      items: [],
      label: 'No data available for today',
    };
  }

  return {
    total,
    items: todayItems,
    label: `${todayItems.length} activity${todayItems.length > 1 ? 'ies' : 'y'} today`,
  };
};
