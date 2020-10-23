'use strict';

const helpMessage = `
  Usage
    $ tl [<options> ...]
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
      $ tl
      $ tl --help
      $ tl --version
      $ tl --task Check commit b:project p:2
      $ tl --note Complexity of Merge-sort is O(nlogn) b:project
      $ tl --remove 1
      $ tl --done 2
      $ tl --priority 2 p:3
      $ tl --board c:project n:coding
      $ tl --edit 2 Some new task description
      $ tl --move 1 b:college
      $ tl --find college
      $ tl --star 3
      $ tl --copy 1 2 3
      $ tl --unpin
      $ tl --timeline
      $ tl --begin 2
      $ tl --list pending
      $ tl --erase
`;

module.exports = helpMessage;