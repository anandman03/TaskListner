'use strict';

const helpMessage = `
  Usage
    $ listen [<options> ...]
    Options
        none             Display board view
      --help,     -h     Help log message
      --version,  -v     Current version
      --task,     -t     Create task
      --note,     -n     Create note
      --remove    -r     Remove items
      --done,     -d     Mark task done/pending
      --priority, -p     Update priority of task
      --board     -b     Change board name
      --edit,     -e     Edit item description
      --move,     -m     Move item between boards
      --find,     -f     Find item/boards
      --star,     -s     Star/unstar item
      --copy,     -c     Copy item description to clipboard
      --unpin,    -u     Remove all completed tasks
      --timeline, -i     Display timeline view
      --begin,    -b     Begin/Pause task
      --list,     -l     List items by attributes
      --erase,    -e     Clear all the items

    Examples
      $ listen
      $ listen --help
      $ listen --version
      $ listen --task Check commit b:project p:2
      $ listen --note Complexity of Merge-sort is O(nlogn) b:project
      $ listen --remove 1
      $ listen --done 2
      $ listen --priority 2 p:3
      $ listen --board c:project n:coding
      $ listen --edit 2 Some new task description
      $ listen --move 1 b:college
      $ listen --find college
      $ listen --star 3
      $ listen --copy 1 2 3
      $ listen --unpin
      $ listen --timeline
      $ listen --begin 2
      $ listen --list pending
      $ listen --erase
`;

module.exports = helpMessage;