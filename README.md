# Jeopardy!

A browser-based Jeopardy game with team scoring. No install or build step — it's plain HTML, CSS, and JavaScript.

**Categories:** History · Geography · Science · Mu Alpha Theta / Math · Random Facts

## How to play

1. Open `index.html` in a browser (or visit the GitHub Pages link — see below).
2. Type a team name and click **+ Add Team**. Add as many teams as you want.
3. Click a point value on the board to open the question.
4. Click **Show Answer** to reveal it.
5. Under "Who answered?":
   - **✓** gives that team the points and closes the question.
   - **✗** takes the points away (classic Jeopardy rules) and lets another team try. Skip it if you don't want to take away points.
6. Click **Close** if nobody gets it.

Other controls:
- **−100 / +100** on each team card fix scoring mistakes.
- **×** on a team card removes that team.
- **Reset Board** puts every question back but keeps scores.
- **New Game** resets the board and all scores to 0.
- If you open a question by accident, click **Close** before revealing the answer and the tile stays on the board.
- Scores and used questions are saved in the browser, so refreshing the page won't lose your game.

## Editing questions

All questions and answers live in `questions.js`. Each category has 5 questions, ordered from 100 to 500 points.

## Putting it on GitHub Pages

1. Create a new repository on GitHub and upload these files: `index.html`, `style.css`, `script.js`, `questions.js`.
2. Go to **Settings → Pages**.
3. Under "Branch," pick `main` and `/ (root)`, then click **Save**.
4. After a minute, your game will be live at `https://<your-username>.github.io/<repo-name>/`.
