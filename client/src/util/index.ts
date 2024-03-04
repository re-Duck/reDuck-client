export const makeHtmlToBlob = (innerHTML: string) => {
  const htmlContent = new Array(innerHTML);
  const blob = new Blob(htmlContent, { type: 'text/html' });
  return blob;
};

export const makeblobToHTML = (blob: Blob) => {
  const fr = new FileReader();

  try {
    fr.onload = () => {
      return fr.result;
    };
    fr.readAsText(blob);
  } catch (error) {
    console.error(error);
  }
};

export const makeJsonToBlob = (json: object) => {
  const jsonContent = new Array(JSON.stringify(json));
  const blob = new Blob(jsonContent, { type: 'application/json' });
  return blob;
};

export const parseDate = (date: string) => {
  if (!date) return;
  const year = Number(date.slice(0, 4));
  const month = Number(date.slice(5, 7));
  const day = Number(date.slice(8, 10));

  return `${year}년 ${month}월 ${day}일`;
};

export const parseDateWithDot = (date: string) => {
  if (!date) return;

  const year = date.slice(0, 4);
  const month = date.slice(5, 7).padStart(2, '0');
  const day = date.slice(8, 10).padStart(2, '0');

  return `${year}.${month}.${day}`;
};

export const formatDateToHHMM = (dateString: string) => {
  const newDate = new Date(dateString);
  const hours = newDate.getHours().toString().padStart(2, '0');
  const minutes = newDate.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const formatDateToString = (dateString: string) => {
  const currentDate = new Date();
  const targetDate = new Date(dateString);

  const diffTime = Math.abs(currentDate.getTime() - targetDate.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    // 오늘 날짜
    const hours = targetDate.getHours();
    const minutes = targetDate.getMinutes();
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  } else if (diffDays === 1) {
    // 어제 날짜
    return '어제';
  } else {
    // 그 외의 경우
    const month = targetDate.getMonth() + 1;
    const day = targetDate.getDate();
    return `${month}월 ${day}일`;
  }
};

export const decodeJWT = (token: string) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );

  return JSON.parse(jsonPayload);
};
