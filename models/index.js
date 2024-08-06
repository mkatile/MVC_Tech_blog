const Sequelize = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comments');

// Ensure all models are instances of Sequelize.Model
console.log(User instanceof Sequelize.Model); // Should print true
console.log(Post instanceof Sequelize.Model); // Should print true
console.log(Comment instanceof Sequelize.Model); // Should print true

// Define associations
User.hasMany(Post, {
  foreignKey: 'user_id'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});

User.hasMany(Comment, {
  foreignKey: 'user_id'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id'
});

module.exports = { User, Post, Comment };


Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});

User.hasMany(Comment, {
  foreignKey: 'user_id'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id'
});

module.exports = { User, Post, Comment };
