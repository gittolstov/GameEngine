compilationArray = [
    "Formulas.js",
    "Draw.js",
    "InputHandler.js",
    "Classes.js",
    "Player.js",
    "Drg.js",
    "AdvancedWeaponarySystems.js",
    "LevelEditor.js",
    "BaseBackend.js",
    "Server.js",
    "Server_starter.js"
]


with open("Compiled.js", "w", encoding="UTF-8") as file:
    file.write("")
for a in compilationArray:
    with open("game/" + a, "r", encoding="UTF-8") as file:
        code = file.read()
    with open("Compiled.js", "a", encoding="UTF-8") as file:
        file.write("\n" + code)
