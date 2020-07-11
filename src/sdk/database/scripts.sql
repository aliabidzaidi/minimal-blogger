
CREATE TABLE "User"(
  "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "Username" TEXT NOT NULL,
  "Email" TEXT NOT NULL,
  "Gender" TEXT NOT NULL,
  "DOB" TEXT NOT NULL,
  "Password" TEXT NOT NULL;
);

CREATE TABLE "Blog"(
  "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "Title" TEXT NOT NULL,
  "Content" TEXT,
  "HeaderImagePath" TEXT,
  "CreatedOn" TEXT,
  "PublishedOn" TEXT,
  "UpdatedOn" TEXT,
  "Status" TEXT,
  "UserId" INTEGER,
  "Stargazers" INTEGER,
  FOREIGN KEY("UserId") REFERENCES "User"("Id")
);

CREATE TABLE "Comment"(
  "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "BlogId" INTEGER NOT NULL,
  "Comment" TEXT NOT NULL,
  "UserId" INTEGER,
  "addTEXT" TEXT,
  "editTEXT" TEXT,
  FOREIGN KEY("BlogId") REFERENCES "Blog"("BlogId"),
  FOREIGN KEY("UserId") REFERENCES "User"("Id")
);