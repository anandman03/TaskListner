'use strict';

const helpMessage = `
  Usage
    $ tb [<options> ...]
    Options
        none             Display board view
      --begin, -b        Start/pause task
      --check, -c        Check/uncheck task
      --clear            Delete all checked items
      --delete, -d       Delete item
      --edit, -e         Edit item description
      --find, -f         Search for items
      --help, -h         Display help message
      --list, -l         List items by attributes
      --move, -m         Move item between boards
      --note, -n         Create note
      --priority, -p     Update priority of task
      --restore, -r      Restore items from archive
      --star, -s         Star/unstar item
      --task, -t         Create task
      --timeline, -i     Display timeline view
      --version, -v      Display installed version
`;

module.exports = helpMessage;