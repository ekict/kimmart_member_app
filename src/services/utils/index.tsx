import React from 'react';
import {useEffect, useState} from 'react';
import {Image} from 'react-native';
import {v1} from 'uuid';
import {TextTranslateWithValue} from '../../components';
import {server} from '../../hooks/api';
import {Weight} from '../../res/lang';
import {deviceWidth} from '../../styles';
import {decimal_point} from '../setting';

export function changeFontSize(
  langForCheck: any[],
  currentLang: string,
  trueValue: string,
  falseValue: string = '',
) {
  let check = langForCheck.includes(currentLang);
  if (check) return trueValue;
  else return falseValue;
}

export function padLeadingZeros(num: any, size: number) {
  var s = num + '';
  while (s.length < size) s = '0' + s;
  return s;
}

export const minDate = (value: any = 0) => {
  var date = new Date();
  date.setDate(date.getDate() + value);
  return date;
};

export const ConvertDateToTime = (value: Date) => {
  let date = value;
  if (!(value instanceof Date)) {
    date = new Date(value);
  }
  let hour: any = date.getHours();
  if (Number(hour) < 10) {
    hour = '0' + hour;
  }
  let minute: any = date.getMinutes();
  if (Number(minute) < 10) {
    minute = '0' + minute;
  }
  let am_pm = Number(hour) > 12 ? 'PM' : 'AM';
  let convert = hour + ':' + minute + ' ' + am_pm;
  return convert;
};

export const getPath = (path: string, name: string) => {
  return `${server}${path}${name}`;
};

export const getCurrency = (data: any, code: any) => {
  const currency = data?.filter((r: any) => r.code === code);
  if (currency.length > 0) {
    return currency[0];
  }
  return null;
};

export function numberWithCommas(value: any) {
  return Number(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function numberWithCommasDecimalPoint(value: Number) {
  return value.toFixed(decimal_point).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

export function convertToNumber(value: any = 0) {
  return Number(value.toFixed(2));
}

export const ConvertTime = (time: any) => {
  const value = time.split(':');
  const am_pm = Number(value[0] > 12) ? 'PM' : 'AM';
  const result = `${Number(value[0]) % 12}:${value[1]} ${am_pm}`;
  return result;
};

export const ConvertTimeToString = (value: any) => {
  let date = value;
  if (!(value instanceof Date)) {
    date = new Date(value);
  }
  let convert = `${padLeadingZeros(date.getHours(), 2)}:${padLeadingZeros(
    date.getMinutes(),
    2,
  )} `;
  convert += `${date.getHours() < 12 ? 'AM' : 'PM'}`;
  return convert;
};

export const ConvertDateToString = (value: any) => {
  let date = value;
  if (!(value instanceof Date)) {
    date = new Date(value);
  }
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  if (Number(month) < 10) {
    month = '0' + month;
  }
  if (Number(day) < 10) {
    day = '0' + day;
  }
  let convert = year + '-' + month + '-' + day;
  return convert;
};

export const ConvertToDate = (value: Date) => {
  let date = value;
  if (!(value instanceof Date)) {
    date = new Date(value);
  }
  var month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  let convert = `${month[date.getMonth()]} ${padLeadingZeros(
    date.getDate(),
    2,
  )}, ${date.getFullYear()}, `;
  convert += `${padLeadingZeros(date.getHours(), 2)}:${padLeadingZeros(
    date.getMinutes(),
    2,
  )}:${padLeadingZeros(date.getSeconds(), 2)} `;
  convert += `${date.getHours() < 12 ? 'AM' : 'PM'}`;
  return convert;
};

export const convertArgsToObject = (args: any) => {
  if (args) return args[0];
  return null;
};

export const UUID = () => {
  return v1();
};

export function getRandomInt() {
  const min = Math.ceil(10000000);
  const max = Math.floor(99999999);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomIntUniq() {
  const min = Math.ceil(10000);
  const max = Math.floor(99999);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getYoutubeId(Url: any) {
  var ID = '';
  let url = Url.replace(/(>|<)/gi, '').split(
    /(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/,
  );
  if (url[2] !== undefined) {
    ID = url[2].split(/[^0-9a-z_]/i);
    ID = ID[0];
  } else {
    ID = url;
  }
  return ID;
}

export function capitalizeWords(arr: any) {
  return arr.map((element: any) => {
    return element.charAt(0).toUpperCase() + element.slice(1).toLowerCase();
  });
}

export function randomInt(min: number, max: number) {
  return Math.floor(min + Math.random() * (max - min + 1));
}

export const makeid = () => {
  var text = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+<>?:|.,';

  for (var i = 0; i < 20; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};

export function useImageSize(uri: any, widthAssign: any = deviceWidth) {
  const [imageSize, setImageSize] = useState<any>({width: null, height: null});
  useEffect(() => {
    Image.getSize(uri, (width, height) => {
      // use aspect ratio to set the size of the image relative to react-native pixels.
      setImageSize({
        width: widthAssign,
        height: (widthAssign * height) / width,
      });
    });
  }, []);
  return imageSize;
}

const regexEscape = (str: any) => str.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');

export const boldify: any = (searchStr: any) => (targetStr: any) => {
  return targetStr
    .split(new RegExp(`(${regexEscape(searchStr)})`, 'i'))
    .map((part: any, idx: any) =>
      idx % 2 ? (
        <TextTranslateWithValue weight={Weight.bold} key={idx}>
          {part}
        </TextTranslateWithValue>
      ) : (
        <React.Fragment key={idx}>{part}</React.Fragment>
      ),
    );
};

export const countdownToExpiredDate = (value: any, currentValue: any) => {
  let date = value;
  if (!(value instanceof Date)) {
    date = new Date(value);
  }

  let currentDate = currentValue;
  if (!(currentValue instanceof Date)) {
    currentDate = new Date(currentValue);
  }

  var timeleft = date.getTime() - currentDate.getTime();

  var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
  var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
  };
};

export function checkPhoneNumber(phone: any) {
  let phone_number = phone;
  if (phone_number.charAt(0) === '0') {
    phone_number = phone_number.substring(1, phone_number.length);
  }
  return phone_number;
}
export const convertHMS = (value: any) => {
  if (value < 1) {
    return '00:00';
  } else {
    const sec = parseInt(value, 10); // convert value to number if it's string
    let hours: any = Math.floor(sec / 3600); // get hours
    let minutes: any = Math.floor((sec - hours * 3600) / 60); // get minutes
    let seconds: any = sec - hours * 3600 - minutes * 60; //  get seconds
    // add 0 if value < 10
    if (hours < 10) {
      hours = '0' + hours;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    return (hours < 1 ? '' : hours + ':') + minutes + ':' + seconds; // Return is HH : MM : SS
  }
};

export function capitalizeFirstLetter(str: any) {
  // converting first letter to uppercase
  const capitalized = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  return capitalized;
}

export function bytesToSize(bytes: number) {
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes == 0) return '0 Byte';
  var i = parseInt(String(Math.floor(Math.log(bytes) / Math.log(1024))));
  return numberWithCommas((bytes / 1024 ** i).toFixed(1)) + ' ' + sizes[i];
}

export function abbreviateToString(value: number) {
  var suffixes = ['', 'k', 'm', 'b', 't'];
  var suffixNum = Math.floor(('' + value).length / 3);
  var shortValue: any = parseFloat(
    (suffixNum != 0 ? value / Math.pow(1000, suffixNum) : value).toPrecision(2),
  );
  if (shortValue % 1 != 0) {
    shortValue = shortValue.toFixed(1);
  }
  if (shortValue < 1) {
    return value;
  }
  return shortValue + suffixes[suffixNum];
}

export const ConvertToEnglishDateNoDay = (value: Date, is_short = false) => {
  let date = value;
  if (!(value instanceof Date)) {
    date = new Date(value);
  }

  var month = is_short
    ? [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ]
    : [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
  let convert = ' ';
  if (date.getDate() < 10) convert = convert + '0';
  convert =
    convert +
    date.getDate() +
    ' ' +
    month[date.getMonth()] +
    ' ' +
    date.getFullYear();
  return convert;
};

export const ConvertToEnglishDayDate = (value: Date) => {
  let date = value;
  if (!(value instanceof Date)) {
    date = new Date(value);
  }
  let convert = '';
  var day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  convert = day[date.getDay()];
  return convert;
};

export const dateDiffInNotification = (value: any) => {
  var dt1 = value;
  if (!(value instanceof Date)) {
    dt1 = new Date(value);
  }
  var dt2 = new Date();
  const cal = Math.floor(
    (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
      Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
      (1000 * 60 * 60 * 24),
  );
  let duration = '';
  if (cal == 0) {
    if (dt2.getHours() - dt1.getHours() == 0) {
      if (dt2.getMinutes() - dt1.getMinutes() <= 0) {
        duration = 'Just Now';
      } else {
        duration =
          dt2.getMinutes() -
          dt1.getMinutes() +
          ' minute' +
          (dt2.getMinutes() - dt1.getMinutes() === 1 ? '' : 's') +
          ' ago';
      }
    } else {
      duration =
        dt2.getHours() -
        dt1.getHours() +
        ' hour' +
        (dt2.getHours() - dt1.getHours() === 1 ? '' : 's') +
        ' ago';
    }
  } else if (cal === 1) {
    duration = 'Yesterday at ' + ConvertDateToTime(dt1);
  } else if (cal < 7) {
    duration = ConvertToEnglishDayDate(dt1) + ' at ' + ConvertDateToTime(dt1);
  } else if (cal > 6) {
    duration =
      ConvertToEnglishDateNoDay(dt1, true) + ' at ' + ConvertDateToTime(dt1);
  } else {
    duration = '';
  }
  return duration;
};

export const getDefaultImage = () => {
  const image = require('../../res/logo/logo.png');
  return image;
};

export function SuffixDate(date: any) {
  return date.getDate() % 10 == 1 && date.getDate() != 11
    ? 'st'
    : date.getDate() % 10 == 2 && date.getDate() != 12
    ? 'nd'
    : date.getDate() % 10 == 3 && date.getDate() != 13
    ? 'rd'
    : 'th';
}

export const ConvertDate = (value: any, is_short: any = true) => {
  let date = value;
  if (!(value instanceof Date)) {
    date = new Date(value);
  }
  let year = date.getFullYear();
  var month = is_short
    ? [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ]
    : [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
  let day = date.getDate();
  if (Number(day) < 10) {
    day = '0' + day;
  }
  return {
    day,
    month: month[date.getMonth()],
    year,
  };
};

export function getImage(image: any, type: string) {
  return `${server}/storage/${type}/${image}`;
}

export function groupBy(array: any, key: any) {
  const data = [...new Set(array.map((item: any) => item[key]))];
  let result: any = [];
  data.map((item: any) => {
    const filtered = array.filter((arr: any) => arr.date == item);
    result.push({
      date: item,
      invoices: filtered,
    });
  });
  return result;
}
