import { isNumber, isString, toNumber } from '@/js/util/misc';

function toDate(input) {
  if (input === null) {
    return new Date();
  }

  if (input instanceof Date) {
    return new Date(input.valueOf());
  }

  if (isNumber(input)) {
    return new Date(input);
  }

  if (isString(input)) {
    const timestamp = Date.parse(input);
    if (Number.isNaN(timestamp)) {
      return null;
    }
    return new Date(timestamp);
  }

  return null;
}

function toTimestamp(input) {
  const date = toDate(input);
  return date ? date.getTime() : null;
}

function formatDate(input, format = 'DD.MM.YYYY') {
  const date = toDate(input);
  if (!date) {
    return null;
  }

  const map = {
    DD: String(date.getDate()).padStart(2, '0'),
    MM: String(date.getMonth() + 1).padStart(2, '0'),
    YYYY: date.getFullYear(),
    HH: String(date.getHours()).padStart(2, '0'),
    mm: String(date.getMinutes()).padStart(2, '0'),
    ss: String(date.getSeconds()).padStart(2, '0'),
  };

  const tokens = Object.keys(map).join('|');
  return format.replace(new RegExp(tokens, 'g'), (t) => map[t]);
}

function formatISODate(input) {
  const date = toDate(input);
  if (!date) {
    return null;
  }

  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');

  return `${y}-${m}-${d}`;
}

function isDatesEqual(a, b) {
  const d1 = toDate(a);
  const d2 = toDate(b);
  if (!d1 || !d2) {
    return false;
  }

  return (
    d1.getFullYear() === d2.getFullYear()
    && d1.getMonth() === d2.getMonth()
    && d1.getDate() === d2.getDate()
  );
}

function isToday(input) {
  return isDatesEqual(input, new Date());
}

function isPast(input) {
  const date = toDate(input);

  if (!date) {
    return null;
  }

  return date.getTime() < Date.now();
}

function isFuture(input) {
  const date = toDate(input);

  if (!date) {
    return null;
  }

  return date.getTime() > Date.now();
}

function getRelativeDateLabel(input, format = 'DD.MM.YYYY') {
  const date = toDate(input);
  if (!date) {
    return null;
  }

  const now = new Date();

  const today = isDatesEqual(date, now);

  const yesterdayDate = new Date(now);
  yesterdayDate.setDate(now.getDate() - 1);

  const yesterday = isDatesEqual(date, yesterdayDate);

  if (today) {
    return {
      label: 'today',
      value: formatDate(date, 'HH:mm'),
    };
  }

  if (yesterday) {
    return {
      label: 'yesterday',
      value: formatDate(date, 'HH:mm'),
    };
  }

  return {
    label: 'date',
    value: formatDate(date, format),
  };
}

function getTimeRemaining(input) {
  const target = toDate(input);
  if (!target) {
    return null;
  }

  const now = new Date();

  if (target <= now) {
    return { label: 'expired', value: 0 };
  }

  let years = target.getFullYear() - now.getFullYear();
  let months = target.getMonth() - now.getMonth();
  let days = target.getDate() - now.getDate();
  let hours = target.getHours() - now.getHours();
  let minutes = target.getMinutes() - now.getMinutes();
  let seconds = target.getSeconds() - now.getSeconds();

  if (seconds < 0) {
    seconds += 60;
    minutes -= 1;
  }

  if (minutes < 0) {
    minutes += 60;
    hours -= 1;
  }

  if (hours < 0) {
    hours += 24;
    days -= 1;
  }

  if (days < 0) {
    const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
    days += prevMonth.getDate();
    months -= 1;
  }

  if (months < 0) {
    months += 12;
    years -= 1;
  }

  if (years > 0) {
    return { label: 'years', value: years };
  }

  if (months > 0) {
    return { label: 'months', value: months };
  }

  if (days > 0) {
    return { label: 'days', value: days };
  }

  if (hours > 0) {
    return { label: 'hours', value: hours };
  }

  if (minutes > 0) {
    return { label: 'minutes', value: minutes };
  }

  return { label: 'seconds', value: seconds };
}

function convertStringToSeconds(string) {
  if (!isString(string)) {
    return null;
  }

  const match = string.trim().match(/^(\d+(?:\.\d+)?)(s|sec|m|min|h|d|w|mo|y)$/i);
  if (!match) {
    return null;
  }

  const value = toNumber(match[1]);
  const unit = match[2].toLowerCase();

  const now = new Date();
  const future = new Date(now);

  if (unit === 's' || unit === 'sec') {
    future.setSeconds(future.getSeconds() + value);
  } else if (unit === 'm' || unit === 'min') {
    future.setMinutes(future.getMinutes() + value);
  } else if (unit === 'h') {
    future.setHours(future.getHours() + value);
  } else if (unit === 'd') {
    future.setDate(future.getDate() + value);
  } else if (unit === 'w') {
    future.setDate(future.getDate() + (value * 7));
  } else if (unit === 'mo') {
    future.setMonth(future.getMonth() + value);
  } else if (unit === 'y') {
    future.setFullYear(future.getFullYear() + value);
  }

  return future.getTime() - now.getTime();
}

function addToDate(input, {
  days = 0, hours = 0, minutes = 0, seconds = 0,
} = {}) {
  const date = toDate(input);
  if (!date) {
    return null;
  }

  const result = new Date(date);

  result.setDate(result.getDate() + days);
  result.setHours(result.getHours() + hours);
  result.setMinutes(result.getMinutes() + minutes);
  result.setSeconds(result.getSeconds() + seconds);

  return result;
}

function getStartOfDay(input) {
  const date = toDate(input);
  if (!date) {
    return null;
  }

  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

function getEndOfDay(input) {
  const date = toDate(input);
  if (!date) {
    return null;
  }

  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
}

function differenceInDays(a, b) {
  const d1 = getStartOfDay(a);
  const d2 = getStartOfDay(b);

  if (!d1 || !d2) {
    return null;
  }

  let count = 0;
  const step = d1 > d2 ? -1 : 1;

  const current = new Date(d2);

  while (
    (step === 1 && current < d1)
    || (step === -1 && current > d1)
  ) {
    current.setDate(current.getDate() + step);
    count += step;
  }

  return count;
}

function getCurrentWeekdayIndex(input) {
  const date = toDate(input);
  if (!date) {
    return null;
  }

  const day = date.getDay(); // 0 Sunday
  return day === 0 ? 6 : day - 1; // 0..6 (Mon..Sun)
}

function getStartOfWeek(input) {
  const date = toDate(input);
  if (!date) {
    return null;
  }

  const result = new Date(date);
  const weekday = getCurrentWeekdayIndex(result);

  result.setDate(result.getDate() - weekday);
  result.setHours(0, 0, 0, 0);

  return result;
}

function getEndOfWeek(input) {
  const date = toDate(input);
  if (!date) {
    return null;
  }

  const result = new Date(date);
  const weekday = getCurrentWeekdayIndex(result);

  result.setDate(result.getDate() + (6 - weekday));
  result.setHours(23, 59, 59, 999);

  return result;
}

export {
  addToDate,
  convertStringToSeconds,
  differenceInDays,
  formatDate,
  formatISODate,
  getCurrentWeekdayIndex,
  getEndOfDay,
  getEndOfWeek,
  getRelativeDateLabel,
  getStartOfDay,
  getStartOfWeek,
  getTimeRemaining,
  isDatesEqual,
  isFuture,
  isPast,
  isToday,
  toDate,
  toTimestamp,
};
