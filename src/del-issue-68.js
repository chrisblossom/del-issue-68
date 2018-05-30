'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const makeDir = require('make-dir');
const del = require('del');

function writeFile(file, contents = '', options = {}) {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, contents, options, (error) => {
            if (error) {
                reject(error);

                return;
            }
            resolve();
        });
    });
}

const osTempDir = os.tmpdir();

const tempDir = path.resolve(osTempDir, 'del-issue-68');

const dir1 = path.resolve(tempDir, 'nested');
const dir2 = path.resolve(tempDir, 'a/b/c');

const file1 = path.resolve(tempDir, 'file1.js');
const file2 = path.resolve(tempDir, 'nested/file2.js');
const file3 = path.resolve(tempDir, 'a/b/c/file3.js');

async function initialize() {
    await makeDir(tempDir);
}

async function createFiles() {
    await Promise.all([makeDir(dir1), makeDir(dir2)]);
    await Promise.all([
        writeFile(file1, ''),
        writeFile(file2, ''),
        writeFile(file3, ''),
    ]);
}

async function removeFiles() {
    await del('**/*', {
        root: tempDir,
        cwd: tempDir,
        dot: true,
    });
}

function removeFilesSync() {
    del.sync('**/*', {
        root: tempDir,
        cwd: tempDir,
        dot: true,
    });
}

async function run() {
    await initialize();

    const arrLength = 200;
    const arr = new Array(arrLength);

    console.log('sync starting');
    let sync = 0;
    for (const x of arr) {
        await createFiles();
        try {
            removeFilesSync();
        } catch (error) {
            console.log('sync error:', error);
            break;
        }

        sync += 1;
        if (sync === arrLength) {
            console.log('sync complete');
        }
    }

    console.log('async starting');
    let async = 0;
    for (const x of arr) {
        await createFiles();
        try {
            await removeFiles();
        } catch (error) {
            console.log('async error:', error);
            break;
        }

        async += 1;
        if (async === arrLength) {
            console.log('async complete');
        }
    }

    console.log('done. No errors should have been logged');
}

run();
