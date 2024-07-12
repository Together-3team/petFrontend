export default function insertPhoneNumberHyphen(value: string): string {
  let inputValue = value.replace(/\D/g, '');
  if (inputValue.length > 10) inputValue = inputValue.slice(0, 11);

  let formattedValue = inputValue;

  if (inputValue.length > 3 && inputValue.length <= 7) {
    formattedValue = inputValue.replace(/(\d{3})(\d{1,4})/, '$1-$2');
  }
  if (inputValue.length > 7) {
    formattedValue = inputValue.replace(/(\d{3})(\d{4})(\d{1,4})/, '$1-$2-$3');
  }

  return formattedValue;
}
