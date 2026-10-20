CS301L Lab 06 — A page that waits
Student: Ali Hafeez
Roll number: 247274
Project: 1 — The lookup (last digit 4; 4 % 3 = 1)

Files
- lookup.html: page structure
- style.css: responsive visual design
- lookup.js: Find interaction and slip calculations
- server.js: provided lab server, copied without changing its behavior

Run
1. Keep all files in this folder.
2. Open a terminal in this folder.
3. Run: node server.js
4. Visit: http://localhost:3016/lookup.html

Expected checks
- Find pen: card shows pen / Rs 50; slip row Times 1; Found 1; Dearest 50.
- Find pen again: same row Times 2.
- Find copy: second row; Found 2; Dearest 80.
- Find ruler: card clears; slip stays unchanged.
- Empty Find: status says undefined.
- Stop server and Find an item: card clears; slip stays unchanged; status says The server is not answering.
- Refresh resets the page and slip.

Note: The provided prompt refers to a separate top-of-lab table for the assigned place name. That table was not included in the message, so the header currently uses the project title “THE LOOKUP”. The theme uses #315c72, the digit-4 colour previously supplied in the CSS instructions. Replace the header title with the exact assigned place if your teacher's table specifies one.
