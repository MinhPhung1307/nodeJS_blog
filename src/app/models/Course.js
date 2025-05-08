const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

// const slug = require('mongoose-slug-generator');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const mongooseDelete = require('mongoose-delete');


const Course = new Schema({
  _id: { type: Number },
  name: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  videoId: { type: String, required: true },
  slug: { type: String, slug: 'name', unique: true},
}, {
  _id: false,
  timestamps: true
});

Course.plugin(AutoIncrement);

Course.plugin(mongooseDelete, {
  deletedAt : true,
  overrideMethods: 'all',
}) 

module.exports = mongoose.model('Course', Course);
