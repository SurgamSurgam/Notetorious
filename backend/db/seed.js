const pgp = require("pg-promise")({});
const db = pgp("postgres://localhost:5432/notetorious");

const faker = require("faker");

//USERS TABLE

let users = [];

for (let i = 0; i < 5; i++) {
  let username = faker.internet.userName();
  let email = faker.internet.email();
  let password = faker.internet.password();
  let profile_pic = faker.image.avatar();
  users.push(`('${username}', '${email}', '${password}', '${profile_pic}')`);
}

users = users.join(", ");

// NOTEBOOKS TABLE

let notebooks = [];

for (let i = 0; i < 10; i++) {
  let author_id = Math.ceil(Math.random() * 5);
  let title = faker.lorem.words();

  notebooks.push(`(${author_id}, '${title}')`);
}

notebooks = notebooks.join(", ");

// NOTES TABLE

let notes = [];

for (let i = 0; i < 20; i++) {
  let title = faker.lorem.words();
  let body = faker.lorem.paragraph();
  let author_id = Math.ceil(Math.random() * 5);
  let notebook_id = Math.ceil(Math.random() * 10);

  notes.push(`('${title}', '${body}', ${author_id}, ${notebook_id} )`);
}

notes = notes.join(", ");

//TAGS TABLE

let tags = [];

for (let i = 0; i < 20; i++) {
  let name = faker.random.word();
  tags.push(`('${name}')`);
}

tags = tags.join(", ");

//TAGGINGS TABLE

let taggings = [];

for (let i = 0; i < 10; i++) {
  let note_id = Math.ceil(Math.random() * 20);
  let tag_id = Math.ceil(Math.random() * 20);
  taggings.push(`(${note_id}, ${tag_id})`);
}

taggings = taggings.join(", ");

const populateData = async () => {
  try {
    await db.none(
      `INSERT INTO users(username, email, password_digest, profile_pic) VALUES ${users};`,
      { users }
    );
    await db.none(
      `INSERT INTO notebooks(author_id, title) VALUES ${notebooks};`,
      { notebooks }
    );
    await db.none(
      `INSERT INTO notes(title, body, author_id, notebook_id) VALUES ${notes};`,
      { notes }
    );
    await db.none(`INSERT INTO tags(name) VALUES ${tags};`, { tags });
    await db.none(`INSERT INTO taggings(note_id, tag_id) VALUES ${taggings};`, {
      taggings
    });
  } catch (error) {
    console.error("Error from ASYNC/AWAIT:", error);
  }
};

populateData();
