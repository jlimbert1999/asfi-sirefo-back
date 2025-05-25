export class AnsiDateUtil {
  static parseFromAnsi(dateAnsi: string | number): Date {
    const dateStr = dateAnsi.toString();
    const year = Number(dateStr.slice(0, 4));
    const month = Number(dateStr.slice(4, 6)) - 1; // JS months: 0-based
    const day = Number(dateStr.slice(6, 8));
    const hour = Number(dateStr.slice(8, 10));
    const minute = Number(dateStr.slice(10, 12));
    const second = Number(dateStr.slice(12, 14));
    return new Date(year, month, day, hour, minute, second);
  }

  static formatToAnsi(date: Date): string {
    const pad = (num: number) => num.toString().padStart(2, '0');
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    return `${year}${month}${day}${hours}${minutes}${seconds}`;
  }
}
