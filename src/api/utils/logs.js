import chalk from 'chalk';

export const themes = {
  error: chalk.red,
  success: chalk.green,
  warning: chalk.yellow,
  info: chalk.blue,
};

const log = (
    theme,
    ...data
) => {
    console.log(themes[theme](...data));
};

class Logger {
        error = (...data) => log('error', ...data);
        success = (...data) => log('success', ...data);
        warning = (...data) => log('warning', ...data);
        info = (...data) => log('info', ...data);
}

export default Logger;
