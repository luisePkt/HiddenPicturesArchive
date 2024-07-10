# Fotos aus alten Büchern API

- Nutzer können Bilder aus alten Büchern speichern und kleine Sammlung erstellen

## Funktionen

### User

- CREATE - register (Nutzer anlegen)
  - Nutzerdaten (username, password, profil-pic/default-pic, email)
- GET - login mit email und password
- PUT/PATCH - update userprofil (nutzer kann nutzerdaten ändern)
- DELETE - delete nutzer kann profil löschen

### user archive

- user kann:

- CREATE - archiv anlegen
  - Archiv-name, datum, öffentlich/privat
- GET - Archiv anzeigen lassen - alle Element (vielleicht auch sortiert nach Schlagworten)
- PUT/PATCH - Archiv bearbeiten, z.B. Archivname ändern.
- DELETE - Archiv löschen

### archiv-elemente:

- CREATE - archiv-element anlegen
  - Bildtitel, Quelle, Datum, Schlagworte, image, (öffentlich/privat)
- GET - archiv-element anzeigen
- PUT/PATCH - Archiv-Element bearbeiten (z.B. Bildtitel ändern)
- DELETE - Archiv-Element löschen

## Backend

- server.js
- userRoutes.js
- .env
- .gitignore

- middleware:

  - db.js
  - errorMiddleware.js

- controllers:

  - errorController
  - userController.js
  - archiveController.js
  - archiveElementController.js

- models:

  - User.js
  - ArchiveElement.js

- public:

  - profilePic
  - ArchiveElemnts images

- routes:

  - userRouter.js
  - archiveRouter.js
  - archiveElementsRouter.js

- utils:

### Sicherheit

- captcha beim anmelden
- unique username und pw
- hashing
- jwt
- clamscan (für multer)
- filter für multer (nur bilder dürfen hochgeladen werden)
- cookies

### Funktionen
- sorting
- pagination
- pw bei anmeldung wiederholen?
- bilder auf größe & format kontrollieren und resizen (z.B. auf bestimmtes Seitenverhältnis) -> sharp-package (resizing)

## Frontend
