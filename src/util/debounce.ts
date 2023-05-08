export default function debounce(callback: any, timeout = 300) {
  let timer: any;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback();
    }, timeout);
  };
}
