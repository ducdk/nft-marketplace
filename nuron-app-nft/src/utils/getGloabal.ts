export function getGlobalState() {
  const device = /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent) ? 'MOBILE' : 'DESKTOP';
  const collapsed = device !== 'DESKTOP';
  const showSocial = device !== 'DESKTOP';

  return {
    device,
    collapsed,
    showSocial
  } as const;
}

export function convertToSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
}

export function onTop() {
  let pageWrapper = document.getElementById('page-wrapper');
  if (pageWrapper) {
    pageWrapper.scrollTo(0, 0);
  }
}

// Action render user id
export const renderUserId = (id: string) => {
  let t = '#';
  for (let i = 0; i < 8 - id.toString().length; i++) {
    t += 0;
  }
  t += id;
  return t;
};

// Action render user id
export const renderUserWallet = (data: string) => {
  let temp = data.substr(0, 6) + '.......' + data.substr(data.length - 5, data.length);
  return temp;
};

export function numFormatterConvert(num: number) {
  if (num > 999 && num < 1000000) {
    return (num / 1000).toFixed(0) + 'K'; // convert to K for number from > 1000 < 1 million
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(0) + 'M'; // convert to M for number from > 1 million
  } else if (num < 900) {
    return num.toString(); // if value < 1000, nothing to do
  }
  return num.toString();
}

// Action: focus input
export const onFocusInputById = (id: string) => {
  let temp = document.getElementById(id) as HTMLInputElement;
  temp.selectionStart = 0;
  temp.selectionEnd = temp.value.length;
  temp.focus();
};

export const WIDTH_TAB = 1024;
export const WIDTH_MOBILE = 768;
export const WIDTH_MSMOBILE = 425;

