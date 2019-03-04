import { Injectable } from '@angular/core';

@Injectable()
export class TextHelper {

  public toCamelCase(str) {
    // Lower cases the string
    return str.toLowerCase()
    // Replaces any - or _ characters with a space
      .replace( /[-_]+/g, ' ')
      // Removes any non alphanumeric characters
      .replace( /[^\w\s]/g, '')
      // Uppercases the first character in each group immediately following a space
      // (delimited by spaces)
      .replace( / (.)/g, function($1) { return $1.toUpperCase(); })
      // Removes spaces
      .replace( / /g, '' );
  }
  public toClass(str) {
    // Lower cases the string
    return str.toLowerCase()
      .replace(/\s+/g, '-')
  }

  public capitalize(str) {
    const parts = str.split('');
    parts[0] = parts[0].toUpperCase();

    return parts.join('');
  }
  public dedent(strings) {
    let raw = void 0;
    if (typeof strings === 'string') {
      // dedent can be used as a plain function
      raw = [strings];
    } else {
      raw = strings.raw;
    }

    // first, perform interpolation
    let result = '';
    for (let i = 0; i < raw.length; i++) {
      result += raw[i].
      // join lines when there is a suppressed newline
      replace(/\\\n[ \t]*/g, '').

      // handle escaped backticks
      replace(/\\`/g, '`');

      if (i < (arguments.length <= 1 ? 0 : arguments.length - 1)) {
        result += arguments.length <= i + 1 ? undefined : arguments[i + 1];
      }
    }

    // now strip indentation
    const lines = result.split("\n");
    let mindent = null;
    lines.forEach(function (l) {
      const m = l.match(/^(\s+)\S+/);
      if (m) {
        const indent = m[1].length;
        if (!mindent) {
          // this is the first indented line
          mindent = indent;
        } else {
          mindent = Math.min(mindent, indent);
        }
      }
    });

    if (mindent !== null) {
      result = lines.map(function (l) {
        return l[0] === ' ' ? l.slice(mindent) : l;
      }).join('\n');
    }

    // dedent eats leading and trailing whitespace too
    result = result.trim();

    // handle escaped newlines at the end to ensure they don't get stripped too
    return result.replace(/\\n/g, '\n');
  }

  /**
   * @param {string} passing a string with 2 words
   * @returns {string} 2 Capital Letters
   */
  public titleCase(str: string) {
    return str
      .replace(/[^a-zA-Z ]/g, '')
      .toLowerCase()
      .split(' ')
      .map(function(word) {
        return word[0].toUpperCase();
      })
      .join('');
  }

  /**
   * @description converts seconds to Hours, minutes and seconds (Hms format)
   * @param {string} secondString: seconds as a string
   * @returns {string}
   */
  public secondsToHms(secondString: string) {
    const secondNumber = Number(secondString);
    const h = Math.floor(secondNumber / 3600);
    const m = Math.floor(secondNumber % 3600 / 60);
    const s = Math.floor(secondNumber % 3600 % 60);

    const hDisplay = h > 0 ? `${h}h` : '';
    const mDisplay = m > 0 ? `${m}m` : '';
    const sDisplay = s > 0 ? `${s}s` : '';
    return `${hDisplay} ${mDisplay} ${sDisplay}`;
  }

  /**
   * @description get Hours from seconds string
   * @param {string} secondString: seconds as a string
   * @returns {string}
   */
  public getHoursFromSecondsString(secondString: string) {
    const secondNumber = Number(secondString);
    const hours = secondNumber / 3600;
    return hours;
  }

  /**
   * @description get seconds from time string with this format HH:mm
   * @param {string} timeString: time string HH:mm
   * @returns {string}
   */
  public getSecondsFromTimeString(timeString: string) {
    if (timeString) {
      const timeArr = timeString.split(':'); // split the hours from the minutes
      const hours = timeArr[0]; // get the hours
      const minutes = timeArr[1]; // get the minutes
      const seconds = (+hours) * 60 * 60 + (+minutes) * 60
      return seconds.toString();
    }
  }

  /**
   * @description random color gernerators
   */
  public getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
