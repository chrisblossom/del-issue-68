# del-issue-68

## Usage

``node 8.9+ required (async/await)``

``npm run start``

## Issue

```
➜  del-issue-68 git:(master) ✗ npm run start

> del-issue-68@1.0.0 start /Users/chris/github/del-issue-68
> node src/del-issue-68.js

sync starting
sync complete
async starting
async error: { Error: EINVAL: invalid argument, rmdir '/var/folders/hm/n_tq5p6j7j313n28pjzvk63c0000gn/T/del-issue-68/a/b/c'
  errno: -22,
  code: 'EINVAL',
  syscall: 'rmdir',
  path: '/var/folders/hm/n_tq5p6j7j313n28pjzvk63c0000gn/T/del-issue-68/a/b/c' }
done. No errors should have been logged
```

```
➜  del-issue-68 git:(master) ✗ npx envinfo --preset jest
npx: installed 1 in 1.36s

  System:
    OS: macOS High Sierra 10.13.3
    CPU: x64 Intel(R) Core(TM) i7-4960HQ CPU @ 2.60GHz
  Binaries:
    Node: 8.11.2 - ~/.nvm/versions/node/v8.11.2/bin/node
    Yarn: 1.7.0 - ~/.yarn/bin/yarn
    npm: 5.6.0 - ~/.nvm/versions/node/v8.11.2/bin/npm
```
