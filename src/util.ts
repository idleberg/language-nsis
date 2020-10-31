import { constants, promises as fs } from 'fs';
import { config as dotenvConfig } from 'dotenv';
import { exec } from 'child_process';
import { platform } from 'os';
import { resolve } from 'path';
import { satisfyDependencies } from 'atom-satisfy-dependencies';
import { shell } from 'electron';
import execa from 'execa';
import open from 'open';

function clearConsole(consolePanel: ConsolePanel): void {
  try {
    consolePanel.clear();
  } catch (error) {
    if (getConfig('clearConsole')) {
      console.clear();
    }
  }
}

function detectOutfile(line: string): string {
  if (line.indexOf("Output: \"") !== -1) {
    const regex = /Output: "(.*\.exe)"\r?\n/g;
    const result = regex.exec(line.toString());

    return result[1];
  }

  return "";
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath, constants.F_OK);
  } catch (error) {
    return false;
  }

  return true;
}

async function findEnvFile() {
  let envFile = undefined;
  const projectPath: string = atom.project.getPaths()[0];

  switch (true) {
    case (await fileExists(resolve(projectPath, '.env.local'))):
      envFile = resolve(projectPath, '.env.local');
      break;

    case (process.env.NODE_ENV && await fileExists(resolve(projectPath, `.env.[${process.env.NODE_ENV}]`))):
      envFile = resolve(projectPath, `.env.[${process.env.NODE_ENV}]`);
      break;

    case (await fileExists(resolve(projectPath, '.env'))):
      envFile = resolve(projectPath, '.env');
      break;

    default:
      envFile = undefined;
      break;
  }

  if (envFile) console.log(`Found DotEnv file ${envFile}`);

  return envFile;
}

function getConfig(key: string): any {
    return key
      ? atom.config.get(`language-nsis.${key}`)
      : atom.config.get(`language-nsis`);
}

async function getMakensisPath(): Promise<string> {

  // If stored, return pathToMakensis
  const pathToMakensis = String(getConfig('pathToMakensis'));

  if (pathToMakensis?.length && pathToMakensis !== 'makensis') {
    return pathToMakensis;
  }

  return String(await which('makensis')) || 'makensis';
}

function getPrefix(): string {
  return platform() === 'win32'
    ? '/'
    : '-';
}

async function getSpawnEnv(): Promise<unknown> {
  await initDotEnv();

  return {
    env: {
      NSISDIR: process.env.NSISDIR || undefined,
      NSISCONFDIR: process.env.NSISCONFDIR || undefined,
    }
  };
}

function getWhich(): string {
  return platform() === 'win32'
    ? 'where'
    : 'which';
}

async function initDotEnv(): Promise<void> {
  dotenvConfig({
    path: await findEnvFile()
  });
}

function isHeaderFile(filePath: string): boolean {
  const headerFiles = [
    '.bnsh',
    '.nsh'
  ];

  return Boolean(headerFiles.filter(fileExt => filePath?.endsWith(fileExt)).length);
}

function isWindowsCompatible(): boolean {
  return platform() === 'win32' || getConfig('useWineToRun')
    ? true
    : false;
}

async function manageDependencies(): Promise<void> {
  await satisfyDependencies('language-nsis');
}

function notifyOnCompletion(type: string, outFile: string): void {
  const notification = atom.notifications[type]('Compiled successfully', {
    dismissable: true,
    buttons: outFile ? [
      isWindowsCompatible() ? {
        text: 'Run',
        className: 'icon icon-playback-play',
        async onDidClick() {
          await runInstaller(outFile);
          notification.dismiss();

          return;
        },
      } : undefined,
      {
        text: 'Reveal',
        className: 'icon icon-location',

        onDidClick() {
          revealInstaller(outFile);
          notification.dismiss();

          return;
        },
      },
      {
        text: 'Cancel',

        onDidClick() {
          notification.dismiss();

          return;
        },
      }
    ].filter(item => item) : [],
  });
}

function openURL(nsisCommand: string): void {
  open(`https://idleberg.github.io/NSIS.docset/Contents/Resources/Documents/html/Reference/${nsisCommand}.html?utm_source=atom&utm_content=reference`, {
    url: true
  });
}

function revealInstaller(outFile: string): void {
  if (fileExists(outFile)) {
    shell.showItemInFolder(outFile);
  }
}

async function runInstaller(outFile) {

  if (platform() === 'win32') {
    try {
      exec(`cmd /c "${outFile}"`);
    } catch (error) {
      console.error(error);
      atom.notifications.addWarning('Failed to run installer, see console for details', {
        dismissable: true
      });
    }

    return;
  } else if (getConfig("useWineToRun") === true) {
    try {
      await execa("wine", [ outFile ]);
    } catch (error) {
      atom.notifications.addWarning('Failed to run installer, see console for details', {
        dismissable: true
      });
      console.error(error);
    }
  }
}

async function which(executable: string): Promise<unknown> {
  return (await execa(getWhich(), [executable], {})).stdout.trim();
}

export {
  clearConsole,
  detectOutfile,
  fileExists,
  getConfig,
  getMakensisPath,
  getPrefix,
  getSpawnEnv,
  getWhich,
  isHeaderFile,
  isWindowsCompatible,
  manageDependencies,
  notifyOnCompletion,
  openURL,
  which
}