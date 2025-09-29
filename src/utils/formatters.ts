// src/utils/formatters.ts

import moment from 'moment';

/**
 * A "guard clause" to handle cases where the input value might be null,
 * undefined, or an empty string. This prevents errors.
 * All formatting functions will use this.
 */
function hasValue(value: any): boolean {
    return value !== null && value !== undefined && value !== '';
}

/**
 * Formats a date string into "Month Day, Year H:MM AM/PM"
 * e.g., "Jan 01, 2024 03:45 PM"
 */
export function formatDate(value: string | Date): string {
    if (!hasValue(value)) return '';
  
    const localDate = new Date(value);
    const time = localDate.toLocaleTimeString('en-US'); // e.g., "3:45:12 PM"
    const timeParts = time.split(':'); // ["3", "45", "12 PM"]
    const timeSuffix = timeParts[2].split(' ')[1]; // "PM"
    
    const timeStamp = `${timeParts[0]}:${timeParts[1]}`; // "3:45"
    const dateFormat = moment(localDate).format("MMM DD, YYYY"); // "Jan 01, 2024"
  
    return `${dateFormat} ${timeStamp} ${timeSuffix}`;
}

/**
 * Formats a date string into "Month Day, Year"
 * e.g., "Jan 01, 2024"
 */
export function dateFormat(value: string | Date): string {
    if (!hasValue(value)) return '';

    return moment(new Date(value)).format("MMM DD, YYYY");
}

/**
 * Formats a UTC date string into a local 24-hour format "Month Day, Year HH:mm"
 * e.g., "Jan 01, 2024 15:45"
 */
export function date24hFormat(value: string | Date): string {
    if (!hasValue(value)) return '';

    return moment.utc(value).local().format('MMM DD, YYYY HH:mm');
}

/**
 * Formats a UTC date string into a local format with "at"
 * e.g., "Jan 01, 2024 at 15:45"
 */
export function timeFormat(value: string | Date): string {
    if (!hasValue(value)) return '';
    
    const dateFormat = moment.utc(value).local().format('MMM DD, YYYY');
    const timeFormat = moment.utc(value).local().format('HH:mm');
    return `${dateFormat} at ${timeFormat}`;
}

/**
 * Formats a number with thousands separators.
 * e.g., 12345.67 -> "12,345.67"
 */
export function formatNumber(value: number): string {
    if (!hasValue(value)) return '';
    
    return new Intl.NumberFormat('en-US').format(value);
}

/**
 * Takes a month number (as a string, e.g., "08" or "8") and returns the month name.
 * e.g., "08" -> "Aug"
 */
export function getMonth(value: string): string {
    if (!hasValue(value)) return '';

    // An array is "zero-indexed" (Jan is 0, Feb is 1, etc.)
    // We use parseInt to turn the string "08" into the number 8, then subtract 1.
    const monthIndex = parseInt(value, 10) - 1;
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    // Check if the index is valid before returning
    if (monthIndex >= 0 && monthIndex < 12) {
        return months[monthIndex];
    }
    return ''; // Return empty if the month number is invalid
}

/**
 * Strips HTML tags and extra whitespace from a string to get plain text.
 * Useful for showing previews of rich text content.
 */
export function formatText(value: string): string {
    if (!hasValue(value)) return '';
    
    let plainText = value;
    plainText = plainText.replace(/ /gi, ' '); // Replace non-breaking spaces
    plainText = plainText.replace(/<\s*br\/*>/gi, '\n'); // Replace <br> with newlines
    plainText = plainText.replace(/<\s*a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 (Link: $1) "); // Handle links
    plainText = plainText.replace(/<\s*\/?\w+.*?>/ig, ''); // Strip all other HTML tags
    plainText = plainText.replace(/ {2,}/gi, ' '); // Collapse multiple spaces
    plainText = plainText.replace(/^\s+|\s+$/g, ''); // Trim leading/trailing whitespace
    
    return plainText;
}