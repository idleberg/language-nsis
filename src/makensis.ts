import { basename } from 'path';
import { clearConsole, getMakensisPath, getSpawnEnv, isHeaderFile, isLoadedAndActive, mapDefinitions } from './util';
import { compilerErrorHandler, compilerExitHandler, compilerOutputHandler, flagsHandler, versionHandler } from './handlers';
import Config from './config';

let NSIS;

import BusySignal from './services/busy-signal';

async function compile(strictMode: boolean): Promise<void> {
  const editor = atom.workspace.getActiveTextEditor();

  if (!editor) {
    atom.notifications.addWarning(`No active editor`, {
      dismissable: false,
    });
    return;
  }

  const script = editor.getPath();
  const scope = editor.getGrammar().scopeName;

  if (Config.get('processHeaders') && isHeaderFile(script)) {
    const notification = atom.notifications.addWarning('Compiling header files is blocked by default. You can allow this in the package settings.', {
      dismissable: true,
      buttons: [
        {
          text: 'Open Settings',
          className: 'icon icon-gear',
          async onDidClick() {
            await atom.workspace.open(`atom://config/packages/language-nsis`, {
              pending: true,
              searchAllPanes: true,
            });

            notification.dismiss();

            return;
          }
        },
        {
          text: 'Cancel',
          onDidClick() {
            notification.dismiss();

            return;
          }
        }
      ]
    });

    atom.beep();
    return;
  }

  if (script && scope.startsWith('source.nsis')) {
    try {
      await editor.save();
    } catch (error) {
      console.log(error);
      atom.beep();

      return;
    }

    clearConsole();

    if (isLoadedAndActive('busy-signal')) {
      BusySignal.add(`Compiling ${basename(script)}`);
    }

    NSIS = (await import('makensis')).default;

    NSIS.events.on('stdout', compilerOutputHandler);
    NSIS.events.on('stderr', compilerErrorHandler);
    NSIS.events.once('exit', compilerExitHandler);

    await NSIS.compile(
      script,
      {
        define: mapDefinitions(),
        json: Config.get('showFlagsAsObject'),
        pathToMakensis: await getMakensisPath(),
        rawArguments: Config.get('compilerOptions.customArguments'),
        strict: strictMode || Config.get('compilerOptions.strictMode'),
        verbose: parseInt(String((Config.get('compilerOptions.verbosity'))))
      },
      await getSpawnEnv()
    );

    NSIS.events.removeAllListeners();

    if (isLoadedAndActive('busy-signal')) {
      BusySignal.clear();
    }
  }
}

async function showVersion(): Promise<void> {
  if (isLoadedAndActive('busy-signal')) {
    BusySignal.add(`Showing version`);
  }

  clearConsole();
  const pathToMakensis = await getMakensisPath();

  NSIS = (await import('makensis')).default;

  NSIS.events.once('stdout', (data) => versionHandler(data, pathToMakensis));

  await NSIS.version(
    {
      pathToMakensis,
    },
    await getSpawnEnv()
  );

  if (isLoadedAndActive('busy-signal')) {
    BusySignal.clear();
  }
}

async function showCompilerFlags(): Promise<void> {
  if (isLoadedAndActive('busy-signal')) {
    BusySignal.add(`Showing compiler flags`);
  }

  clearConsole();

  NSIS = (await import('makensis')).default;

  NSIS.events.once('exit', flagsHandler);

  await NSIS.headerInfo(
    {
      json: Config.get('showFlagsAsObject'),
      pathToMakensis: await getMakensisPath()
    },
    await getSpawnEnv()
  );

  if (isLoadedAndActive('busy-signal')) {
    BusySignal.clear();
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
async function showHelp(selectListView: any): Promise<void> {
  NSIS = (await import('makensis')).default;

  const output = await NSIS.commandHelp(
    '',
    {
      json: true,
      pathToMakensis: await getMakensisPath()
    },
    await getSpawnEnv()
  );

  selectListView.update({ items: Object.keys(output.stdout) });
}

export { compile, showCompilerFlags, showHelp, showVersion };
