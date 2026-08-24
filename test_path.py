from pathlib import Path
import os

os.chdir(r'D:/Ilham Stuff/Coding/Web-Apps/Ayoto')
base = Path(r'Assets/Furniture')
print('Exists:', base.exists())
print('Resolved:', base.resolve())
print('Folders:', [p.name for p in base.iterdir() if p.is_dir()])
