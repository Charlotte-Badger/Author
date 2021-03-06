const mongoose = require('mongoose').set('debug', true);
mongoose.connect('mongodb://localhost/author', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

let authorSchema = new mongoose.Schema({
  'authorId': Number,
  'firstName': String,
  'middleName': String,
  'lastName': String,
  'job': String,
  'employer': String,
  'rating': Number,
  'reviews': Number,
  'students': Number,
  'courses': Number,
  'thumbnail': String, // will be a URL
  'bio': String
});

let Author = mongoose.model('Author', authorSchema);

let save = (records) => {
  records.forEach(record => {
    let entry = new Author({
      authorId: record.authorId,
      firstName: record.firstName,
      middleName: record.middleName,
      lastName: record.lastName,
      job: record.job,
      employer: record.employer,
      rating: record.rating,
      reviews: record.reviews,
      students: record.students,
      courses: record.courses,
      thumbnail: record.thumbnail,
      bio: record.bio,
      captions: record.captions
    });
    Promise.resolve(entry.save())
      .then(doc => console.log('Saved', doc._doc.authorId))
      .catch(err => console.log(err));
  });
};

let get = (authorId, callback) => {
  Author.find({authorId: authorId})
    .then(doc => callback(doc))
    .catch(err => console.log(err));
};



module.exports.save = save;
module.exports.get = get;