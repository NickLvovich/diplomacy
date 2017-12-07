![Diplomacy](http://avalonhill.wizards.com/sites/default/files/media/diplomacy_logo.png)

Diplomacy is based on the classic board game of the same name created by Allan B. Calhamer and currently published by Hasbro.  The official ruleset can be found in PDF form thanks to [Wizards of the Coast](https://www.wizards.com/avalonhill/rules/diplomacy.pdf), while a more abbreviated "quick start" ruleset can be found at [Ultra Diplomacy](http://www.ultradiplomacy.com/game-rules.php).

Our online version uses a Rails backend to handle storage of altered board states, while the JavaScript frontend tackles most of the actual game logic.  The current version envisions a play-and-pass style of gaming, where each player enters their moves before passing it to the next.  Optimally, we would like users to be able to log in remotely and play online together.  We also envision chat rooms for each player, though it may be optimal to supplement this with a third-party voice chat.

To run this program on your own, fork and then clone down the repository, navigate to the folder and then open index.html.  
